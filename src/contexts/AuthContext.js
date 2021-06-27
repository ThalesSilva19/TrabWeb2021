import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({});

export function AuthProvider( {children} ) {

    const [user, setUser] = useState(null);

    const isLogged = !!user;
    const isAdmin = user?.isAdmin || false;

    useEffect(() => {
        // Pegamos o usuário aqui para carregar a página
        var auxUser = {
            name: 'thales',
            email: 'thales.wds2019@usp.br',
            password: '1234',
            isAdmin: true,
        }
        setUser(auxUser);
    }, []);

    async function signIn({ email, password }) {
        // Faz um post no backend
    }

    async function signOut() {
        // Limpa o token dos cookies
    }

    return (
        <AuthContext.Provider value={{ user, isLogged, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}
