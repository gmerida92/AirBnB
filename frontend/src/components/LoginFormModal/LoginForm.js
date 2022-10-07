import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'

function LoginForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to='/' />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => {
                setCredential('');
                setPassword('');
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                } else { setErrors([data.message]) };
            });
    };

    return (
        <form className='form_modal_input_container' onSubmit={handleSubmit}>
            <ul>
                {Object.keys(errors).length > 0 && Object.keys(errors).map((errorKey, idx) =>
                    <li key={idx}>{errors[errorKey]}</li>
                )}
            </ul>
            <label className='form_labels'>
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    placeholder='Email'
                />
            </label>
            <label className='form_labels'>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                />
            </label>
            <button className='form_button' type="submit">Log In</button>
        </form>
    );
}

export default LoginForm;