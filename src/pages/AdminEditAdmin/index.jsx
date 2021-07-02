import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import '../../styles/admin.css'
import Header from '../../components/Header';
import { AdminLocalStorage } from '../../localStorage/adminLocalStorage';

export default function AdminEditArt(props) {
	const history = useHistory();
	const [admins, setAdmins] = AdminLocalStorage();
	const [values, setValues] = useState({
		id: undefined,
		email: "",
	})
	const id = props.match.params.id;// "adicionar" or integer number

	useEffect(() => {
		if(id === "adicionar")
		{

		}
		else
		{
			let found = false;
			admins.forEach(admin => {
				if(admin.id==id)
				{
					found = true;
					setValues({...admin})
				}
			});
			if(!found)
				history.push("/admin/admin")
		}
	}, []);

	const handleChange = (e, field) => {
		setValues({
			...values, 
			[field]: e.target.value
		});
	};

	const handleCancel = () => {
		history.push("/admin/admin");
	};

	const handleDelete = async () => {
		// Create new admin vector without deleted admin
		let newAdmins = [];
		admins.filter(admin=>admin.id!=id).forEach(admin=>newAdmins.push({...admin}));

		// Update admin vector
		await setAdmins(newAdmins);
		history.push("/admin/admin/");
	};

	const handleSave = async () => {
		// Create new admin or update existing one
		if(id==="adicionar")		
		{
			// Get next id
			let maxId = 0;
			admins.forEach(admin=>{
				if(admin.id>maxId)
					maxId = admin.id;
			})

			// Create new admin vector
			let newAdmins = [];
			admins.forEach(admin=>newAdmins.push({...admin}))

			// Create new admin item
			let newAdmin = {...values};
			newAdmin.id = maxId+1;
			newAdmins.push(newAdmin);

			// Update admin vector
			await setAdmins(newAdmins);
			history.push("/admin/admin/");
		}
		else
		{
			// Update admin
			for(let i=0;i<admins.length;i++)
			{
				if(admins[i].id==id)
				{
					let newAdmins = [];
					admins.forEach(admin=>newAdmins.push({...admin}))
					newAdmins[i] = {...admins[i], ...values};
					await setAdmins(newAdmins);
					history.push("/admin/admin/");
				}
			}
		}
	};

    return (
		<>
			<Header/>
			<div className="admin-content">
				<h2 className="admin-title">Editar Administrador</h2>
				<div className="admin-breadcrumb">
					<a href="/admin">Admin</a>
					<p className="admin-breadcrumb-divider">/</p>
					<a href="/admin/admin">Administradores</a>
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
							<label for="email">Email</label><br/>
							<input type="text" value={values.email} onChange={e=>handleChange(e, "email")}/><br/><br/>
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
