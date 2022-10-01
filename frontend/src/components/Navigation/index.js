import React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton/ProfileButton';
import AddListingFormModal from '../Spots/Listings/ModifyButtons/AddListingModal';
import './Navigation.css';


function Navigation() {
    const sessionUser = useSelector((state) => state?.session?.user) || ''


    return (
        <div className='header'>
            <div className='header_home'>
                <NavLink exact to="/">
                    <i className="fa-brands fa-airbnb"></i>
                    airbnb
                </NavLink>
            </div>
            {sessionUser && <div> <AddListingFormModal /> </div>}
            <div className='header_user'>
                <ProfileButton sessionUser={sessionUser} />
            </div>
        </div>
    );
};

export default Navigation;