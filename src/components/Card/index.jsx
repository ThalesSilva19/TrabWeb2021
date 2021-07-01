import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import './style.css';

export default function Card(props) {
    const { user } = useContext(AuthContext);
	console.log(user,props.belong);
	var my = user?.name != null && user.name === props.belong;
	var inSale = props.price != 0;

	var history = useHistory();

	function handleClick() {
		console.log(props.id);
		history.push(`/products/${props.id}`);
	}

    return (
        <div className="cardContainer">
            <img src={props.image} alt={props.name}/>
            <h3 className="cardTitle">{props.name}</h3>
            <p>Pertence a <a href={'/collection/'+props.belong}>@{props.belong}</a></p>
            <p>Feito por <a href={'/artist/'+props.creator}>@{props.creator}</a></p>
			<div className="cardPriceContainer">
			{ inSale
            	? <h2>R${props.price.toFixed(2)}</h2>
            	: <h2>Não está a venda</h2>
			}
			</div>
			{ my 
				? <button>Pertence à Mim</button>
				: inSale 
					? <button onClick={handleClick}>Comprar</button>
					: <button onClick={handleClick}>Ver</button>
			}	
        </div>
    );
}
