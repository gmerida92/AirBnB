import React from 'react';
// import { useEffect } from 'react';
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
                <NavLink className="header_home_link" exact to="/">
                    <i className="fa-brands fa-airbnb fa-4x"></i>
                    <p className='header-logo'>StayCation</p>
                </NavLink>
            </div>

            <div className='header_user_button'>
                {sessionUser &&
                    <span className='host_button'>
                        <AddListingFormModal />
                    </span>}
                <ProfileButton sessionUser={sessionUser} />
            </div>

        </div>
    );
};

export default Navigation;