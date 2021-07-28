import { useState, useEffect } from 'react'

export const CartLocalStorage = () => {
	const [value, setValue] = useState(
		JSON.parse(localStorage.getItem('cart')) || 
		[
			{username:"admin", art_id: "6100a5b1aa10c67e46e825c8", quantity: 1},
			{username:"admin", art_id: "6100a658aa10c67e46e825d0", quantity: 1},
			{username:"admin", art_id: "6100a44eaa10c67e46e825a1", quantity: 1},
		]
	);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};

export const CartByOwner = (nick) => {
	const [cart] = CartLocalStorage();
	return [cart.filter((a) => {
		return a.nickname === nick
	})] 
};
