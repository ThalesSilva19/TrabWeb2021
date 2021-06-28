import { createContext, useEffect, useState } from 'react';
import { AdminLocalStorage } from '../localStorage/adminLocalStorage.jsx';
import { CustomerLocalStorage } from '../localStorage/customerLocalStorage.jsx';

export const AuthContext = createContext({});

export function AuthProvider( {children} ) {

	const [admins, setAdmins] = AdminLocalStorage()
	const [users, setUsers] = CustomerLocalStorage()
    const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('auth')) || null
	);

    const isLogged = !!user;
    const isAdmin = user?.isAdmin || false;

    useEffect(() => {
		localStorage.setItem('auth', JSON.stringify(user));
    }, [user]);

   	function signIn(email, password) {
       	var emailUser = users.filter(a => { return a.email === email })
		console.log(emailUser)
		if(emailUser.length != 1){ 
			return false;
		}
		if(emailUser[0].password === password){
			console.log(emailUser)
			var auxUser ={
				name: emailUser[0].nickname,
				email: emailUser[0].email,
				isAdmin: admins.filter(a => {return a.email == emailUser[0].email}).length > 0
			}
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
        <AuthContext.Provider value={{ user, isLogged, isAdmin, signin : signIn, signout: signOut}}>
            {children}
        </AuthContext.Provider>
    );
}
