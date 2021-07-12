import { useState, useEffect } from 'react'

export const ArtLocalStorage = () => {
	const [value, setValue] = useState(
		JSON.parse(localStorage.getItem('arts')) || 
		[
			{id: 0, name: "Objeto Rosa", description: "The best digital art", image:"https://atlas-content-cdn.pixelsquid.com/stock-images/pink-cup-coffee-2M0V096-600.jpg", belong: "theCollector", creator:"fran", quantity: 1, quantitySold:0, price:100.00, creation:"2021-06-27T22:53:45.615Z"},
			{id: 1, name: "Objeto preto", description: "The best digital art", image:"https://blog.cmog.org/wp-content/uploads/2019/09/Mirror_Black_blog_Pt1_15.jpg", belong: "theCollector", creator:"breno", quantity: 10, quantitySold:0, price:1.99, creation:"2021-06-27T22:53:45.615Z"},
			{id: 2, name: "Objeto azul", description: "The best digital art", image:"https://image.shutterstock.com/image-photo/thread-ball-isolated-on-white-260nw-69076774.jpg", belong: "theCollector", creator:"thales", quantity: 5, quantitySold:0, price:25.00, creation:"2021-06-27T22:53:45.615Z"},
			{id: 3, name: "The best Sun", description: "The best digital art", image:"https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/188-nature-landscape-digital-painting-randy-rodriguez.jpg", belong: "theCollector", creator:"fran", quantity: 1, quantitySold:0, price:25.00, creation:"2021-06-27T22:53:45.615Z"},
			{id: 4, name: "Street person", description: "The best digital art", image:"https://cdn.pixabay.com/photo/2020/02/22/10/32/doubleexpouse-4870197_960_720.jpg", belong: "thales", creator:"thales", quantity: 1, quantitySold:0, price:0.00, creation:"2021-06-27T22:53:45.615Z"},
			{id: 5, name: "Bird day", description: "The best digital art", image:"https://addons-media.operacdn.com/media/CACHE/images/themes/55/48355/1.1-rev1/images/61dabebd-db81-4ea2-994f-9f5048af4b62/b1bf89e8bb58418d2b5ae34ebb3dd572.jpg", belong: "theCollector", creator:"breno", quantity: 1, quantitySold:1, price:25.00, creation:"2021-06-27T22:53:45.615Z"}
		]
	);

	useEffect(() => {
		localStorage.setItem('arts', JSON.stringify(value));
	}, [value]);

	async function addArt(name,user,description, price, quantity){
		var id = value.length;
		var newArt = {
			id,
			name,
			description,
			image:"https://addons-media.operacdn.com/media/CACHE/images/themes/55/48355/1.1-rev1/images/61dabebd-db81-4ea2-994f-9f5048af4b62/b1bf89e8bb58418d2b5ae34ebb3dd572.jpg",
			belong: user,
			creator: user,
			quantity: quantity,
			quantitySold:0,
			price:price,
			creation:Date().toString()
		}
		var newValue = value.concat([newArt]);
		await setValue(newValue)
		return id;
	}

	return [value, setValue,addArt];
};

export const ArtsByOwner = (nick) => {
	const [arts] = ArtLocalStorage();
	return [arts.filter((a) => {
		return a.belong	=== nick
	})] 
};

export const ArtsByCreator = (nick) => {
	const [arts] = ArtLocalStorage();
	return [arts.filter((a) => {
		return a.creator === nick
	})] 
};

export const ArtById = (id) => {
	const [arts] = ArtLocalStorage();
	var art = arts.filter((a) => {
		return a.id == id
	})
	return [art[0]] 
};
