import React from 'react';
import TaskInterface from '../interfaces/TaskInterface';
import { Card } from 'react-bootstrap';
import TaskCommentModal from './TaskCommentModal';
import StateInterface from '../interfaces/StateInterface';
import EditTaskModal from './EditTaskModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getTasksByUnitId, updateTask } from '../services/TasksService';

type TaskCardProps = {
	task: TaskInterface;
	setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
	isAdminMode: boolean;
	states: StateInterface[];
};

function TaskCard({task, setTasks, isAdminMode, states}: TaskCardProps) {
	const nextState = () => {
		(async() => {
			const updated_task = await updateTask({...task, stateId: task.stateId + 1});
			setTasks(await getTasksByUnitId(task.unitId));
		})();
    };

	const prevState = () => {
		(async() => {
			const updated_task = await updateTask({...task, stateId: task.stateId - 1});
			setTasks(await getTasksByUnitId(task.unitId));
		})();
    };

    return (
		<Card className='text-start mb-3'>
			<Card.Header>
				<h5>{task.title}</h5>
			</Card.Header>
			<Card.Body className='d-flex justify-content-between'>
				{task.stateId === 1 ?
					<button className='btn ps-0 border-0' disabled><FontAwesomeIcon className='me-2 w-100' icon={faChevronLeft} color="white" /></button>
					:
					<button className='btn ps-0' onClick={prevState}><FontAwesomeIcon className='me-2 w-100' icon={faChevronLeft} /></button>
				}
				<div className='flex-grow-1'>
					{task.comment && task.comment !=="" ? <p>{task.comment}</p> : <></>}
					<div className='d-flex justify-content-evenly text-center'>
						<TaskCommentModal task={task} setTasks={setTasks} />
						{isAdminMode ?
							<EditTaskModal task={task} setTasks={setTasks} states={states} />
							:<></>}
					</div>
				</div>
				{task.stateId === 4 ?
					<button className='btn pe-0 border-0' disabled><FontAwesomeIcon className='me-2 w-100' icon={faChevronRight} color="white" /></button>
					:
					<button className='btn pe-0' onClick={nextState}><FontAwesomeIcon className='me-2 w-100' icon={faChevronRight} /></button>
				}
			</Card.Body>
		</Card>
    );
};

export default TaskCard;