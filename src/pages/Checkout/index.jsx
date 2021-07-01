import './style.css';

import Header from '../../components/Header';
import InputMask from 'react-input-mask';

export default function Checkout() {

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

    return (
        <div className="checkoutContainer">
            <Header/>
            <h1 className="checkoutTitle">PAGAMENTO</h1>
            <div className="checkoutBox">
                <h2 className="checkoutPrice">Total: 29.99</h2>
                <label className="checkoutLabel" ><p>CPF</p><InputMask name="cpf" mask="999.999.999-99" maskChar="" onBlur={validateCpf}/></label>
                <label className="checkoutLabel" ><p>Nome Completo</p><InputMask/></label>
                <label className="checkoutLabel" ><p>Número do Cartão</p><InputMask mask="9999.9999.9999.9999" maskChar=""/></label>
                <label className="checkoutLabel" ><p>Vencimento</p><InputMask mask="99/99" maskChar=""/></label>
                <label className="checkoutLabel" ><p>CVV</p><InputMask mask="9999" maskChar=""/></label>
                <button className="checkoutButton" type="submit">Pagar</button>
            </div>
        </div>
    );
}