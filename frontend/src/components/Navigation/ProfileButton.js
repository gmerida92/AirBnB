import React, { useState, useEffect } from 'react';
import { Link, Redirect, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';

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
                <LoginFormModal />
                <NavLink to='/api/users/signup'>Sign-up</NavLink>
            </div>
            // <div>
            //     <Link>Demo user</Link>
            //     <Link>Sign up</Link>
            // </div>
        );
    }



    return (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && sessionLinks
                // (
                //     <ul className="profile-dropdown">
                //         <li>{user.username}</li>
                //         <li>{user.email}</li>
                //         <li>
                //             <button onClick={logout}>Log Out</button>
                //         </li>
                //     </ul>
                // )
            }
        </>
    );
}

export default ProfileButton;