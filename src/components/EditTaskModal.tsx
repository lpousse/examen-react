import React, { useState } from 'react';
import StateInterface from '../interfaces/StateInterface';
import TaskInterface from '../interfaces/TaskInterface';
import { deleteTask, getTasksByUnitId, updateTask } from '../services/TasksService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';

type EditTaskModalProps = {
	task: TaskInterface;
	setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
	states: StateInterface[];
};

type EditTaskFormData = {
	title: {value: string};
	comment: {value: string};
	state: {value: string};
};

function EditTaskModal({task, setTasks, states}: EditTaskModalProps) {

	const [error, setError] = useState("");
	const [show, setShow] = useState(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const {title, comment, state} = event.target as typeof event.target & EditTaskFormData;
		if (!title.value || title.value.trim() === "")
		setError("Title is required");
		else {
			(async() => {
				const updated_task = await updateTask({...task, title: title.value.trim(), comment: comment.value, stateId: parseInt(state.value)});
				if (updated_task) {
					setTasks(await getTasksByUnitId(task.unitId));
					setError("");
					setShow(false);
				}
				else
					setError("Error while saving task");
					event.currentTarget.reset();
			})();
		}
    };

	const handleDelete = () => {
		(async() => {
			await deleteTask(task.id);
			setShow(false);
			setTasks(await getTasksByUnitId(task.unitId));
		})();
};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    return (
		<>
		<button className='btn btn-warning' onClick={handleShow} ><FontAwesomeIcon className='me-2 w-100' icon={faGear} /></button>
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit task {task.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form id={`editTaskForm${task.id}`} onSubmit={handleSubmit}>
					<div className='row mb-3'>
						<label htmlFor='title' className='col-sm-2 col-form-label'>Title</label>
						<div className='col-sm-10'>
							<input type='text' className='form-control' id='title' name='title' defaultValue={task.title}/>
						</div>
					</div>
					<div className='row mb-3'>
						<label htmlFor='comment' className='col-sm-2 col-form-label'>Comment</label>
						<div className='col-sm-10'>
							<textarea className='form-control' id='comment' name='comment' rows={5} defaultValue={task.comment} />
						</div>
					</div>
					<div className='row mb-3'>
						<label htmlFor='state' className='col-sm-2 col-form-label'>State</label>
						<div className='col-sm-10'>
							<select className='form-select' id='state' name='state' defaultValue={task.stateId}>
								{states.map(state => <option key={state.name} value={state.id}>{state.name}</option>)}
							</select>
						</div>
					</div>
					{error !== "" ?
						<div className='row'>
							<p className='text-danger'>{error}</p>
						</div>
						: <></>
					}
				</form>
			</Modal.Body>
			<Modal.Footer>
				<button className='btn btn-danger text-white me-auto' onClick={handleDelete}>Delete</button>
				<button className='btn btn-secondary' onClick={handleClose}>Cancel</button>
				<button type='submit' form={`editTaskForm${task.id}`} className='btn btn-primary'>Edit task</button>
			</Modal.Footer>
		</Modal>
		</>
    );
};

export default EditTaskModal;