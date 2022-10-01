import React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'
import ProfileButton from './ProfileButton/ProfileButton';
import AddListingFormModal from '../Spots/Listings/ModifyButtons/AddListingModal';
import './Navigation.css';


function Navigation({ isLoaded }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state?.session?.user) || ''

    useEffect(() => {
        dispatch(sessionActions?.restoreUser())
        //   .then(() => setIsLoaded(true));
      }, [dispatch]);

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
                <ProfileButton user={sessionUser} isLoaded={isLoaded} />
            </div>
        </div>
    );
};

export default Navigation;