import React, { useState } from 'react';
import UnitInterface from '../interfaces/UnitInterface';
import { addUnit, getUnits } from '../services/UnitsService';

type AddUnitFormProps = {
	setUnits: React.Dispatch<React.SetStateAction<UnitInterface[]>>;
	setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

type AddUnitFormData = {
	unitName: {value: string}
};

function AddUnitForm({setUnits, setActiveTab}: AddUnitFormProps) {

	const [addUnitError, setAddUnitError] = useState("");
	const handleSubmitAddUnit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const {unitName} = event.target as typeof event.target & AddUnitFormData;
		if (!unitName.value || unitName.value.trim() === "")
			setAddUnitError("Unit name is required");
		else {
			(async() => {
				const unit = await addUnit(unitName.value.trim());
				if (unit) {
					setUnits(await getUnits());
					setActiveTab(`unit-tab-${unit.id}`);
					setAddUnitError("");
				}
				else
					setAddUnitError("Error while saving unit");
			})();
		}
		event.currentTarget.reset();
    };

    return (
		<div className='container'>
			<div className='row mt-3'>
				<form onSubmit={handleSubmitAddUnit}>
					<div className='row mb-3'>
						<label htmlFor='unitName' className='col-sm-2 col-form-label'>Unit name</label>
						<div className='col-sm-10'>
							<input type='text' className='form-control' id='unitName' name='unitName' />
						</div>
					</div>
					{addUnitError !== "" ?
						<div className='row'>
							<p className='text-danger'>{addUnitError}</p>
						</div>
						: <></>
					}
					<button type='submit' className='btn btn-primary'>Submit</button>
				</form>
			</div>
		</div>
    );
};

export default AddUnitForm;