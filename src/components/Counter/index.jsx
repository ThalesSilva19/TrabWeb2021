import './style.css';

import { useEffect, useState } from 'react';

export default function Counter() {

    const [counter, setCounter] = useState(1);

    async function subtractCounter() {
        if(counter > 1) {
            setCounter(counter-1);
        }
    }

    async function addCounter() {
        setCounter(counter+1);
    }

    return( 
        <div className="counterContainer">
            <button onClick={subtractCounter}>-</button>
            <input type="number" value={counter} readOnly/>
            <button onClick={addCounter}>+</button>
        </div>
    );
}