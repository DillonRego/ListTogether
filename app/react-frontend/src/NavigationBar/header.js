import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Userfront from "@userfront/react";


const Header = () => {
    return (
        <div className="container">
            <div className="header">
                <h1 className="logo">ListTogether</h1>
                <nav>
                    <ul>
                        <li><Link to="/dashboard">dashboard</Link></li>
                        <li><Link to="/newform">newform</Link></li>
                        <li><Link to="/profile">profile</Link></li>
                        <li><Link to="/login">login</Link></li>
                        <li><Link to="/signup">signup</Link></li>
                    </ul>
                </nav>
                <img
                    class="fill"
                    src={Userfront.user.image}
                    alt="User profile"
                    style={{display: "flex", width: 50, height: 50, objectFit: "cover", borderRadius: "100%", justifyContent: "center"}}
                />
            </div>
        </div>
    );
};

export default Header;

