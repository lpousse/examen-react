import React from 'react';
import TaskInterface from '../interfaces/TaskInterface';
import { Card } from 'react-bootstrap';
import TaskCommentModal from './TaskCommentModal';
import StateInterface from '../interfaces/StateInterface';
import EditTaskModal from './EditTaskModal';

type TaskCardProps = {
	task: TaskInterface;
	setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
	isAdminMode: boolean;
	states: StateInterface[];
};

function TaskCard({task, setTasks, isAdminMode, states}: TaskCardProps) {
    return (
		<Card className='text-start mb-3'>
			<Card.Header>
				<h5>{task.title}</h5>
			</Card.Header>
			<Card.Body>
				<Card.Text>
					{task.comment && task.comment !=="" ? <p>{task.comment}</p> : <></>}
					<div className='d-flex justify-content-evenly text-center'>
						<TaskCommentModal task={task} setTasks={setTasks} />
						{isAdminMode ?
							<EditTaskModal task={task} setTasks={setTasks} states={states} />
						:<></>}
					</div>
				</Card.Text>
			</Card.Body>
		</Card>
    );
};

export default TaskCard;