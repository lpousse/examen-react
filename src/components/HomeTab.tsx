import React, { useState, useEffect } from 'react';
import StateInterface from '../interfaces/StateInterface';
import TaskInterface from '../interfaces/TaskInterface';
import UnitInterface from '../interfaces/UnitInterface';
import { getTasks } from '../services/TasksService';

type HomeTabProps = {
	units: UnitInterface[];
	states: StateInterface[];
};

function HomeTab({units, states}: HomeTabProps) {
	const [tasks, setTasks] = useState<TaskInterface[]>([]);
	useEffect(() => {(async() => setTasks(await getTasks()))()}, []);
    return (
		<div className='row mt-3'>
			<table className='table table-striped table-secondary'>
				<thead>
					<tr>
						<th>Unit</th>
						{states.map(state => <th>{state.name}</th>)}
					</tr>
				</thead>
				<tbody>
					{units.map(unit => {
						const unitTasks = tasks.filter(task => task.unitId === unit.id);
						return (
							<tr>
								<td>{unit.name}</td>
								{states.map(state => <td>{unitTasks.filter(task => task.stateId === state.id).length}</td>)}
							</tr>				
						);
					})}
				</tbody>
			</table>
		</div>
    );
};

export default HomeTab;