import './style.css';
import Header from '../../components/Header';
import Home from '../../pages/Home';
import { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CustomerLocalStorage } from "../../localStorage/customerLocalStorage.jsx"

export default function Login(props) {

    const { isLogged,signin} = useContext(AuthContext)
	const history = useHistory();

	console.log(signin)


	function login(){
		const email = document.querySelector('#email').value
		const password = document.querySelector('#password').value
		if(signin(email,password)){
			history.push('/')
		}
		else{
			alert('Login Inválido')
		}

	}

	if(isLogged){
		history.push('/home')
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
				<input id='email' type='text' placeholde='thecollector@gmail.com'/><br/>
				<br/>
				<br/>
				<p>Senha:</p>
				<input id='password' type='password' placeholde='1234'/><br/>
				<br/>
				<br/>
				<button onClick={login}>Fazer Login</button><br/>
				<br/>
				<p> 
					<span className='left'>Esqueceu sua senha?</span>
					<span className='right'>Cadastre-se</span>
				</p>
            </div>
        </div>
    )
}
