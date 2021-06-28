import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Home } from "../../contexts/AuthContext";

export default function Logout() {
    const { signout } = useContext(AuthContext)
    const history = useHistory();
    
    signout()
    history.push('/')
    return(
        <></>
    )   
    
}
