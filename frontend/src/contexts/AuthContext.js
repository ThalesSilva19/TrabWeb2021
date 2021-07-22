import { createContext, useEffect, useState } from 'react';
import { AdminLocalStorage } from '../localStorage/adminLocalStorage.jsx';
import { CustomerLocalStorage } from '../localStorage/customerLocalStorage.jsx';

export const AuthContext = createContext({});

export function AuthProvider( {children} ) {

	const [admins, setAdmins] = AdminLocalStorage()
	const [users, setUsers, addRegister] = CustomerLocalStorage()
    const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('auth')) || null
	);

    const isLogged = !!user;
    const isAdmin = user?.isAdmin || false;

    useEffect(() => {
		localStorage.setItem('auth', JSON.stringify(user));
    }, [user]);

	
	async function signUp(name,address,phone,email,password,username){
		
		var response = await fetch('http://localhost:3001/auth/register',{
			method:'PUT',
			headers: new Headers({"Content-Type": "application/json"}),
			body: JSON.stringify({
				name,
				address,
				phone,
				username,
				email,
				password			
			})
		}).catch((e)=>{
			console.log(e)
			return {ok: false}
		})
		
		console.log(response)
	
		if(response.ok){
			var auxUser ={
				name: username,
				email: email,
				isAdmin: false
			}
			setUser(auxUser);
			return true
		}
		else{
			return false
		}
	}

   	async function signIn(email, password) {

		var response = await fetch('http://localhost:3001/auth/login',{
			method:'POST',
			headers: {'Content-type':'application/json'},
			body: JSON.stringify({email,password})
		}).catch((e) => {
			console.log(e)
			return {ok: false}
		})

		console.log(response)
		
		if(response.ok){
			var user  = await response.json();
			setUser(user);
			return true;
		}
		else{
			return false;
		}
    }

    function signOut() {
		setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, isLogged, isAdmin, signin:signIn, signout:signOut, signup:signUp}}>
            {children}
        </AuthContext.Provider>
    );
}
