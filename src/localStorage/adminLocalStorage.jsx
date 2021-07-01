import { useState, useEffect } from 'react'

export const AdminLocalStorage = () => {
	const [value, setValue] = useState(
		JSON.parse(localStorage.getItem('admins')) || 
		[
			{id: 0, email: "admin"},
			{id: 1, email: "breno@gmail.com"},
			{id: 2, email: "thales@gmail.com"}
		]
	);

	useEffect(() => {
		localStorage.setItem('admins', JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};
