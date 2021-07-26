import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';
import { useHistory } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { getProductsByArtist, getTotal, getName } from '../../services/api.js';

export default function Artist(props) {
    const artist  = props.match.params.user;
	const history = useHistory();
	const {user} = useContext(AuthContext)
	const [arts, setArts] = useState([]);
	const [name, setName] = useState('');
	const [totalReceived, setTotal] = useState(0);

	var isYou = user.id === artist

	useEffect(async () => {
		setArts(await getProductsByArtist(artist));
		setTotal(await getTotal(user.token));
		setName(await getName(artist));
	},[]);

	function toNewArt(){
		history.push('/new')
	}
	
    return (
        <>
            <Header/>
			<h2 className="pageTitle">Feitas por @{name}</h2><br/>
			{isYou && <p className="textMoney">Você já ganhou R$ {totalReceived.toFixed(2)}</p>}
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
