import React from 'react';
import { Redirect } from 'react-router-dom';
// import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as sessionActions from '../../store/session'


function DemoLogin() {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    if (sessionUser) return <Redirect to="/" />;

    const user = {
        credential: 'demo@user.io',
        password: 'password5'
    };


    const handleClick = () => {
        return dispatch(sessionActions.login(user));
    };


    return (
        <button onClick={handleClick}>Demo User</button>
    )
};

export default DemoLogin;