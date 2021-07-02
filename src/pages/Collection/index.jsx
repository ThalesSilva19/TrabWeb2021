import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { ArtsByOwner } from '../../localStorage/artLocalStorage';

export default function Collection(props) {
    const owner  = props.match.params.user;
    const [arts]  = ArtsByOwner(owner)
	const {user} = useContext(AuthContext)

	const history = useHistory();
	var isYou = user.name === owner

	function toNewArt(){
		history.push('/new')
	}

    return (
        <>
            <Header/>
			<h2 className="pageTitle">Pertence à @{owner}</h2><br/>
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
