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
import AdminEditArt from './pages/AdminEditArt';
import AdminEditCustomer from './pages/AdminEditCustomer';
import AdminEditAdmin from './pages/AdminEditAdmin';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
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
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/logout' component={Logout}/>
					<Route exact path='/admin/arte/:id' component={AdminEditArt}/>
					<Route exact path='/admin/cliente/:id' component={AdminEditCustomer}/>
					<Route exact path='/admin/admin/:id' component={AdminEditAdmin}/>
					<Route exact path='/admin/:type' component={AdminList}/>
                    <Route exact path='/cart' component={Cart}/>
                    <Route exact path='/checkout' component={Checkout}/>
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
