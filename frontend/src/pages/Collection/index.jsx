import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';
import { useHistory } from "react-router-dom";
import { useContext,useState,useEffect } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { getProductsByOwner, getTotal, getName } from '../../services/api.js';

export default function Collection(props) {
    const owner  = props.match.params.user;
	const history = useHistory();
	const {user} = useContext(AuthContext)
	const [arts, setArts] = useState([]);
	const [name, setName] = useState('');
	const [totalReceived, setTotal] = useState(0);

	var isYou = user.id === owner

	useEffect(async () => {
		setArts(await getProductsByOwner(owner));
		setTotal(await getTotal(user.token));
		setName(await getName(owner));
	},[]);

	function toNewArt(){
		history.push('/new')
	}

    return (
        <>
            <Header/>
			<h2 className="pageTitle">Pertence à @{name}</h2><br/>
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
