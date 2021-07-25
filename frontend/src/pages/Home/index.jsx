import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';
import { useEffect, useState } from "react";
import { getProducts } from '../../services/api.js';

export default function Home() {
	const [arts, setArts] = useState([]);

	useEffect(async () => {
		setArts(await getProducts());
	},[]);

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
