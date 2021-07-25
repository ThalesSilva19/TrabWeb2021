import { createContext, useEffect, useState } from 'react';
import { AdminLocalStorage } from '../localStorage/adminLocalStorage.jsx';
import { register,login } from '../services/api.js';

export const AuthContext = createContext({});

export function AuthProvider( {children} ) {

	const [admins, setAdmins] = AdminLocalStorage()
    const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('auth')) || null
	);

    const isLogged = !!user;
    const isAdmin = user?.isAdmin || false;

    useEffect(() => {
		localStorage.setItem('auth', JSON.stringify(user));
    }, [user]);

	
	async function signUp(name,address,phone,email,password,username){
		var auxUser = await register(name,address,phone,email,password,username);
		if(auxUser){
			setUser(auxUser);
			return true
		}
		else{
			return false
		}
	}

   	async function signIn(email, password) {
		var auxUser = await login(email,password);
		if(auxUser){
			setUser(auxUser);
			return true
		}
		else{
			return false
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
