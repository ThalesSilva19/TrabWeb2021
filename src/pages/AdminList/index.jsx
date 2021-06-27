import { useHistory } from "react-router-dom";
import './style.css'
import '../../styles/admin.css'
import Header from '../../components/Header';
import { ArtLocalStorage } from '../../localStorage/artLocalStorage';
import { CustomerLocalStorage } from '../../localStorage/customerLocalStorage';
import { AdminLocalStorage } from '../../localStorage/adminLocalStorage';

export default function AdminList(props) {
	const history = useHistory();

	const type = props.match.params.type;
	let title = "";
	let columns = [];
	let rows = [];

	if(type === "cliente")
	{
		title = "Clientes";
		columns  = ["Id", "Nome", "Telefone", "Email"];
		const [customers] = CustomerLocalStorage();
		customers.forEach(customer => {
			rows.push([customer.id, customer.name, customer.phone, customer.email]);
		});
	}
	else if(type === "admin")
	{
		title = "Administradores";
		columns  = ["Id","Nome", "Username", "Telefone", "Email"];
		const [admins] = AdminLocalStorage();
		admins.forEach(admin => {
			rows.push([admin.id, admin.name, admin.username, admin.phone, admin.email]);
		});
	}
	else if(type === "arte")
	{
		title = "Arte Virtual";
		columns  = ["Id","Nome", "Proprietário", "Criador", "Preço", "Quantidade"];
		const [arts] = ArtLocalStorage();
		arts.forEach(art => {
			rows.push([art.id, art.name, art.belong, art.creator, art.price, art.quantity]);
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
