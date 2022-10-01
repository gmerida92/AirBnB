import React from 'react';
// import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'


function DemoLogin() {
    const dispatch = useDispatch();

    const user = {
        credential: 'demo@user.io',
        password: 'password5'
    };


    const handleClick = () => {
        dispatch(sessionActions.login(user));
    };


    return (
        <button onClick={handleClick}>Demo User</button>
    )
};

export default DemoLogin;