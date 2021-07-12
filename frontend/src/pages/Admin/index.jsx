import '../../styles/admin.css'
import Header from '../../components/Header';

export default function Admin() {
    return (
		<>
			<Header/>
			<div className="admin-content">
				<h3 className="admin-title">Administração do site</h3>

				<div class="admin-breadcrumb">
					<p>Admin</p>
				</div>

				<table class="admin-table">
					<thead>
						<tr>
							<th>USUÁRIOS</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><a href="/admin/cliente">Clientes</a></td>
							<td class="admin-table-button"><a href="/admin/cliente/adicionar">Adicionar</a></td>
							<td class="admin-table-button"><a href="/admin/cliente">Ver todos</a></td>
						</tr>
						<tr>
							<td><a href="list.html">Administrador</a></td>
							<td class="admin-table-button"><a href="/admin/admin/adicionar">Adicionar</a></td>
							<td class="admin-table-button"><a href="/admin/admin">Ver todos</a></td>
						</tr>
					</tbody>
				</table>

				<table class="admin-table">
					<thead>
						<tr>
							<th>PRODUTOS</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><a href="/admin/arte">Arte Virtual</a></td>
							<td class="admin-table-button"><a href="/admin/arte/adicionar">Adicionar</a></td>
							<td class="admin-table-button"><a href="/admin/arte">Ver todos</a></td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
    );
}
