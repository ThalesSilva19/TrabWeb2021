import { useState, useEffect } from 'react'

export const CartLocalStorage = () => {
	const [value, setValue] = useState(
		JSON.parse(localStorage.getItem('cart')) || 
		[
			{id: 0, nickname:"admin", art_id: 0, quantity: 1},
			{id: 1, nickname:"admin", art_id: 1, quantity: 5},
			{id: 2, nickname:"admin", art_id: 2, quantity: 3},
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
