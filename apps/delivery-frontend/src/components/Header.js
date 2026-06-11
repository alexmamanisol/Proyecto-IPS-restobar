import React from "react";

const Header = () => {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="/" role="button">
                        <i className="fas fa-bars" />
                    </a>
                </li>
                <li className="nav-item">
                    <span className="nav-link">
                        <i className="fas fa-truck" /> Delivery - Restobar
                    </span>
                </li>
            </ul>
        </nav>
    );
};

export default Header;