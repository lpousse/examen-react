import React, { useState, useEffect } from 'react';
import StateInterface from '../interfaces/StateInterface';
import UnitInterface from '../interfaces/UnitInterface';
import TaskInterface from '../interfaces/TaskInterface';
import { getTasksByUnitId } from '../services/TasksService';
import { Card } from 'react-bootstrap';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import EditUnitModal from './EditUnitModal';

type UnitTabProps = {
	unit: UnitInterface;
	setUnits: React.Dispatch<React.SetStateAction<UnitInterface[]>>;
	states: StateInterface[];
	isAdminMode: boolean;
	setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

function UnitTab({unit, setUnits, states, isAdminMode, setActiveTab}: UnitTabProps) {
	const [tasks, setTasks] = useState<TaskInterface[]>([]);
	useEffect(() => {(async() => setTasks(await getTasksByUnitId(unit.id)))()}, []);

    return (
		<div className='mt-3'>
			{isAdminMode ? 
			<div className='mb-3'>
				<EditUnitModal unit={unit} setUnits={setUnits} tasks={tasks} setActiveTab={setActiveTab} />
			</div>
			: <></>
			}
			<div className='row'>
				{states.map((state) => 
					<div key={`unitTab-${state.name}`} className='col-3'>
						<Card>
							<Card.Body>
								<Card.Title>
									<div className='d-flex justify-content-between align-items-center mb-3'>
										<h3>{state.name}</h3>
										<AddTaskModal unit={unit} state={state} setTasks={setTasks} />
									</div>
								</Card.Title>
								{tasks.filter(task => task.stateId === state.id).map(task => <TaskCard key={`taskCard-${task.id}`} task={task} setTasks={setTasks} isAdminMode={isAdminMode} states={states} />)}
							</Card.Body>
						</Card>
					</div>	
				)}
			</div>
		</div>
    );
};

export default UnitTab;