import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import './style.css';

export default function Header() {

    const { isLogged, isAdmin } = useContext(AuthContext)

    return (
        <div className="headerContainer">
            <nav>
                <a href="/">Artes Virtuais</a>
                <a href="/cart">Sacola</a>
                {
                    isAdmin && (
                        <a href="/adm-page">
                            Administrador
                        </a>
                    )
                }
                {
                    isLogged ? (
                        <>
                            <a href="/my-arts">
                                Minhas Artes
                            </a>
                            <a href="/logout">
                                Sair
                            </a>
                        </>
                    ) : (
                        <a href="/login">
                            Login
                        </a>  
                    )
                }
            </nav>
            <form>
                <input type="text" name="search" id="search" placeholder="pesquisar"/>
                <button type="submit">P</button>
            </form>
        </div>
    )
}