import { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import '../../styles/admin.css'
import Header from '../../components/Header';
import { getProductAdmin, createProductAdmin, updateProductAdmin, deleteProductAdmin } from '../../services/api.js';
import { AuthContext } from "../../contexts/AuthContext";

export default function AdminEditArt(props) {
	const history = useHistory();
	const [values, setValues] = useState({
		id: undefined,
		name: "",
		belong: "",
		creator: "",
		description: "",
		image: "",
		price: 0,
		quantity: 1,
		quantitySold: 0
	})
	const id = props.match.params.id;// "adicionar" or integer number
	const { user } = useContext(AuthContext);

	useEffect(async () => {
		if(id !== "adicionar")
		{
			let art = await getProductAdmin(user.token, id);
			if(art === undefined)
				history.push("/admin/arte")
			else
				setValues({...art, id:art._id})
		}
	}, []);

	const handleChange = (e, field) => {
		if(field==="quantity" || field==="quantitySold") {
			// Should be converted to int (string is the default)
			setValues({
				...values, 
				[field]: parseInt(e.target.value)
			});
		}
		else if(field==="price") {
			// Price should be converted to float (string is the default)
			setValues({
				...values, 
				[field]: parseFloat(e.target.value)
			});
		}
		else
		{
			setValues({
				...values, 
				[field]: e.target.value
			});
		}
	};

	const removeImage = () => {
		setValues({...values, image:undefined})	;
	}

	const handleCancel = () => {
		history.push("/admin/arte/");
	};

	const handleDelete = async () => {
		await deleteProductAdmin(user.token, values.id);
		history.push("/admin/arte");
	};

	const handleSave = async () => {
		// Create new art or update existing one
		if(id==="adicionar")		
		{
			// Create new art
			let res = await createProductAdmin(user.token, values);
			history.push("/admin/arte");
		}
		else
		{
			// Update art
			let res = await updateProductAdmin(user.token, id, values);
			history.push("/admin/arte");
		}
	};

    return (
		<>
			<Header/>
			<div className="admin-content">
				<h2 className="admin-title">Editar Arte Virtual</h2>
				<div className="admin-breadcrumb">
					<a href="/admin">Admin</a>
					<p className="admin-breadcrumb-divider">/</p>
					<a href="/admin/arte">Arte Virtual</a>
					<p className="admin-breadcrumb-divider">/</p>
					<p>{id}</p>
				</div>
				<div className="admin-edit">
					<div className="admin-image-container">
						<img className="admin-image" src={values.image} alt={values.name}/>
					</div>
					<div className="admin-edit-fields-container">
						<form>
							{values.id!==undefined &&
								<>
									<label for="id">Id</label><br/>
									<input type="text" value={values.id} disabled/><br/><br/>
								</>
							}
							<label for="name">Nome</label><br/>
							<input type="text" id="fname" value={values.name} onChange={e=>handleChange(e, "name")}/><br/><br/>
							<label for="name">Descrição</label><br/>
							<input type="text" id="fname" value={values.description} onChange={e=>handleChange(e, "description")}/><br/><br/>
							<label for="painter">Proprietário</label><br/>
							<input type="text" id="fpintor" value={values.belong} onChange={e=>handleChange(e, "belong")}/><br/><br/>
							<label for="painter">Criador</label><br/>
							<input type="text" id="fpintor" value={values.creator} onChange={e=>handleChange(e, "creator")}/><br/><br/>
							<label for="image">Imagem</label><br/>
							<input type="text" id="fimage" value={values.image} onChange={e=>handleChange(e, "image")}/><br/><br/>
							<label for="price">Preço</label><br/>
							<input type="number" value={values.price} onChange={e=>handleChange(e, "price")}/><br/><br/>
							<label for="price">Quantidade</label><br/>
							<input type="number" value={values.quantity} onChange={e=>handleChange(e, "quantity")}/><br/><br/>
							<label for="price">Quantidade Vendida</label><br/>
							<input type="number" value={values.quantitySold} onChange={e=>handleChange(e, "quantitySold")}/><br/><br/>
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
