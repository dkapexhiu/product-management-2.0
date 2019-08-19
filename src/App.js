import React from 'react';
import './App.css'
import Navigation from './Navigation';
import Footer from './Footer';

const App = () => (
  <div style={{position:'relative'}} className="app">
    <Navigation />
    <Footer />
  </div>
);

export default App;