import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { ArtsByCreator } from '../../localStorage/artLocalStorage';

export default function Artist(props) {
    const artist  = props.match.params.user;
    const [arts]  = ArtsByCreator(artist)
	const {user} = useContext(AuthContext)
	const history = useHistory();
	var isYou = user.name === artist


	function toNewArt(){
		history.push('/new')
	}
	
    return (
        <>
            <Header/>
			<h2 className="pageTitle">Feitas por @{artist}</h2><br/>
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
