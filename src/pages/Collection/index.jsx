import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { ArtsByOwner } from '../../localStorage/artLocalStorage';
import { CustomerLocalStorage } from '../../localStorage/customerLocalStorage';

export default function Collection(props) {
    const owner  = props.match.params.user;
    const [arts]  = ArtsByOwner(owner)
	const [customers] = CustomerLocalStorage();
	const {user} = useContext(AuthContext)
	var isYou = user.name === owner
	const customer = customers.filter(c=>c.nickname===user.name);

    return (
        <>
            <Header/>
			<h2 className="pageTitle">Pertence à @{owner}</h2><br/>
			{isYou && <p className="textMoney">Você já ganhou R$ {customer[0].totalReceived.toFixed(2)}</p>}
			{isYou && <p className="addButton"><button>Adicionar Nova </button></p>}
			<ul className="cardList">
				{
					arts.map(art => (
						<li><Card {...art}/></li>
					))
				}
			</ul>
        </>
    );
}
