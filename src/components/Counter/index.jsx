import './style.css';

import { useEffect, useState } from 'react';

export default function Counter(props) {
    //const [counter, setCounter] = useState(1);
    const {counter, setCounter} = props;

    async function subtractCounter() {
		if((props.minVal != undefined && counter-1 >= props.minVal) ||
			(props.minVal == undefined && counter-1 >= 1)) {
            setCounter(counter-1);
        }
    }

    async function addCounter() {
		if(props.maxVal == undefined || counter+1<=props.maxVal)
        	setCounter(counter+1);
    }

    return( 
        <div className="counterContainer">
            <button className="counterButton" onClick={subtractCounter}>-</button>
			<p>{counter}</p>
            <button className="counterButton" onClick={addCounter}>+</button>
        </div>
    );
}
