import { useState, useEffect } from 'react'

export const CustomerLocalStorage = () => {
	const [value, setValue] = useState(
		JSON.parse(localStorage.getItem('customers')) || 
		[
			{id: 0, name: "Breno Cunha Queiroz", address: "Rua Joao Almiro, 202", phone: "+55(16)1234-1234", email:"breno@gmail.com", password: "1234", nickname:"breno", totalReceived:99.99, token:"1234abcd", creation:"2021-06-27T22:53:45.615Z"},
			{id: 1, name: "Breno Cunha Queiroz", address: "Rua Joao Almiro, 202", phone: "+55(16)1234-1234", email:"thales@gmail.com", password: "1234", nickname:"thales", totalReceived:99.99, token:"1234abcd", creation:"2021-06-27T22:53:45.615Z"},
			{id: 2, name: "Breno Cunha Queiroz", address: "Rua Joao Almiro, 202", phone: "+55(16)1234-1234", email:"fran@gmail.com", password: "1234", nickname:"fran", totalReceived:99.99, token:"1234abcd", creation:"2021-06-27T22:53:45.615Z"},
			{id: 3, name: "Breno Cunha Queiroz", address: "Rua Joao Almiro, 202", phone: "+55(16)1234-1234", email:"thecollector@gmail.com", password: "1234", nickname:"theCollector", totalReceived:99.99, token:"1234abcd", creation:"2021-06-27T22:53:45.615Z"},
		]
	);

	useEffect(() => {
		localStorage.setItem('customers',JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};
