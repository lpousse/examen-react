import UserInterface from "../interfaces/UserInterface";

const endpoint = "http://localhost:4000/users"

export function login(username: string, password: string): Promise<UserInterface> {
	return fetch(`${endpoint}?username=${username}&password=${password}`)
	.then(response => response.json())
	.then(data =>data[0])
	.catch(error => {
		console.log("UnitService error: ", error);
		return null;
	});
}