import { useHistory } from "react-router-dom";
import './style.css'
import '../../styles/admin.css'
import Header from '../../components/Header';

export default function AdminList(props) {
	const history = useHistory();

	const type = props.match.params.type;
	let title = "";
	let columns = [];
	let rows = [];

	if(type == "cliente")
	{
		title = "Clientes";
		columns  = ["Id", "Nome", "Telefone", "Email"];
		for(let i=0;i<10;i++)
			rows.push([i,"theCollector", "+55(14)1234-1234", "theCollec@gmail.com"])
	}
	else if(type == "admin")
	{
		title = "Administradores";
		columns  = ["Id","Nome", "Username", "Telefone", "Email"];
		for(let i=0;i<10;i++)
			rows.push([i,"Breno Queiroz", "brenocq", "+55(14)1234-1234", "breno@gmail.com"])
	}
	else if(type == "arte")
	{
		title = "Arte Digital";
		columns  = ["Id","Nome", "Proprietário", "Criador", "Preço", "Quantidade"];
		for(let i=0;i<10;i++)
			rows.push([i,"Mona Lisa", "DaVinci", "breno", "R$25,99", "1"])
	}
	else
		 history.push("/admin");// Invalid list, return to admin page

    return (
		<>
			<Header/>
			<div className="admin-content">
				<h3 className="admin-title">{title}</h3>

				<div class="admin-breadcrumb">
					<a href="/admin">Admin</a>
					<p class="admin-breadcrumb-divider">/</p>
					<p>{title}</p>
				</div>

				<table class="admin-table">
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
									<td class="admin-table-button"><a href={"/admin/"+type+"/"+data[0]}>Editar</a></td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</>
    );
}
