import './style.css';

import { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Header from '../../components/Header';
import InputMask from 'react-input-mask';
import { CartLocalStorage } from '../../localStorage/cartLocalStorage';
import { CustomerLocalStorage } from '../../localStorage/customerLocalStorage';
import { getProducts, buy } from '../../services/api.js';

export default function Checkout() {
	const history = useHistory();
    const { isLogged, isAdmin, user, signOut } = useContext(AuthContext)
	const [cart, setCart] = CartLocalStorage();
	const [arts, setArts] = useState([]);
	const [customers, setCustomers] = CustomerLocalStorage();
	const [cartSum, setCartSum] = useState(0);

	useEffect(async () => {
		setArts(await getProducts());
	},[]);

	useEffect(()=>{
		let auxSum = 0;
		cart.forEach(i=>{
			if(user!=undefined && i.username === user.name)
			{
				let artPrice = 0;
				arts.forEach(a=>{
					if(a._id == i.art_id)
						artPrice = a.price;
				})
				auxSum+=i.quantity*artPrice;
			}
		})
		setCartSum(auxSum);
	}, [cart, arts]);

    async function validateCpf(e) {
        var strCPF = e.target.value.replaceAll('.','').replace('-','');
        console.log(strCPF);
        var Soma = 0;
        var Resto = (Soma*10)%11;
        if (strCPF == "00000000000") {
            e.target.value='';
            alert('CPF Inválido');
            return;
        }
            
        for (var i=1; i<=9; i++) 
            Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))
            Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) {
            e.target.value='';
            alert('CPF Inválido');
            return;
        }  

        Soma = 0;
        for (i = 1; i <= 10; i++) 
            Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))
            Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) {
            e.target.value='';
            alert('CPF Inválido');
            return;
        }
    }

	const finishPayment = async () => {
		// Buy
		let cartItems = cart.filter(item=>(item.username===user.name));
		await buy(user.token, cartItems);

		// Clean cart
		let newCart = []
		cart.forEach(i=>newCart.push({...i}));
		newCart = newCart.filter(i=>i.username!==user.name);
		await setCart(newCart);

		history.push("/");
	};

    return (
        <div className="checkoutContainer">
            <Header/>
            <h1 className="checkoutTitle">PAGAMENTO</h1>
            <div className="checkoutBox">
                <h2 className="checkoutPrice">Total: R${cartSum.toFixed(2)}</h2>
                <label className="checkoutLabel" ><p>CPF</p><InputMask name="cpf" mask="999.999.999-99" maskChar="" onBlur={validateCpf}/></label>
                <label className="checkoutLabel" ><p>Nome Completo</p><InputMask/></label>
                <label className="checkoutLabel" ><p>Número do Cartão</p><InputMask mask="9999.9999.9999.9999" maskChar=""/></label>
                <label className="checkoutLabel" ><p>Vencimento</p><InputMask mask="99/99" maskChar=""/></label>
                <label className="checkoutLabel" ><p>CVV</p><InputMask mask="9999" maskChar=""/></label>
                <button className="button-main" type="submit" onClick={finishPayment}>Pagar</button>
            </div>
        </div>
    );
}
