import { useState, useEffect } from 'react'

export const AdminLocalStorage = () => {
	const [value, setValue] = useState(
		JSON.parse(localStorage.getItem('admins')) || 
		[
			{id: 0, name: "Breno Cunha Queiroz", username: "admin", phone: "+55(16)1234-1234", email:"breno@gmail.com", password: "admin", token:"1234abcd", creation:"2021-06-27T22:53:45.615Z"},
			{id: 1, name: "Breno Cunha Queiroz", username: "admin", phone: "+55(16)1234-1234", email:"breno@gmail.com", password: "admin", token:"1234abcd", creation:"2021-06-27T22:53:45.615Z"},
			{id: 2, name: "Breno Cunha Queiroz", username: "admin", phone: "+55(16)1234-1234", email:"breno@gmail.com", password: "admin", token:"1234abcd", creation:"2021-06-27T22:53:45.615Z"},
		]
	);

	useEffect(() => {
		localStorage.setItem('admins', JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};
