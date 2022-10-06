import React, { useState } from 'react';
// import * as sessionActions from '../../../../../store/session';
import * as spotActions from '../../../../../store/spots';
import { useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { Modal } from '../../../../../context/Modal';
// import { useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';


function AddListingForm({ onSubmit }) {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state?.session?.user);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLatitude] = useState('');
    const [lng, setLongitude] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);

    // if (sessionUser) return <Redirect to='/api/users/myaccount/spots' />;



    const handleSubmit = (e) => {
        e.preventDefault();
        let newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage
        }
        setErrors([]);
        return dispatch(spotActions.createSpot(newSpot))
            .then(() => {
                setAddress('');
                setCity('');
                setState('');
                setCountry('');
                setLatitude('');
                setLongitude('');
                setName('');
                setDescription('');
                setPrice('');
                setPreviewImage('');
                onSubmit();
                // return <Redirect to='/api/users/myaccount/spots' />
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                } else { setErrors([data.message]) };
            });
    };

    return (
        <form className='add_lising_form_modal_input_container' onSubmit={handleSubmit}>
            <ul>
                {Object.keys(errors).length > 0 && Object.keys(errors).map((errorKey, idx) =>
                    <li key={idx}>{errors[errorKey]}</li>
                )}
            </ul>
            <label className='form_labels'>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                placeholder='Address'
                />
            </label>
            <label className='form_labels'>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='City'
                />
            </label>
            <label className='form_labels'>
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder='State'
                />
            </label>
            <label className='form_labels'>
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder='Country'
                />
            </label>
            <label className='form_labels'>
                <input
                    type="number"
                    step=".000001"
                    value={lat}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder='Latitude'
                />
            </label>
            <label className='form_labels'>
                <input
                    type="number"
                    step=".000001"
                    value={lng}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder= 'Longitude'
                />
            </label>
            <label className='form_labels'>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name'
                />
            </label>
            <label className='form_labels'>
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Description'
                />
            </label>
            <label className='form_labels'>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='Price'
                />
            </label>
            <label className='form_labels'>
                <input
                    type="text"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    placeholder='Preview Image'
                />
            </label>
            <button className='form_button' type="submit">Create Listing</button>
        </form>
    );
}

export default AddListingForm;