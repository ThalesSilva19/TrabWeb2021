import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import reportWebVitals from './reportWebVitals';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails'
import Admin from './pages/Admin';
import AdminList from './pages/AdminList';
import User from './pages/User';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <AuthProvider>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/products' component={Products}/>
                    <Route exact path='/products/:id' component={ProductDetails}/>
                    <Route exact path='/users/:user' component={User}/>
                    <Route exact path='/admin' component={Admin}/>
					<Route exact path='/admin/:type' component={AdminList}/>
                </AuthProvider>
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
