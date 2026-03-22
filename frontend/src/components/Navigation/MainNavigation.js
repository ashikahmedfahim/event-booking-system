import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './MainNavigation.css';
import AuthContext from '../../context/auth-context';

const MainNavigation = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        authContext.logout();
        navigate('/auth');
    }

    return (
        <div className="main-navigation-container">
            <h1>Event Booking System</h1>
            <nav className="main-navigation">
                <ul className="main-navigation-list">
                    <li><Link to="/" className='main-navigation-list-item'>Home</Link></li>
                    {authContext.isLoggedIn && <li><Link to="/events" className='main-navigation-list-item'>Events</Link></li>}
                    {authContext.isLoggedIn && <li><Link to="/bookings" className='main-navigation-list-item'>Bookings</Link></li>}
                    {!authContext.isLoggedIn && <li><Link to="/auth" className='main-navigation-list-item'>Auth</Link></li>}
                    {authContext.isLoggedIn && <li><button onClick={logoutHandler} className='main-navigation-list-item-button'>Logout</button></li>}
                </ul>
            </nav>
        </div>
    )
}

export default MainNavigation