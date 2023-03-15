import React, { useState } from 'react';
import UnitInterface from '../interfaces/UnitInterface';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { deleteUnit, getUnits, updateUnit } from '../services/UnitsService';
import TaskInterface from '../interfaces/TaskInterface';

type EditUnitModalProps = {
	unit: UnitInterface;
	setUnits: React.Dispatch<React.SetStateAction<UnitInterface[]>>;
	tasks: TaskInterface[];
	setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

type EditUnitFormData = {
	name: {value: string};
};

function EditUnitModal({unit, setUnits, tasks, setActiveTab}: EditUnitModalProps) {

	const [error, setError] = useState("");
	const [show, setShow] = useState(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const {name} = event.target as typeof event.target & EditUnitFormData;
		if (!name.value || name.value.trim() === "")
		setError("Name is required");
		else {
			(async() => {
				const task = await updateUnit({...unit, name: name.value});
				if (task) {
					setUnits(await getUnits());
					setError("");
					setShow(false);
				}
				else
					setError("Error while saving unit");
				event.currentTarget.reset();
			})();
		}
    };

	const handleDelete = () => {
			(async() => {
				await deleteUnit(unit.id);
				setShow(false);
				setUnits(await getUnits());
				setActiveTab('home');
			})();
    };

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    return (
		<>
		<button className='btn btn-warning' onClick={handleShow} >
            <FontAwesomeIcon className='me-2' icon={faGear} />
        	Edit unit
    	</button>
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit unit {unit.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form id={`editUnitForm${unit.id}`} onSubmit={handleSubmit}>
					<div className='row mb-3'>
						<label htmlFor='name' className='col-sm-2 col-form-label'>Title</label>
						<div className='col-sm-10'>
							<input type='text' className='form-control' id='name' name='name' defaultValue={unit.name} />
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
				{!tasks || tasks.length === 0 ?
					<button className='btn btn-danger text-white me-auto' onClick={handleDelete}>Delete</button>
					:
					<button className='btn btn-danger text-white me-auto' disabled>Unit still has task(s)</button>
				}
				<button className='btn btn-secondary' onClick={handleClose}>Cancel</button>
				<button type='submit' form={`editUnitForm${unit.id}`} className='btn btn-primary'>Edit unit</button>
			</Modal.Footer>
		</Modal>
		</>
    );
};

export default EditUnitModal;