import React from 'react';
//import ReactDOM from 'react-dom';
import './Header.css';
import logo from './logo.png';
import { Link } from 'react-router-dom'; 
import Search  from './Search';
//import search from './search.png';

const containerStyle  = {
    fontSize: '40px'
}

const Header = () => {
   
    return (
        <div className="Header">
            <Link to="/">
                <img src={logo} alt="logo react" className="Header-logo" /> 
            </Link> 
            <Search />
        </div>


     );
}

export default Header;