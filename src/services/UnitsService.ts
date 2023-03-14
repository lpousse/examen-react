import UnitInterface from "../interfaces/UnitInterface";

const endpoint = "http://localhost:4000/units";

export function getUnits() : Promise<UnitInterface[]> {
	return fetch(endpoint)
		.then(response => {
			console.log(`response status`, response.status);
			return response.json();
		})
		.catch(error => console.log("UnitService error: ", error));
}

export function getUnitById(id: number) : Promise<UnitInterface> {
	return fetch(`${endpoint}/${id}`)
		.then(response => {
			console.log(`response status`, response.status);
			return response.json();
		})
		.catch(error => console.log("UnitService error: ", error));
}

export function addUnit(unit: UnitInterface) {
	return fetch(endpoint, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({name: unit.name})
		})
		.catch(error => console.log("UnitService error: ", error));
}

export function updateUnit(unit: UnitInterface) {
	return fetch(`${endpoint}/${unit.id}`, {
		method: "PUT",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(unit)
		})
		.catch(error => console.log("Error: ", error));
}

export function deleteUnit(id:number) {
	return fetch(`${endpoint}/${id}`, {
			method: "DELETE",
		})
		.catch(error => console.log("Error: ", error));
}