import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton/ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }) {

    const sessionUser = useSelector((state) => state.session.user);


    return (
        <div className='header'>
            <div className='header_home'>
                <NavLink exact to="/">
                    <i className="fa-brands fa-airbnb"></i>
                    airbnb
                </NavLink>
            </div>
            <div className='header_user'>
                <ProfileButton user={sessionUser} isLoaded={isLoaded} />
            </div>
        </div>
    );
};

export default Navigation;