import './style.css'
import Card from '../../components/Card';
import Header from '../../components/Header';

export default function Home() {
    return (
        <>
            <Header/>
			<h2 className="pageTitle">Arte Virtual</h2>
			<ul className="cardList">
				<li><Card name="Objeto Rosa" belong="theCollector" author="breno" price="100.00"/></li>
				<li><Card name="Objeto Rosa" belong="theCollector" author="breno" price="100.00"/></li>
				<li><Card name="Objeto Rosa" belong="theCollector" author="breno" price="100.00"/></li>
				<li><Card name="Objeto Rosa" belong="theCollector" author="breno" price="100.00"/></li>
				<li><Card name="Objeto Rosa" belong="theCollector" author="breno" price="100.00"/></li>
				<li><Card name="Objeto Rosa" belong="theCollector" author="breno" price="100.00"/></li>
				<li><Card name="Objeto Rosa" belong="theCollector" author="breno" price="100.00"/></li>
				<li><Card name="Objeto Rosa" belong="theCollector" author="breno" price="100.00"/></li>
			</ul>
        </>
    );
}
