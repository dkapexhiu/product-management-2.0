import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Products from './Products.js';
import './Navigation.css';
import Login from './login.js';
import Auth from './Authenticate.js';
import Home from './Home.jsx';
import Contact from './Contact.jsx';

const Navigation = () => (
  <Router>
  <div>
    <ul style={{display:'inlineBlock', marginLeft:'25%', width:'50%'}}>
      <li className="home"><Link to="/" style={{color: '#fff'}}>Home</Link></li>
      <li className="products"><Link to="/products" style={{color: '#fff'}}>Products</Link></li>
      <li className="contact"><Link to="/contact" style={{color: '#fff'}}>Contact</Link></li>
      <li className="login"><Link to="/login" style={{color: '#fff'}}>LogIn</Link></li>
    </ul>
    <Route exact path="/" component={Home}/>
    <Route path="/contact" component={Contact}/>
    <PrivateRoute path="/products" component={Products}/>
    <Route path="/login" component={Login}/>
  </div>
  </Router>
)

  const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
  )

export default Navigation;