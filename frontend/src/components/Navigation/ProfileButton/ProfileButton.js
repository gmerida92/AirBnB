import React, { useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';
import LoginFormModal from '../../LoginFormModal';
import SignupFormModal from '../../SignupFormModal';
import DemoLogin from '../../DemoLogin/DemoLogin';
import './ProfileButton.css'

function ProfileButton({ sessionUser }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    let sessionLinks;

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        dispatch(sessionActions.logout());
        setShowMenu(false);
        return <Redirect to="/" />
    };


    if (sessionUser) {
        sessionLinks = (
            <div className='user_only_links' onClick={(e) => e.stopPropagation()}>
                <div className='user_link_container'>
                    <NavLink id='user_links' to="/api/users/myaccount">Profile</NavLink>
                </div>
                <div className='user_link_container'>
                    <NavLink id='user_links' to="/api/users/myaccount/spots">Listings</NavLink>
                </div>
                <div className='user_link_container'>
                    <NavLink id='user_links' to="/" onClick={logout}>Log Out</NavLink>
                </div>
            </div>
        );
    } else {
        sessionLinks = (
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <DemoLogin />
                </div>
                <div>
                    <LoginFormModal />
                </div>
                <div>
                    <SignupFormModal />
                </div>
            </div>
        );
    }


    return (
        <>
            <button onClick={openMenu}>
                <span id='list_bars'>
                    <i className="fa-solid fa-bars fa-2x"></i>
                </span>
                <span>
                    <i className="fa-solid fa-circle-user fa-2x"></i>
                </span>
            </button>
            {showMenu && sessionLinks}
        </>
    );
}

export default ProfileButton;