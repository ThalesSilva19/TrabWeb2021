import './style.css';
import Header from '../../components/Header';
import Counter from '../../components/Counter';
import {ArtById} from '../../localStorage/artLocalStorage.jsx'

export default function ProductDetails(props) {
    const id = props.match.params.id;
	const product = ArtById(id)[0]
    /*const product = {
        imgscr: "",
        name: "Product 321",
        belong: "RandomBelong",
        author: "RandomAuthor",
        price: 56.99,
    }*/
	console.log(product)
    return (
        <div className="productDetailsContainer">
            <Header/>
            <div className="productBox">
                <img className="productImg" src={product.imgsrc} alt={product.name}/>
                <div className="productData">
                    <div>
                        <h1 className="productName">{product.name}</h1>
                        <p className="productDescription">Pertence a @{product.belong}</p>
                        <p className="productDescription">Feito por @{product.creator}</p>
                    </div>
                    <Counter/>
                    <p>{product.quantity} disponíveis</p>
                    <h2 className="productPrice">Disponível por: <br/>R${product.price}</h2>
                    <button className="productButton">Comprar</button>
                </div>
            </div>
        </div>
    )
}
