import './style.css';
import { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import Counter from '../../components/Counter';
import Header from '../../components/Header';
import { AuthContext } from "../../contexts/AuthContext";
import { ArtLocalStorage,ArtById} from '../../localStorage/artLocalStorage';
import { CartLocalStorage } from '../../localStorage/cartLocalStorage';

export default function NewArt(props) {
    const { isLogged, user} = useContext(AuthContext)
	const [arts,setArt,addArt] = ArtLocalStorage();
	const history = useHistory();

	if(!isLogged){
		history.push('/login')
	}

	async function add(){
		console.log(addArt)
		const name = document.querySelector('#name').value
		const description = document.querySelector('#description').value
		const quantity = Number(document.querySelector('#quantity').value)
		const price = Number(document.querySelector('#price').value)
		var id = await addArt(name,user.name,description,price,quantity)
		history.push('/products/'+id)
	}

    return (
        <div>
            <Header/>
            <div className="productBox">
				<p> Nome: </p>
				<input type='text' id="name"/><br/>
				<br/>
				<p> Descrição: </p>
				<textarea id="description" rows="6"/> <br/>
				<br/>
				<p> Quantidade: </p>
				<input type='number' id="quantity"/><br/>
				<br/>
				<p> Preço: </p>
				<input type='number' id="price"/><br/>
				<br/>
				<p> Arte: </p>
				<input type='file' id="art"/><br/>
				<br/>
				<button className="productButton" onClick={add}>Adicionar</button>
            </div>
        </div>
    )
}
