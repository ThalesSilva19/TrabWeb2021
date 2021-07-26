import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import '../../styles/admin.css'
import Header from '../../components/Header';
import { getProductAdmin, createProductAdmin, updateProductAdmin } from '../../services/api.js';

export default function AdminEditArt(props) {
	const history = useHistory();
	const [values, setValues] = useState({
		name: "",
		belong: "",
		creator: "",
		description: "",
		image: "https://atlas-content-cdn.pixelsquid.com/stock-images/pink-cup-coffee-2M0V096-600.jpg",
		price: 0,
		quantity: 1,
		quantitySold: 1,
		selling: false,
	})
	const id = props.match.params.id;// "adicionar" or integer number

	useEffect(async () => {
		if(id !== "adicionar")
		{
			let art = await getProductAdmin("TOKEN", id);
			if(art === undefined)
				history.push("/admin/arte")
			else
				setValues({...art})
		}
	}, []);

	const handleChange = (e, field) => {
		if(field==="price") {
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
		//// Create new art vector without deleted art
		//let newArts = [];
		//arts.filter(art=>art.id!=id).forEach(art=>newArts.push({...art}));

		//// Update art vector
		//await setArts(newArts);
		//history.push("/admin/arte/");
	};

	const handleSave = async () => {
		// Create new art or update existing one
		if(id==="adicionar")		
		{
			// Create new art
			let res = await createProductAdmin("TOKEN", values);
			history.push("/admin/arte")
		}
		else
		{
			// Update art
			let res = await updateProductAdmin("TOKEN", id, values);
			history.push("/admin/arte");
		}
	};

    return (
		<>
			<Header/>
			<div className="admin-content">
				<h2 className="admin-title">Editar Arte Virtual</h2>
				<div className="admin-breadcrumb">
					<a href="main.html">Admin</a>
					<p className="admin-breadcrumb-divider">/</p>
					<a href="list.html">Arte Virtual</a>
					<p className="admin-breadcrumb-divider">/</p>
					<p>{id}</p>
				</div>
				<div className="admin-edit">
					<div className="admin-image-container">
						<img className="admin-image" src={values.image} alt={values.name}/>
						<div className="admin-image-button-container">
							<button className="admin-image-button">Alterar</button>
							<button className="admin-image-button" onClick={removeImage}>Excluir</button>
						</div>
					</div>
					<div className="admin-edit-fields-container">
						<form>
							{values.id!==undefined &&
								<>
									<label for="id">Id</label><br/>
									<input type="number" value={values.id} disabled/><br/><br/>
								</>
							}
							<label for="name">Nome</label><br/>
							<input type="text" id="fname" value={values.name} onChange={e=>handleChange(e, "name")}/><br/><br/>
							<label for="painter">Proprietário</label><br/>
							<input type="text" id="fpintor" value={values.belong} onChange={e=>handleChange(e, "belong")}/><br/><br/>
							<label for="painter">Criador</label><br/>
							<input type="text" id="fpintor" value={values.creator} onChange={e=>handleChange(e, "creator")}/><br/><br/>
							<label for="price">Preço</label><br/>
							<input type="number" value={values.price} onChange={e=>handleChange(e, "price")}/><br/><br/>
							<label for="price">Quantidade</label><br/>
							<input type="number" value={values.quantity} onChange={e=>handleChange(e, "quantity")}/><br/><br/>
							<label for="price">Quantidade Vendida</label><br/>
							<input type="number" value={values.quantitySold} onChange={e=>handleChange(e, "quantitySold")}/><br/><br/>
							<label for="selling">À venda</label><br/>
							<input type="checkbox" value={values.selling} onChange={e=>handleChange(e, "selling")}/><br/><br/>
							{values.id!==undefined &&
								<>
									<label for="price">Criação</label><br/>
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
