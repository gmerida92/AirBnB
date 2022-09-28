import React, { useState, useEffect } from 'react';
import { Link, Redirect, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import DemoLogin from '../DemoLogin/DemoLogin';

function ProfileButton({ user, isLoaded }) {
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
        // e.preventDefault();
        dispatch(sessionActions.logout());
        return <Redirect to="/" />
    };

    if (user && isLoaded) {
        sessionLinks = (
            <div>
                <Link to="/">Trips</Link>
                <Link to="/">Hosting</Link>
                <Link to="/" onClick={logout}>Log Out</Link>
            </div>
        );
    } else {
        sessionLinks = (
            <div onClick={(e) => e.stopPropagation()}>
                <DemoLogin />
                <LoginFormModal />
                <SignupFormModal />
            </div>
        );
    }



    return (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && sessionLinks}
        </>
    );
}

export default ProfileButton;