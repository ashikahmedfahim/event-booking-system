import React from 'react'
import { Link } from 'react-router-dom';
import './MainNavigation.css';

const MainNavigation = () => {
    return (
        <div className="main-navigation-container">
            <h1>Event Booking System</h1>
            <nav className="main-navigation">
                <ul className="main-navigation-list">
                    <li><Link to="/" className='main-navigation-list-item'>Home</Link></li>
                    <li><Link to="/auth" className='main-navigation-list-item'>Auth</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default MainNavigation