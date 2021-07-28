import axios from "axios";

const api = axios.create({
  baseURL: "https://usp-web-app-backend.herokuapp.com"
});

api.defaults.headers['content-type'] = 'application/json'

/// PUBLIC ENDPOINTS

export async function getProducts(search){
	var params = ''
	if(search != undefined){
		params = '?search='+search
	}
	return api.get('/products'+params).then(response => {
		if(response.status === 200) {
			return response.data.products
		}
		return []
	}).
	catch(error => {
		return []
	})
}

export async function getProduct(id){
	return api.get(`/products/${id}`).then(response => {
		if(response.status === 200) {
			return response.data.product;
		}
		return [];
	}).
	catch(error => {
		return [];
	});
}

export async function createProduct(product, user) {
	return api.put(`/user/product`, product, {
		headers: {
			auth: user.token,
		}
	}).then(response => {
		if(response.status === 200) {
			return response.data.product;
		}
		return '';
	}).
	catch(error => {
		return '';
	});
}


export  async function getProductsByArtist(creator){
	return api.get('/products',{params:{creator:creator}}).then(response => {
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
	return api.get('/products',{params:{owner:owner}}).then(response => {
		if(response.status == 200){
			return response.data.products
		}
		return []
	}).
	catch(error => {
		return []
	})
}

export  async function getName(id){
	return api.get('/name/'+id).then(response => {
		if(response.status === 200){
			return response.data.name
		}
		return ''
	}).
	catch(error => {
		return ''
	})
}

/// USER ENDPOINTS

export  async function buy(token, items){
	let config = {
	  headers: {
		auth: token,
	  }
	};

	return api.post('/user/buy', {buys:items}, config).then(response => {
		console.log(response);
		if(response.status == 200){
			return response.data;
		}
		return 0
	}).
	catch(error => {
		return 0
	})
}

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

/// ADMIN ENDPOINTS

export  async function testAdmin(token){
	let config = {
	  headers: {
		auth: token
	  }
	}
	return api.get('/admin',config).then(response => {
		if(response.status == 200){
			return true
		}
		return false
	}).
	catch(error => {
		return false
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
		if(response.status == 200){
			return response.data
		}
		return false
	}).
	catch(error => {
		return false;
	})
}

/// ADMIN ENDPOINTS

// Get list
const adminGetList = (token, endpoint, data) => {
	let config = {
	  headers: {
		auth: token
	  }
	};
	return api.get(endpoint, config).then(response => {
		if(response.status == 200){
			return response.data[data];
		}
		return [];
	}).
	catch(error => {
		return [];
	})
}

export async function getProductsAdmin(token){
	return adminGetList(token, '/admin/products', 'products');
}

export async function getCustomersAdmin(token){
	return adminGetList(token, '/admin/users', 'users');
}

export async function getAdminsAdmin(token){
	return adminGetList(token, '/admin/admins', 'admins');
}

// Get one
const adminGetOne = (token, endpoint) => {
	let config = {
	  headers: {
		auth: token
	  }
	};
	return api.get(endpoint, config).then(response => {
		if(response.status == 200){
			return response.data;
		}
		return undefined;
	}).
	catch(error => {
		return undefined;
	})
}

export async function getProductAdmin(token, id){
	return adminGetOne(token, `/admin/products/${id}`);
}

export async function getCustomerAdmin(token, id){
	return adminGetOne(token, `/admin/users/${id}`);
}

export async function getAdminAdmin(token, id){
	return adminGetOne(token, `/admin/users/${id}`);
}

// Delete
const adminDelete = (token, endpoint) => {
	let config = {
	  headers: {
		auth: token
	  }
	};
	return api.delete(endpoint, config).then(response => {
		if(response.status == 200){
			return response.data;
		}
		return undefined;
	}).
	catch(error => {
		return undefined;
	})
}

export async function deleteProductAdmin(token, id){
	return adminDelete(token, `/admin/products/${id}`);
}

export async function deleteCustomerAdmin(token, id){
	return adminDelete(token, `/admin/users/${id}`);
}

export async function deleteAdminAdmin(token, id){
	return adminDelete(token, `/admin/users/${id}`);
}

// Create
const adminCreate = (token, endpoint, data) => {
	let config = {
	  headers: {
		auth: token,
	  }
	};

	return api.put(endpoint, data, config).then(response => {
		if(response.status == 200){
			return response.data;
		}
		return undefined;
	}).
	catch(error => {
		return undefined;
	})
}

export async function createProductAdmin(token, data){
	return adminCreate(token, '/admin/products', data);
}

export async function createCustomerAdmin(token, data){
	return adminCreate(token, '/admin/users', data);
}

export async function createAdminAdmin(token, data){
	return adminCreate(token, '/admin/admins', data);
}

// Update
const adminUpdate = (token, endpoint, data) => {
	let config = {
	  headers: {
		auth: token,
	  }
	};

	return api.post(endpoint, data, config).then(response => {
		if(response.status == 200){
			return response.data;
		}
		return undefined;
	}).
	catch(error => {
		return undefined;
	})
}

export async function updateProductAdmin(token, id, data){
	return adminUpdate(token, `/admin/products/${id}`, data);
}

export async function updateCustomerAdmin(token, id, data){
	return adminUpdate(token, `/admin/users/${id}`, data);
}

export async function updateAdminAdmin(token, id,data){
	return adminUpdate(token, `/admin/admins/${id}`, data);
}
