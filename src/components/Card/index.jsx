import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import './style.css';

export default function Card(props) {
    const { user } = useContext(AuthContext);
	console.log(user,props.belong);
	var my = user?.nick != null && user.nick === props.belong;
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
            <p>Pertence a @{props.belong}</p>
            <p>Feito por @{props.creator}</p>
			<div className="cardPriceContainer">
			{ inSale
            	? <h2>R${props.price.toFixed(2)}</h2>
            	: <h2>Não está a venda</h2>
			}
			</div>
			{ my 
				? <button>Pertence à Mim</button>
				: <button onClick={handleClick}>Comprar</button>
			}
        </div>
    );
}
