import './style.css';
import Header from '../../components/Header';
import Home from '../../pages/Home';
import { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CustomerLocalStorage } from "../../localStorage/customerLocalStorage.jsx";

export default function Register(props) {

    const { isLogged, signin, signup} = useContext(AuthContext)
	const history = useHistory();


	async function handleClick(){
		const name = document.querySelector('#name').value
		const email = document.querySelector('#email').value
		const nickname = document.querySelector('#nickname').value
		const adress = document.querySelector('#adress').value
		const phone = document.querySelector('#phone').value
		const password = document.querySelector('#password').value
		if(await signup(name,adress,phone,email,password,nickname)){
			history.push('/')
		}
		else{
			alert('Cadastro já existe!')
		}

	}

	if(isLogged){
		history.push('/')
	}


    return (
        <div className="productDetailsContainer">
            <Header/>
            <div className="loginBox">
				<h1>REGISTRO</h1>
				 <br/>
				<br/>
				<br/>
				<p>Nome:</p>
				<input id='name' type='text'/><br/>
				<br/>
				<br/>
				<p>Nickaname:</p>
				<input id='nickname' type='text'/><br/>
				<br/>
				<br/>
				<p>Email:</p>
				<input id='email' type='email'/><br/>
				<br/>
				<br/>
				<p>Endereço:</p>
				<input id='adress' type='text'/><br/>
				<br/>
				<br/>
				<p>Telefone:</p>
				<input id='phone' type='phone'/><br/>
				<br/>
				<br/>
				<p>Senha:</p>
				<input id='password' type='password'/><br/>
				<br/>
				<br/>
				<button onClick={handleClick}>Fazer Login</button><br/>
				<br/>
				<p> 
					<a href='/login' className='center'>Já tem conta?</a>
				</p>
            </div>
        </div>
    )
}
