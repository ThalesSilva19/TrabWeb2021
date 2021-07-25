import axios from "axios";
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

const api = axios.create({
  baseURL: "http://localhost:3001"
});

api.defaults.headers['content-type'] = 'application/json'

/// PUBLIC ENDPOINTS

export  async function getProducts(){
	return api.get('/products').then(response => {
		if(response.status == 200){
			return response.data.products
		}
		return []
	}).
	catch(error => {
		return []
	})
}


export  async function getProductsByArtist(artist){
	return api.get('/products?artist='+artist).then(response => {
		if(response.status == 200){
			return response.data.products
		}
		return []
	}).
	catch(error => {
		return []
	})
}

export  async function getProductsByOwner(owner){
	return api.get('/products?owner='+owner).then(response => {
		if(response.status == 200){
			return response.data.products
		}
		return []
	}).
	catch(error => {
		return []
	})
}

/// USER ENDPOINTS

export  async function getTotal(token){
	let config = {
	  headers: {
		auth: token
	  }
	}
	return api.get('/user/total',config).then(response => {
		if(response.status == 200){
			return response.data.total
		}
		return 0
	}).
	catch(error => {
		return 0
	})
}

/// AUTH ENDPOINTS

export  async function register(name,address,phone,email,password,username){
	return api.put('/auth/register',{name,address,phone,email,username,password}).then(response => {
		if(response.status == 200){
			return  response.data
		}
		return false
	}).
	catch(error => {
		return false;
	})
}

export  async function login(email,password){
	return api.post('/auth/login',{email,password}).then(response => {
		console.log(response)
		if(response.status == 200){
			return response.data
		}
		return false
	}).
	catch(error => {
		return false;
	})
}

