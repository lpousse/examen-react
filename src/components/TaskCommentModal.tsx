import React, { useState } from 'react';
import TaskInterface from '../interfaces/TaskInterface';
import { addTask, getTasksByUnitId, updateTask } from '../services/TasksService';
import Modal from 'react-bootstrap/Modal';

type TaskCommentModalProps = {
	task: TaskInterface;
	setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
};

type TaskCommentFormData = {
	title: {value: string};
	comment: {value: string};
};

function TaskCommentModal({task, setTasks}: TaskCommentModalProps) {

	const [error, setError] = useState("");
	const [show, setShow] = useState(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const {comment} = event.target as typeof event.target & TaskCommentFormData;
		(async() => {
			const updatedTask = await updateTask({...task, comment: comment.value });
			if (updatedTask) {
				setTasks(await getTasksByUnitId(task.unitId));
				setError("");
				setShow(false);
			}
			else
				setError("Error while saving task");
			event.currentTarget.reset();
		})();
    };

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    return (
		<>
		<button className='btn btn-primary' onClick={handleShow}>Comment</button>
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Comment task {task.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form id={`taskCommentForm${task.id}`} onSubmit={handleSubmit}>
					<div className='row mb-3'>
						<label htmlFor='comment' className='col-sm-2 col-form-label'>Comment</label>
						<div className='col-sm-10'>
							<textarea className='form-control' id='comment' name='comment' rows={5}>{task.comment}</textarea>
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
				<button type='submit' form={`taskCommentForm${task.id}`} className='btn btn-primary'>Update comment</button>
			</Modal.Footer>
		</Modal>
		</>
    );
};

export default TaskCommentModal;