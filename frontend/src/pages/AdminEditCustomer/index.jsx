import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import '../../styles/admin.css'
import Header from '../../components/Header';
import { getCustomerAdmin, createCustomerAdmin, updateCustomerAdmin } from '../../services/api.js';

export default function AdminEditCustomer(props) {
	const history = useHistory();
	const [values, setValues] = useState({
		id: undefined,
		name: "",
		address: "",
		phone: "",
		email: "",
		password: "",
		totalReceived: 0,
		creation: ""
	})
	const id = props.match.params.id;// "adicionar" or integer number

	useEffect(async () => {
		if(id !== "adicionar")
		{
			let customer = await getCustomerAdmin("TOKEN", id);
			if(customer === undefined)
				history.push("/admin/cliente")
			else
				setValues({...customer})
		}
	}, []);

	const handleChange = (e, field) => {
		if(field==="totalReceived") {
			// Price should be converted to float (string is the default)
			setValues({
				...values, 
				[field]: parseFloat(e.target.value)
			});
		}
		else {
			setValues({
				...values, 
				[field]: e.target.value
			});
		}
	};

	const handleCancel = () => {
		history.push("/admin/cliente");
	};

	const handleDelete = async () => {
		//// Create new customer vector without deleted customer
		//let newCustomers = [];
		//customers.filter(customer=>customer.id!=id).forEach(customer=>newCustomers.push({...customer}));

		//// Update customer vector
		//await setCustomers(newCustomers);
		//history.push("/admin/cliente/");
	};

	const handleSave = async () => {
		// Create new customer or update existing one
		if(id==="adicionar")		
		{
			// Create new customer
			let res = await createCustomerAdmin("TOKEN", values);
			history.push("/admin/cliente")
		}
		else
		{
			// Update customer
			let res = await updateCustomerAdmin("TOKEN", id, values);
			history.push("/admin/cliente");
		}
	};

    return (
		<>
			<Header/>
			<div className="admin-content">
				<h2 className="admin-title">Editar Cliente</h2>
				<div className="admin-breadcrumb">
					<a href="/admin">Admin</a>
					<p className="admin-breadcrumb-divider">/</p>
					<a href="/admin/cliente">Clientes</a>
					<p className="admin-breadcrumb-divider">/</p>
					<p>{id}</p>
				</div>
				<div className="admin-edit">
					<div className="admin-edit-fields-container">
						<form>
							{values.id!==undefined &&
								<>
									<label for="id">Id</label><br/>
									<input type="number" value={values.id} disabled/><br/><br/>
								</>
							}
							<label for="name">Nome</label><br/>
							<input type="text" value={values.name} onChange={e=>handleChange(e, "name")}/><br/><br/>
							<label for="address">Endereço</label><br/>
							<input type="text" value={values.address} onChange={e=>handleChange(e, "address")}/><br/><br/>
							<label for="phone">Telefone</label><br/>
							<input type="text" value={values.phone} onChange={e=>handleChange(e, "phone")}/><br/><br/>
							<label for="email">Email</label><br/>
							<input type="text" value={values.email} onChange={e=>handleChange(e, "email")}/><br/><br/>
							{values.id===undefined &&
								<>
									<label for="password">Senha</label><br/>
									<input type="text" value={values.password} onChange={e=>handleChange(e, "password")}/><br/><br/>
								</>

							}
							<label for="totalReceived">Quantidade Recebida</label><br/>
							<input type="number" value={values.totalReceived} onChange={e=>handleChange(e, "totalReceived")}/><br/><br/>
							{values.id!==undefined &&
								<>
									<label for="creation">Criação</label><br/>
									<input type="text" value={values.creation} disabled/><br/><br/>
								</>
							}
						</form>
						<div className="admin-button-container">
							{values.id!==undefined &&
								<button className="button-outline-secondary" onClick={handleDelete}>Excluir</button>
							}
							<button className="button-outline-main" onClick={handleCancel}>Cancelar</button>
							<button className="button-main" onClick={handleSave}>Salvar</button>
						</div>
					</div>
				</div>
			</div>
		</>
    );
}
