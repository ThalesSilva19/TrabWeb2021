import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import './style.css';

export default function Card(props) {
    const { user } = useContext(AuthContext)
	var my = user === props.belong
	var inSale = props.price != 0
    return (
        <div className="cardContainer">
            <img src={props.imgsrc} alt={props.name}/>
            <h3>{props.name}</h3>
            <p>Pertence a @{props.belong}</p>
            <p>Feito por @{props.author}</p>
			{ inSale
            	? <h2>R${props.price}</h2>
            	: <h2>Não está a venda</h2>
			}
			{ my 
				? <button>Comprar</button>
				: <button>Pertence à Mim</button>
			}
        </div>
    );
}
