import React, { useState } from 'react';
import StateInterface from '../interfaces/StateInterface';
import TaskInterface from '../interfaces/TaskInterface';
import UnitInterface from '../interfaces/UnitInterface';
import { addTask, getTasksByUnitId } from '../services/TasksService';
import Modal from 'react-bootstrap/Modal';

type AddTaskModalProps = {
	unit: UnitInterface;
	state: StateInterface;
	setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
};

type AddTaskFormData = {
	title: {value: string};
	comment: {value: string};
};

function AddTaskModal({unit, state, setTasks}: AddTaskModalProps) {

	const [error, setError] = useState("");
	const [show, setShow] = useState(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const {title, comment} = event.target as typeof event.target & AddTaskFormData;
		if (!title.value || title.value.trim() === "")
		setError("Title is required");
		else {
			(async() => {
				const task = await addTask(title.value.trim(), comment.value, unit.id, state.id);
				if (task) {
					setTasks(await getTasksByUnitId(unit.id));
					setError("");
					setShow(false);
				}
				else
					setError("Error while saving task");
				event.currentTarget.reset();
			})();
		}
    };

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    return (
		<>
		<button className='btn btn-primary py-0' onClick={handleShow}><h3>+</h3></button>
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add {state.name} task for {unit.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form id={`addTaskForm${unit.id}${state.id}`} onSubmit={handleSubmit}>
					<div className='row mb-3'>
						<label htmlFor='title' className='col-sm-2 col-form-label'>Title</label>
						<div className='col-sm-10'>
							<input type='text' className='form-control' id='title' name='title' />
						</div>
					</div>
					<div className='row mb-3'>
						<label htmlFor='comment' className='col-sm-2 col-form-label'>Comment</label>
						<div className='col-sm-10'>
							<textarea className='form-control' id='comment' name='comment' rows={5} />
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
				<button className='btn btn-secondary' onClick={handleClose}>Cancel</button>
				<button type='submit' form={`addTaskForm${unit.id}${state.id}`} className='btn btn-primary'>Add task</button>
			</Modal.Footer>
		</Modal>
		</>
    );
};

export default AddTaskModal;