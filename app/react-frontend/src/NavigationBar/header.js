import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Userfront from "@userfront/react";


const Header = () => {
    const isLoggedIn = Userfront.accessToken();

    return (
        <div className="container">
            <div className="header">
                <h1 className="logo">ListTogether</h1>
                <nav>
                    <ul>
                        <li><Link to="/dashboard">dashboard</Link></li>
                        <li><Link to="/newform">newform</Link></li>
                        <li><Link to="/upload">upload</Link></li>
                        <li><Link to="/gallery">gallery</Link></li>
                        {!isLoggedIn && (
                            <>
                            <div className="login">
                                <li><Link to="/login">login</Link></li>
                                <li><Link to="/signup">signup</Link></li>
                            </div>
                            </>
                        )}
                    </ul>
                </nav>
                {isLoggedIn && (
                    <div className="profile">
                    <nav>                        
                        <Link to="/profile">
                            <img
                                class="fill"
                                src={Userfront.user.image}
                                alt="User profile"
                                style={{display: "flex", width: 50, height: 50, objectFit: "cover", borderRadius: "100%", justifyContent: "center"}}
                            />
                        </Link>
                    </nav>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Header;
