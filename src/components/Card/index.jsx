import './style.css';

export default function Card(props) {
    return (
        <div className="cardContainer">
            <img src={props.imgsrc} alt={props.name}/>
            <h3>{props.name}</h3>
            <p>Pertence a @{props.belong}</p>
            <p>Feito por @{props.creator}</p>
            <h2>R${props.price}</h2>
            <button>Comprar</button>
        </div>
    );
}
