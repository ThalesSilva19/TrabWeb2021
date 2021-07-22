import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';
import { useHistory } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../contexts/AuthContext";

export default function Artist(props) {
    const artist  = props.match.params.user;
	const history = useHistory();
	const {user} = useContext(AuthContext)
	const [arts, setArts] = useState([]);
	const [totalReceived, setTotal] = useState(0);

	var isYou = user.name === artist


	useEffect(async () => {
		var response = fetch('http://localhost:3001/products?artist='+artist).then(async () => {
			if(response.ok){
				var body = await response.json();
				setArts(body.products);
			}
		}).catch(e =>{
			console.log(e);
			return {ok: false};
		})
		if(isYou){
			var response = fetch('http://localhost:3001/user/total').then(async() => {
				if(response.ok){
					var body = await response.json();
					setTotal(body.total);
				}
			}).catch(e =>{
				console.log(e);
				return {ok: false};
			})
		}
	},[]);

	function toNewArt(){
		history.push('/new')
	}
	
    return (
        <>
            <Header/>
			<h2 className="pageTitle">Feitas por @{artist}</h2><br/>
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
