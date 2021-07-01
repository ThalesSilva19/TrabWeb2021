import { useState, useEffect } from 'react'

export const ArtLocalStorage = () => {
	const [value, setValue] = useState(
		JSON.parse(localStorage.getItem('arts')) || 
		[
			{id: 0, name: "Objeto Rosa", description: "The best digital art", image:"https://atlas-content-cdn.pixelsquid.com/stock-images/pink-cup-coffee-2M0V096-600.jpg", belong: "theCollector", creator:"breno", quantity: 1, quantitySold:0, price:100.00, creation:"2021-06-27T22:53:45.615Z"},
			{id: 1, name: "Objeto preto", description: "The best digital art", image:"https://blog.cmog.org/wp-content/uploads/2019/09/Mirror_Black_blog_Pt1_15.jpg", belong: "theCollector", creator:"breno", quantity: 10, quantitySold:0, price:1.99, creation:"2021-06-27T22:53:45.615Z"},
			{id: 2, name: "Objeto azul", description: "The best digital art", image:"https://image.shutterstock.com/image-photo/thread-ball-isolated-on-white-260nw-69076774.jpg", belong: "theCollector", creator:"thales", quantity: 5, quantitySold:0, price:25.00, creation:"2021-06-27T22:53:45.615Z"},
			{id: 3, name: "Objeto azul", description: "The best digital art", image:"https://image.shutterstock.com/image-photo/thread-ball-isolated-on-white-260nw-69076774.jpg", belong: "thales", creator:"breno", quantity: 1, quantitySold:0, price:25.00, creation:"2021-06-27T22:53:45.615Z"},
			{id: 4, name: "Objeto azul", description: "The best digital art", image:"https://image.shutterstock.com/image-photo/thread-ball-isolated-on-white-260nw-69076774.jpg", belong: "thales", creator:"thales", quantity: 1, quantitySold:0, price:0.00, creation:"2021-06-27T22:53:45.615Z"},
			{id: 5, name: "Objeto azul", description: "The best digital art", image:"https://image.shutterstock.com/image-photo/thread-ball-isolated-on-white-260nw-69076774.jpg", belong: "theCollector", creator:"breno", quantity: 1, quantitySold:1, price:25.00, creation:"2021-06-27T22:53:45.615Z"}
		]
	);

	useEffect(() => {
		localStorage.setItem('arts', JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};

export const ArtsByOwner = (nick) => {
	const [arts] = ArtLocalStorage();
	return [arts.filter((a) => {
		return a.belong	=== nick
	})] 
};
