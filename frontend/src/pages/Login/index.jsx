import './style.css';
import Header from '../../components/Header';
import Home from '../../pages/Home';
import { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CustomerLocalStorage } from "../../localStorage/customerLocalStorage.jsx"

export default function Login(props) {

    const { isLogged, signin} = useContext(AuthContext)
	const history = useHistory();

	console.log(signin)


	async function login(){
		const email = document.querySelector('#email').value
		const password = document.querySelector('#password').value
		if(await signin(email,password)){
			history.push('/')
		}
		else{
			alert('Login Inválido')
		}

	}

	if(isLogged){
		history.push('/')
	}


    return (
        <div className="productDetailsContainer">
            <Header/>
            <div className="loginBox">
				<h1>LOGIN</h1>
				 <br/>
				<br/>
				<br/>
				<p>Email:</p>
				<input id='email' type='text' placeholder='thecollector@gmail.com'/><br/>
				<br/>
				<br/>
				<p>Senha:</p>
				<input id='password' type='password' placeholder='1234'/><br/>
				<br/>
				<br/>
				<button onClick={login}>Fazer Login</button><br/>
				<br/>
				<p> 
					<a className='left'>Esqueceu sua senha?</a>
					<a href='/register' className='right'>Cadastre-se</a>
				</p>
            </div>
        </div>
    )
}
