import './style.css';
import { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import Header from '../../components/Header';
import { AuthContext } from "../../contexts/AuthContext";
import { createProduct } from '../../services/api.js';

export default function NewArt(props) {
    const { isLogged, user} = useContext(AuthContext)
	const history = useHistory();

	if(!isLogged){
		history.push('/login');
	}

	async function add(){
		const name = document.querySelector('#name').value;
		const description = document.querySelector('#description').value;
		const quantity = Number(document.querySelector('#quantity').value);
		const price = Number(document.querySelector('#price').value);
		const imageLink = document.querySelector('#art').value;

		const product = {
			name: name,
			description: description,
			image: imageLink,
			quantity: quantity | '',
			price: price,
			belong: user.id,
			creator: user.id
		}

		const {_id} = await createProduct(product, user);
		history.push(`/products/${_id}`);
	}

    return (
        <div>
            <Header/>
            <div className="productBox">
				<p> Nome: </p>
				<input type='text' id="name" required/><br/>
				<br/>
				<p> Descrição: </p>
				<textarea id="description" rows="6" required/> <br/>
				<br/>
				<p> Quantidade: </p>
				<input type='number' id="quantity" required/><br/>
				<br/>
				<p> Preço: </p>
				<input type='number' id="price" required/><br/>
				<br/>
				<p> Arte: </p>
				<input type='text' id="art" required/><br/>
				<br/>
				<button className="productButton" onClick={add}>Adicionar</button>
            </div>
        </div>
    )
}
