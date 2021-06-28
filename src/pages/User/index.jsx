import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';
import { ArtsByOwner } from '../../localStorage/artLocalStorage';

export default function User(props) {
    const user  = props.match.params.user;
    const [arts]  = ArtsByOwner(user)
    return (
        <>
            <Header/>
			<h2 className="pageTitle">Artes de @{user}</h2>
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
