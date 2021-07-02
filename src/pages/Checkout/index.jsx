import './style.css';

import { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Header from '../../components/Header';
import InputMask from 'react-input-mask';
import { ArtLocalStorage } from '../../localStorage/artLocalStorage';
import { CartLocalStorage } from '../../localStorage/cartLocalStorage';

export default function Checkout() {
	const history = useHistory();
    const { isLogged, isAdmin, user, signOut } = useContext(AuthContext)
	const [cart, setCart] = CartLocalStorage();
	const [arts, setArts] = ArtLocalStorage();
	const [cartSum, setCartSum] = useState(0);

	useEffect(()=>{
		let auxSum = 0;
		cart.forEach(i=>{
			if(user!=undefined && i.nickname === user.name)
			{
				let artPrice = 0;
				arts.forEach(a=>{
					if(a.id == i.art_id)
						artPrice = a.price;
				})
				auxSum+=i.quantity*artPrice;
			}
		})
		setCartSum(auxSum);
	}, [cart]);

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
		let cartItems = cart.filter(item=>(item.nickname==user.name));
		let maxArtId = 0;
		arts.forEach(a=>{
			if(a.id>maxArtId)
				maxArtId = a.id;
		})

		// Remove quantity purchased from arts
		let newArts = []
		arts.forEach(a=>newArts.push({...a}));
		cartItems.forEach(i=>{
			newArts.forEach(a=>{
				if(a.id == i.art_id)
				{
					a.quantity -= i.quantity;
					a.quantitySold += i.quantity;
					// Create new arts beloging to the user
					let currTime = new Date().toISOString();
					newArts.push({...a, id:maxArtId+1, belong:user.name, quantity:i.quantity, quantitySold:0, creation: currTime})
					maxArtId++;
				}
			})
		});
		// Remove arts with zero quantity
		newArts = newArts.filter(a=>a.quantity>0);
		await setArts(newArts);

		// Clean cart
		let newCart = []
		cart.forEach(i=>newCart.push({...i}));
		newCart = newCart.filter(i=>i.nickname!=user.name);
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
