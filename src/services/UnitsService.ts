import UnitInterface from "../interfaces/UnitInterface";

const endpoint = "http://localhost:4000/units";

export function getUnits() : Promise<UnitInterface[]> {
	return fetch(endpoint)
		.then(response => response.json())
		.catch(error => console.log("UnitsService error: ", error));
}

export function getUnitById(id: number) : Promise<UnitInterface> {
	return fetch(`${endpoint}/${id}`)
		.then(response => response.json())
		.then(data => data[0])
		.catch(error => console.log("UnitsService error: ", error));
}

export function addUnit(name: string) : Promise<UnitInterface> {
	return fetch(endpoint, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({name: name})
		})
		.then(response => response.json())
		.catch(error => console.log("UnitsService error: ", error));
}

export function updateUnit(unit: UnitInterface) : Promise<UnitInterface> {
	return fetch(`${endpoint}/${unit.id}`, {
		method: "PUT",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(unit)
		})
		.then(response => response.json())
		.catch(error => console.log("UnitsService error: ", error));
}

export function deleteUnit(id:number) {
	return fetch(`${endpoint}/${id}`, {
			method: "DELETE",
		})
		.catch(error => console.log("UnitsService error: ", error));
}