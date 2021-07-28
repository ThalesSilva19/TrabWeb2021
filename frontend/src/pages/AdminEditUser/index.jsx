import { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import '../../styles/admin.css'
import Header from '../../components/Header';
import { getCustomerAdmin, createCustomerAdmin, updateCustomerAdmin, deleteCustomerAdmin,
		  getAdminAdmin, createAdminAdmin, updateAdminAdmin, deleteAdminAdmin} from '../../services/api.js';
import { AuthContext } from "../../contexts/AuthContext";

export default function AdminEditUser(props) {
	const history = useHistory();
	const [values, setValues] = useState({
		id: undefined,
		name: "",
		username: "",
		address: "",
		phone: "",
		email: "",
		password: "",
		totalReceived: 0
	})
	const id = props.match.params.id;// "adicionar" or integer number
	const type = props.match.params.type;
	const { user } = useContext(AuthContext);

	if(type!="admin" && type!="cliente")
		history.push("/admin");

	useEffect(async () => {
		if(id !== "adicionar")
		{
			let customer = await getCustomerAdmin(user.token, id);
			if(customer === undefined)
				history.push(`/admin/${type}`)
			else
				setValues({...customer, id:customer._id})
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
		history.push(`/admin/${type}`);
	};

	const handleDelete = async () => {
		if(type === "admin")
			await deleteAdminAdmin(user.token, values.id);
		else if(type === "cliente")
			await deleteCustomerAdmin(user.token, values.id);
		history.push(`/admin/${type}`);
	};

	const handleSave = async () => {
		// Create new customer or update existing one
		if(id==="adicionar")		
		{
			// Create new customer
			if(type === "admin")
				await createAdminAdmin(user.token, values);
			else if(type === "cliente")
				await createCustomerAdmin(user.token, values);
			history.push(`/admin/${type}`);
		}
		else
		{
			// Update customer
			let res = await ("TOKEN", id, values);
			if(type === "admin")
				await updateAdminAdmin(user.token, id, values);
			else if(type === "cliente")
				await updateCustomerAdmin(user.token, id, values);
			history.push(`/admin/${type}`);
		}
	};

    return (
		<>
			<Header/>
			<div className="admin-content">
				{ type === "admin" && <h2 className="admin-title">Editar Admin</h2>}
				{ type === "cliente" && <h2 className="admin-title">Editar Cliente</h2>}
				<div className="admin-breadcrumb">
					<a href="/admin">Admin</a>
					<p className="admin-breadcrumb-divider">/</p>
					{ type === "admin" && <a href="/admin/admin">Administradores</a>}
					{ type === "cliente" && <a href="/admin/cliente">Clientes</a>}
					<p className="admin-breadcrumb-divider">/</p>
					<p>{id}</p>
				</div>
				<div className="admin-edit">
					<div className="admin-edit-fields-container">
						<form>
							{values.id!==undefined &&
								<>
									<label for="id">Id</label><br/>
									<input type="text" value={values.id} disabled/><br/><br/>
								</>
							}
							<label for="name">Nome</label><br/>
							<input type="text" value={values.name} onChange={e=>handleChange(e, "name")}/><br/><br/>
							<label for="name">Nome de Usuário</label><br/>
							<input type="text" value={values.username} onChange={e=>handleChange(e, "username")}/><br/><br/>
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
