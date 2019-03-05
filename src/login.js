import React, { Component } from 'react';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';
import Auth from './Authenticate.js';
import './login.css';

class Login extends Component {
    constructor() {
    super();
    this.state = {
        user: null,
        redirectToReferrer: false
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.renderLoginButton = this.renderLoginButton.bind(this);
    }

componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
        this.setState({ user });
    });
}

handleAuth(e){
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} has started a session`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));

    Auth.authenticate(() => {
        this.setState({ redirectToReferrer: true })
    })
}

handleLogout(e){
    e.preventDefault();
    firebase.auth().signOut()
    .then(result => console.log(`User has finished a session`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));

   Auth.signout(() => {
    this.setState({ redirectToReferrer: false })
})
}

renderLoginButton(){
    if(this.state.user){
        return(
            <div id="loggedin" style={{ textAlign:'center', color:'#e6d32b', marginRight:'auto', marginLeft:'auto', width:'80%', height:'344px', marginBottom:'0', marginTop:'0' }}>
                <img src={this.state.user.photoURL} alt={this.state.user.displayName} style={{"height":"150px", "width":"150px"}}/>
                <br></br>
                <button onClick={this.handleLogout} className="btn btn-primary">Logout</button>
                <br></br>
                <p>Hi {this.state.user.displayName}!</p>
            </div>
        );
    }else{
        return(
        <div id="login" style={{ textAlign:'center', color:'#e6d32b', marginRight:'auto', marginLeft:'auto', width:'80%', height:'324px', marginBottom:'0', marginTop:'0' }}>
        <button onClick={this.handleAuth} className="btn btn-primary">LogIn</button>
        <p>By logging in you will have access to your free inventory!</p>
        </div>
        );
    }
}

render(){
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return(
        <div id="loggedBtn" className="div" style={{ textAlign:'center', color:'#e6d32b', marginRight:'auto', marginLeft:'auto', width:'80%', height:'324px', marginBottom:'0', marginTop:'0' }}>
            {this.renderLoginButton()}
        </div>
    );
}
}
export default Login