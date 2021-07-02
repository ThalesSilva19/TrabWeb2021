import { useState, useContext, useEffect } from 'react'
import { AuthContext } from "../contexts/AuthContext";

export const CustomerLocalStorage = () => {
    const { signin} = useContext(AuthContext)
	const [value, setValue] = useState(
		JSON.parse(localStorage.getItem('customers')) || 
		[
			{id: 0, name: "Breno Cunha Queiroz", address: "Rua Joao Almiro, 202", phone: "+55(16)1234-1234", email:"breno@gmail.com", password: "1234", nickname:"breno", totalReceived:99.99, token:"1234abcd", creation:"2021-06-27T22:53:45.615Z"},
			{id: 1, name: "Thales", address: "Rua Joao Almiro, 202", phone: "+55(16)1234-1234", email:"thales@gmail.com", password: "1234", nickname:"thales", totalReceived:99.99, token:"1234abcd", creation:"2021-06-27T22:53:45.615Z"},
			{id: 2, name: "Francisco Pedrosa", address: "Rua Joao Almiro, 202", phone: "+55(16)1234-1234", email:"fran@gmail.com", password: "1234", nickname:"fran", totalReceived:99.99, token:"1234abcd", creation:"2021-06-27T22:53:45.615Z"},
			{id: 3, name: "The Collector", address: "Rua Joao Almiro, 202", phone: "+55(16)1234-1234", email:"thecollector@gmail.com", password: "1234", nickname:"theCollector", totalReceived:99.99, token:"1234abcd", creation:"2021-06-27T22:53:45.615Z"},
			{id: 4, name: "Unknown Admin", address: "Rua Joao Almiro, 202", phone: "+55(16)1234-1234", email:"admin", password: "admin", nickname:"theAdmin", totalReceived:99.99, token:"1234abcd", creation:"2021-06-27T22:53:45.615Z"},
		]
	);

	useEffect(() => {
		localStorage.setItem('customers',JSON.stringify(value));
	}, [value]);

	function addRegister(name,adress,phone,email,password,nickname){
		if(value.filter( a => {return a.email == email}).length > 0) return false;  
		if(value.filter( a => {return a.name == name}).length > 0) return false;  
		if(value.filter( a => {return a.nickname == nickname}).length > 0) return false;  
		var id = value.length;
		var creation = Date().toString()
		var totalReceived = 0.0
		var token = '1234abcd'
		var newUser = {id,name,adress,phone,email,password,nickname,totalReceived,token,creation}
		var newValue = value.concat([newUser]);
		setValue(newValue)
		return true;
	}

	return [value, setValue, addRegister];
};

