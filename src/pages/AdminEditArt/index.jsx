import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import '../../styles/admin.css'
import Header from '../../components/Header';
import { ArtLocalStorage } from '../../localStorage/artLocalStorage';

export default function AdminEditArt(props) {
	const history = useHistory();
	const [arts, setArts] = ArtLocalStorage();
	const [values, setValues] = useState({
		id: undefined,
		name: "",
		belong: "",
		creator: "",
		price: 0,
		quantity: 1,
		quantitySold: 1,
		selling: false,
	})
	const id = props.match.params.id;// "adicionar" or integer number

	useEffect(() => {
		if(id === "adicionar")
		{

		}
		else
		{
			let found = false;
			arts.forEach(art => {
				if(art.id==id)
				{
					found = true;
					setValues({...art})
				}
			});
			if(!found)
				history.push("/admin/arte")
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
		// Create new art vector without deleted art
		let newArts = [];
		arts.filter(art=>art.id!=id).forEach(art=>newArts.push({...art}));

		// Update art vector
		await setArts(newArts);
		history.push("/admin/arte/");
	};

	const handleSave = async () => {
		// Create new art or update existing one
		if(id==="adicionar")		
		{
			// Get next id
			let maxId = 0;
			arts.forEach(art=>{
				if(art.id>maxId)
					maxId = art.id;
			})

			// Create new arts vector
			let newArts = [];
			arts.forEach(art=>newArts.push({...art}))

			// Create new art item
			let newArt = {...values};
			newArt.id = maxId+1;
			newArt.creation = new Date().toISOString();
			newArts.push(newArt);

			// Update art vector
			await setArts(newArts);
			history.push("/admin/arte/");
		}
		else
		{
			// Update art
			for(let i=0;i<arts.length;i++)
			{
				if(arts[i].id==id)
				{
					let newArts = [];
					arts.forEach(art=>newArts.push({...art}))
					newArts[i] = {...arts[i], ...values};
					await setArts(newArts);
					history.push("/admin/arte/");
				}
			}
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
					<p>1</p>
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
