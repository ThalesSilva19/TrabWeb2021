import './style.css';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Counter from '../../components/Counter';
import Header from '../../components/Header';
import { CartLocalStorage } from '../../localStorage/cartLocalStorage';
import { getProduct , testAdmin } from '../../services/api.js';

export default function ProductDetails(props) {
	
    const { isLogged, isAdmin, user, signOut } = useContext(AuthContext);
	const [cart, setCart] = CartLocalStorage();
	const history = useHistory();
    const [counter, setCounter] = useState(1);
    const id = props.match.params.id;
	const [product,setProduct] = useState({});

	let inSale = product.price != 0;

	useEffect(async () => {
		setProduct(await getProduct(id));

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
		// Cart without the item
		cart.filter(c=>(c.art_id!=id || c.username!=user.name)).forEach(c=>{
			newCart.push({...c});
		});
		newCart.push({username:user.name, art_id:id, quantity:counter})
		await setCart(newCart);
		history.push("/cart");
	}

    return (
		<div className="productDetailsContainer">
            <Header/>
            <div className="productDetailsBox">
                <img className="productImg" src={product.image} alt={product.name}/>
                <div className="productData">
                    <div>
                        <h1 className="productName">{product.name}</h1>
						{
							user.id === product.belong
							? (<p className="productDescription">Pertence a você</p>)
							: (<p className="productDescription">Pertence a @{product.belongName}</p>)
						}
						{
							user.id === product.creator
							? (<p className="productDescription">Feito por você</p>)
							: (<p className="productDescription">Feito por @{product.creatorName}</p>)
						}
                    </div>
					{ inSale &&	<div>
							<Counter maxVal={product.quantity} counter={counter} setCounter={setCounter}/>
							{product.quantity == 1 && <p>1 disponível</p>}
							{product.quantity > 1 && <p>{product.quantity} disponíveis</p>}
						</div>
					}
					
					{ inSale
						? <h2 className="productPrice">Disponível por: <br/>R$ {product.price?.toFixed(2)}</h2>
						: <h2>Não está a venda</h2>
					}
                    
					{ inSale && user!=null && user.id !== product.belong
						? <button className="productButton" onClick={addToCart}>Comprar</button>
						: <button className="productButton" disabled>Comprar</button>
					}
                </div>
            </div>
        </div>
	)
}
