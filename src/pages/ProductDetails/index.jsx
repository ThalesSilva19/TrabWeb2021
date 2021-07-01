import './style.css';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Counter from '../../components/Counter';
import Header from '../../components/Header';
import { ArtLocalStorage } from '../../localStorage/artLocalStorage';
import { CartLocalStorage } from '../../localStorage/cartLocalStorage';

export default function ProductDetails(props) {
	const [cart, setCart] = CartLocalStorage();
	const [arts] = ArtLocalStorage();
	const history = useHistory();
    const [counter, setCounter] = useState(1);
    const id = props.match.params.id;

	let product;
	arts.forEach((a) => {
		if(a.id == id)
			product = a;
	})
	let inSale = product.price != 0;

	useEffect(() => {
		let quantity = -1;
		cart.forEach((c) => {
			if(c.art_id == id)
				quantity = c.quantity;
		})
		if(quantity>=1)
			setCounter(quantity);
	}, []);

	const addToCart = async () => {
		let newCart = [];
		let maxId=0;
		// Cart without the item
		cart.filter(c=>c.art_id!=id).forEach(c=>{
			if(c.id > maxId)
				maxId = c.id;
			newCart.push({...c});
		});
		newCart.push({id:maxId+1, nickname:"breno", art_id:id, quantity:counter})
		await setCart(newCart);
		history.push("/cart");
	}

    return (
        <div className="productDetailsContainer">
            <Header/>
            <div className="productBox">
                <img className="productImg" src={product.image} alt={product.name}/>
                <div className="productData">
                    <div>
                        <h1 className="productName">{product.name}</h1>
                        <p className="productDescription">Pertence a @{product.belong}</p>
                        <p className="productDescription">Feito por @{product.creator}</p>
                    </div>
					{ inSale &&	<div>
							<Counter maxVal={product.quantity} counter={counter} setCounter={setCounter}/>
							{product.quantity == 1 && <p>1 disponível</p>}
							{product.quantity > 1 && <p>{product.quantity} disponíveis</p>}
						</div>
					}
					
					{ inSale
						? <h2 className="productPrice">Disponível por: <br/>R$ {product.price.toFixed(2)}</h2>
						: <h2>Não está a venda</h2>
					}
                    
					{ inSale
						? <button className="productButton" onClick={addToCart}>Comprar</button>
						: <button className="productButton" disabled>Comprar</button>
					}
                </div>
            </div>
        </div>
    )
}
