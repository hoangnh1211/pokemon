import React from 'react';
import './app.css'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './page/Header/Header';

import Body from './page/Body/Body';
function App() {
  return (
    <Router>
    <Header/>
    <Body/>    
    </Router>
  )
}

export default App;
