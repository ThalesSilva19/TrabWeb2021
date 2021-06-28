import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import './style.css';

export default function Card(props) {
    const { user } = useContext(AuthContext)
	console.log(user,props.belong)
	var my = user?.nick != null  && user.nick === props.belong
	var inSale = props.price != 0
    return (
        <div className="cardContainer">
            <img src={props.imgsrc} alt={props.name}/>
            <h3>{props.name}</h3>
            <p>Pertence a @{props.belong}</p>
            <p>Feito por @{props.creator}</p>
			{ inSale
            	? <h2>R${props.price}</h2>
            	: <h2>Não está a venda</h2>
			}
			{ my 
				? <button>Pertence à Mim</button>
				: <button>Comprar</button>
			}
        </div>
    );
}
