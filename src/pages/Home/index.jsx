import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';
import { ArtLocalStorage } from '../../localStorage/artLocalStorage';

export default function Home() {
	const [arts] = ArtLocalStorage();

    return (
        <>
            <Header/>
			<h2 className="pageTitle">Arte Virtual</h2>
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
