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

	
	function signUp(name,address,phone,email,password,nickname){
		if(addRegister(name,address,phone,email,password,nickname)){
			var auxUser ={
				name: nickname,
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

   	function signIn(email, password) {
       	let emailUser = users.filter(a => ( a.email == email ));

		if(emailUser.length != 1){ 
			return false;
		}
		if(emailUser[0].password == password){
			var auxUser ={
				name: emailUser[0].nickname,
				email: emailUser[0].email,
				isAdmin: admins.filter(a => {return a.email == emailUser[0].email}).length > 0
			}
			console.log(auxUser);
			setUser(auxUser);
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
