import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import '../../styles/admin.css'
import Header from '../../components/Header';
import { CustomerLocalStorage } from '../../localStorage/customerLocalStorage';

export default function AdminEditCustomer(props) {
	const history = useHistory();
	const [customers, setCustomers] = CustomerLocalStorage();
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

	useEffect(() => {
		if(id === "adicionar")
		{

		}
		else
		{
			let found = false;
			customers.forEach(customer => {
				if(customer.id==id)
				{
					found = true;
					setValues({...customer})
				}
			});
			if(!found)
				history.push("/admin/cliente")
		}
	}, []);

	const handleChange = (e, field) => {
		setValues({
			...values, 
			[field]: e.target.value
		});
	};

	const handleCancel = () => {
		history.push("/admin/cliente");
	};

	const handleDelete = async () => {
		// Create new customer vector without deleted customer
		let newCustomers = [];
		customers.filter(customer=>customer.id!=id).forEach(customer=>newCustomers.push({...customer}));

		// Update customer vector
		await setCustomers(newCustomers);
		history.push("/admin/cliente/");
	};

	const handleSave = async () => {
		// Create new customer or update existing one
		if(id==="adicionar")		
		{
			// Get next id
			let maxId = 0;
			customers.forEach(customer=>{
				if(customer.id>maxId)
					maxId = customer.id;
			})

			// Create new customer vector
			let newCustomers = [];
			customers.forEach(customer=>newCustomers.push({...customer}))

			// Create new customer item
			let newCustomer = {...values};
			newCustomer.id = maxId+1;
			newCustomer.token = "12134abc";
			newCustomer.creation = new Date().toISOString();
			newCustomers.push(newCustomer);

			// Update customer vector
			await setCustomers(newCustomers);
			history.push("/admin/cliente/");
		}
		else
		{
			// Update customer
			for(let i=0;i<customers.length;i++)
			{
				if(customers[i].id==id)
				{
					let newCustomers = [];
					customers.forEach(customer=>newCustomers.push({...customer}))
					newCustomers[i] = {...customers[i], ...values};
					await setCustomers(newCustomers);
					history.push("/admin/cliente/");
				}
			}
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
					<a href="/admin/cliente">Cliente</a>
					<p className="admin-breadcrumb-divider">/</p>
					<p>1</p>
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
