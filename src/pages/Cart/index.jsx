import './style.css'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Header from '../../components/Header';
import Counter from '../../components/Counter';
import { ArtLocalStorage } from '../../localStorage/artLocalStorage';
import { CartLocalStorage } from '../../localStorage/cartLocalStorage';

const CartItem = (props) => {
	const [arts] = ArtLocalStorage();
    const [counter, setCounter] = useState(props.quantity);
	const history = useHistory();
	let art = undefined;

	arts.forEach((a) => {
		if(a.id == props.art_id)
			art = a;
	})

	if(art == undefined) return (<div></div>);

	const setQuantity = async (qty) => {
		// Update cart
		for(let i=0;i<props.cart.length;i++)
		{
			if(props.cart[i].id==props.id)
			{
				let newCart = [];
				props.cart.forEach(c=>newCart.push({...c}))
				newCart[i] = {...props.cart[i], quantity:qty};
				await props.setCart(newCart);
			}
		}
		setCounter(qty);
	}

	const removeCartItem = async ()=> {
		// Remove art from cart
		let newCart = [];
		props.cart.filter(c=>c.id!=props.id).forEach(c=>newCart.push({...c}));
		await props.setCart(newCart);
	}

	const buyCartItemNow = ()=>{
		history.push("/checkout");
	}

	return (
		<>
			<div className="cart-item">
				<div className="cart-item-image-section">
					<img src={art.image}/>
				</div>
				<div className="cart-item-info-section">
					<div className="cart-item-desc">	
						<div>
							<p className="cart-item-bold">{art.name}</p>
							<p><span className="cart-item-bold">Criador:</span> {art.creator}</p>
						</div>
						<div>
							<a onClick={removeCartItem}>Excluir</a>
							<a onClick={buyCartItemNow}>Comprar Agora</a>
						</div>
					</div>

					<div className="cart-item-counter">
                    	<Counter maxVal={art.quantity} counter={counter} setCounter={setQuantity}/>
						<p className="cart-item-qty-text">{art.quantity} Disponíveis</p>
					</div>

					<div className="cart-item-price">
						R$ {(art.price*counter).toFixed(2)}
					</div>
				</div>
			</div>
			<div className="cart-item-divisor"/>
		</>
	);
}

export default function Cart() {
	const [cart, setCart] = CartLocalStorage();
	const [arts] = ArtLocalStorage();
	const [cartSum, setCartSum] = useState(0);
	const history = useHistory();

	const goToCheckout = () => {
		history.push("/checkout");
	};

	useEffect(()=>{
		let auxSum = 0;
		cart.forEach(i=>{
			let artPrice = 0;
			arts.forEach(a=>{
				if(a.id == i.art_id)
					artPrice = a.price;
			})
			auxSum+=i.quantity*artPrice;
		})
		console.log("New sum" + auxSum);
		setCartSum(auxSum);
	}, [cart]);

    return (
		<>
			<Header/>
			<h3 className="cart-title">SACOLA</h3>

			<div className="cart-content">
				{
					cart.map(item => (<CartItem key={item.id} {...item} cart={cart} setCart={setCart}/>))
				}
				<div className="cart-content-footer">
					<div className="cart-content-footer-text">
						<span className="cart-total">Total</span>
						<span className="cart-total">R$ {cartSum.toFixed(2)}</span>
					</div>
					<button className="button-main" onClick={goToCheckout}>Continuar</button>
				</div>
			</div>
		</>
    );
}
