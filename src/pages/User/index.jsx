import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';

export default function User(props) {
    const user  = props.match.params.user;
    const products = [
		{
        	imgscr: "",
			name: "Product 321",
			belong: "thales",
			author: "RandomAuthor",
			price: 56.99,
		},
		{
        	imgscr: "",
			name: "Product 123",
			belong: "thales",
			author: "RandomAuthor",
			price: 56.99,
		},
		{
        	imgscr: "",
			name: "Product 222",
			belong: "thales",
			author: "RandomAuthor",
			price: 0.00,
		}
	]
    return (
        <>
            <Header/>
			<h2 className="pageTitle">Artes de @{user}</h2>
			<ul className="cardList">
				{products.map(function(card,i){
					return <li><Card name={card.name} belong={card.belong} author={card.author} price={card.price}/></li>
				})}
			</ul>
        </>
    );
}
