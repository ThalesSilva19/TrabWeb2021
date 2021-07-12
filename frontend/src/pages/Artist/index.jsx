import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { ArtsByCreator } from '../../localStorage/artLocalStorage';
import { CustomerLocalStorage } from '../../localStorage/customerLocalStorage';

export default function Artist(props) {
    const artist  = props.match.params.user;
    const [arts]  = ArtsByCreator(artist)
	const [customers] = CustomerLocalStorage();
	const {user} = useContext(AuthContext)
	const history = useHistory();
	var isYou = user.name === artist
	const customer = customers.filter(c=>c.nickname===user.name);



	function toNewArt(){
		history.push('/new')
	}
	
    return (
        <>
            <Header/>
			<h2 className="pageTitle">Feitas por @{artist}</h2><br/>
			{isYou && <p className="textMoney">Você já ganhou R$ {customer[0].totalReceived.toFixed(2)}</p>}
			{isYou && <p className="addButton"><button onClick={toNewArt}>Adicionar Nova </button></p>}
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
