import TaskInterface from "../interfaces/TaskInterface";

const endpoint = "http://localhost:4000/tasks";

export function getTasks() : Promise<TaskInterface[]> {
	return fetch(endpoint)
		.then(response => response.json())
		.catch(error => console.log("TasksService error: ", error));
}

export function getTaskById(id: number) : Promise<TaskInterface> {
	return fetch(`${endpoint}/${id}`)
		.then(response => response.json())
		.then(data => data[0])
		.catch(error => console.log("TasksService error: ", error));
}

export function getTasksByUnitId(unitId: number) : Promise<TaskInterface[]> {
	return fetch(`${endpoint}/?unitId=${unitId}`)
		.then(response => response.json())
		.catch(error => console.log("TasksService error: ", error));
}

export function addTask(title: string, comment: string, unitId: number, stateId: number) : Promise<TaskInterface> {
	return fetch(endpoint, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({title: title, comment: comment, unitId: unitId, stateId: stateId})
		})
		.then(response => response.json())
		.catch(error => console.log("TasksService error: ", error));
}

export function updateTask(task: TaskInterface) : Promise<TaskInterface> {
	return fetch(`${endpoint}/${task.id}`, {
		method: "PUT",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(task)
		})
		.then(response => response.json())
		.catch(error => console.log("TasksService error: ", error));
}

export function deleteTask(id:number) {
	return fetch(`${endpoint}/${id}`, {
			method: "DELETE",
		})
		.catch(error => console.log("TasksService error: ", error));
}