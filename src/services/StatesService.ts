import StateInterface from "../interfaces/StateInterface"

const endpoint = "http://localhost:4000/states";

export function getStates() : Promise<StateInterface[]> {
	return fetch(endpoint)
		.then(response => response.json())
		.catch(error => console.log("StatesService error: ", error));
}