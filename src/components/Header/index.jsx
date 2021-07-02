import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import './style.css';

export default function Header() {
    const { isLogged, isAdmin, user, signOut } = useContext(AuthContext)

    return (
        <div className="headerContainer">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">ARTES VIRTUAIS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cart">SACOLA</a>
                        </li>
                        {
                            isAdmin && (
                                <li className="nav-item">
                                    <a className="nav-link" href="/admin">ADMINISTRADOR</a>
                                </li>
                            )
                        }
                        {
                            isLogged ? (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link"  href={"/collection/" + user.name}>
                                            MINHAS ARTES
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link"  href="/logout">
                                            SAIR
                                        </a>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <a className="nav-link"  href="/login">
                                        LOGIN
                                    </a>
                                </li>
                            )
                        }
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <label >
                            <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Buscar"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
                        </label>
                    </form>
                </div>
            </nav>
        </div>
    );
}
