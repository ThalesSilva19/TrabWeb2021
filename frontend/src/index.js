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
import Artist from './pages/Artist';
import Collection from './pages/Collection';
import AdminEditArt from './pages/AdminEditArt';
import AdminEditUser from './pages/AdminEditUser';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NewArt from './pages/NewArt';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
            	<Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/products/:id' component={ProductDetails}/>
                    <Route exact path='/artist/:user' component={Artist}/>
                    <Route exact path='/collection/:user' component={Collection}/>
                    <Route exact path='/admin' component={Admin}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/logout' component={Logout}/>
                    <Route exact path='/register' component={Register}/>
					<Route exact path='/admin/arte/:id' component={AdminEditArt}/>
					<Route exact path='/admin/:type/:id' component={AdminEditUser}/>
					<Route exact path='/admin/:type' component={AdminList}/>
                    <Route exact path='/cart' component={Cart}/>
                    <Route exact path='/checkout' component={Checkout}/>
                    <Route exact path='/new' component={NewArt}/>
            	</Switch>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
