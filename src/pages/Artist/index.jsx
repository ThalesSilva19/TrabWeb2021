import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { ArtsByCreator } from '../../localStorage/artLocalStorage';

export default function Artist(props) {
    const artist  = props.match.params.user;
    const [arts]  = ArtsByCreator(artist)
	const {user} = useContext(AuthContext)
	var isYou = user.name === artist
    return (
        <>
            <Header/>
			<h2 className="pageTitle">Feitas por @{artist}</h2><br/>
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
