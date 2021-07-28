import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import './style.css'
import '../../styles/admin.css'
import Header from '../../components/Header';
import { getProductsAdmin, getAdminsAdmin, getCustomersAdmin  } from '../../services/api.js';
import { AuthContext } from "../../contexts/AuthContext";

export default function AdminList(props) {
	const history = useHistory();
	const [arts, setArts] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [admins, setAdmins] = useState([]);
	const { user } = useContext(AuthContext);
	const type = props.match.params.type;

	useEffect(async () => {
		if(type === "arte")
			setArts(await getProductsAdmin(user.token));
		if(type === "cliente")
			setCustomers(await getCustomersAdmin(user.token));
		if(type === "admin")
			setAdmins(await getAdminsAdmin(user.token));
	},[]);

	let title = "";
	let columns = [];
	let rows = [];

	if(type === "cliente")
	{
		title = "Clientes";
		columns  = ["Id", "Nome", "Telefone", "Email"];
		customers.forEach(customer => {
			rows.push([customer._id, customer.name, customer.phone, customer.email]);
		});
	}
	else if(type === "admin")
	{
		title = "Administradores";
		columns  = ["Id", "Nome", "Email"];
		admins.forEach(admin => {
			rows.push([admin._id, admin.name, admin.email]);
		});
	}
	else if(type === "arte")
	{
		title = "Arte Virtual";
		columns  = ["Id","Nome", "Proprietário", "Criador", "Preço", "Quantidade"];
		arts.forEach(art => {
			rows.push([art._id, art.name, art.belong.username, art.creator.username, art.price, art.quantity]);
		});
	}
	else
		 history.push("/admin");// Invalid list, return to admin page

    return (
		<>
			<Header/>
			<div className="admin-content">
				<h3 className="admin-title">{title}</h3>

				<div className="admin-breadcrumb">
					<a href="/admin">Admin</a>
					<p className="admin-breadcrumb-divider">/</p>
					<p>{title}</p>
				</div>

				<table className="admin-table">
					<thead>
						<tr>
							{columns.map(name => <th>{name}</th>)}
							<th><a href={"/admin/"+type+"/adicionar"}>Adicionar</a></th>
						</tr>
					</thead>
					<tbody>
						{
							rows.map(data => (
								<tr>
									{data.map(value => <td>{value}</td>)}
									<td className="admin-table-button"><a href={"/admin/"+type+"/"+data[0]}>Editar</a></td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</>
    );
}
