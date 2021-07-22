import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';
import { useEffect, useState } from "react";

export default function Home() {
	const [arts, setArts] = useState([]);

	useEffect(async () => {
		var response = await fetch('http://localhost:3001/products').catch(e =>{
			console.log(e);
			return {ok: false};
		})

		if(response.ok){
			var body = await response.json();
			setArts(body.products);
			console.log(body);
		}
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
