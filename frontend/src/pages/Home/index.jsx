import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';
import { useEffect, useState } from "react";
import { getProducts , testAdmin } from '../../services/api.js';

export default function Home(props) {
	console.log(props)	
 	var search = props.location.search
	const [arts, setArts] = useState([]);

	useEffect(async () => {
		setArts(await getProducts(search));
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
