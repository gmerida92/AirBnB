import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css'

function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();

        if(firstName.indexOf(" ") >= 0) return setErrors(['First Name Can Not be Empty Space']);
        if(lastName.indexOf(" ") >= 0) return setErrors(['Last Name Can Not be Empty Space']);
        if(email.indexOf(" ") >= 0) return setErrors(['Email Can Not be Empty Space']);
        if(username.indexOf(" ") >= 0) return setErrors(['Username Can Not be Empty Space']);
        if(password.indexOf(" ") >= 0) return setErrors(['Password Can Not be Empty Space']);
        if(confirmPassword.indexOf(" ") >= 0) return setErrors(['Confirm Password Can Not be Empty Space']);

        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({
                firstName,
                lastName,
                email,
                username,
                password
            }))
                .then(() => {
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setUsername('');
                    setPassword('');
                    setConfirmPassword('');
                    dispatch(sessionActions?.restoreUser())
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors)
                    } else { setErrors([data.message]) };
                });
        }
        
        return setErrors(['Confirm Password field must be the same as the Password field'])
    };

    return (
        <form className='signup_form_modal_input_container' onSubmit={handleSubmit}>
            <ul>
                {Object.keys(errors).length > 0 && Object.keys(errors).map((errorKey, idx) =>
                    <li className='all_errors_text' key={idx}>{errors[errorKey]}</li>
                )}
            </ul>
            <label className='form_labels'>
                <input
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder='First Name'
                />
            </label>
            <label className='form_labels'>
                <input
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder='Last Name'
                />
            </label>
            <label className='form_labels'>
                <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                />
            </label>
            <label className='form_labels'>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                />
            </label>
            <label className='form_labels'>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                />
            </label>
            <label className='form_labels'>
                <input
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confrim Password'
                />
            </label>
            <button className='form_button' type='submit'>Sign up</button>
        </form>
    )
}

export default SignupForm;