import React, { useState } from 'react';
import * as sessionActions from '../../../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


function AddListingForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLatitude] = useState('');
    const [lng, setLongitude] = useState('');
    const [errors, setErrors] = useState([]);

    // if (sessionUser) return <Redirect to='/' />;

    const handleSubmit = (e) => {
        // e.preventDefault();
        // setErrors([]);
        // return dispatch(sessionActions.login({ credential, password }))
        //     .then(() => {
        //         setCredential('');
        //         setPassword('');
        //     })
        //     .catch(async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors);
        //     });
    };

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) =>
                    <li key={idx}>{error}</li>
                )}
            </ul>
            <label>
                Address
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </label>
            <label>
                City
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </label>
            <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </label>
            <label>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
            </label>
            <label>
                Latitude
                <input
                    type="text"
                    value={parseFloat(lat)}
                    onChange={(e) => setLatitude(e.target.value)}
                    required
                />
            </label>
            <label>
                Longitude
                <input
                    type="text"
                    value={parseFloat(lng)}
                    onChange={(e) => setLongitude(e.target.value)}
                    required
                />
            </label>
            <label>test</label>
            {/* <ul>
                {errors.map((error, idx) =>
                    <li key={idx}>{error}</li>
                )}
            </ul>
            <label>
                Email
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit Listing</button> */}
        </form>
    );
}

export default AddListingForm;