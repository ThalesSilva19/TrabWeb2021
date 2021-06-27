import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import './style.css';

export default function Header() {
    const { isLogged, isAdmin, user } = useContext(AuthContext)

    return (
        <div className="headerContainer">
            <nav>
                <a href="/">Artes Virtuais</a>
                <a href="/cart">Sacola</a>
                {
                    isAdmin && (
                        <a href="/admin">
                            Administrador
                        </a>
                    )
                }
                {
                    isLogged ? (
                        <>
                            <a href={"/users/" + user.name}>
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
                <input type="text" name="search" id="search" placeholder="Pesquisar"/>
            </form>
        </div>
    )
}
