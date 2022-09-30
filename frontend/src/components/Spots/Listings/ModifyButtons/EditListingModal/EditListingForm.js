import React, { useState } from 'react';
// import * as sessionActions from '../../../../../store/session';
import * as spotActions from '../../../../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';


function EditListingForm({ userSpotId }) {
    const dispatch = useDispatch();
    const currentSpot = useSelector((state) => state?.spots?.spot[userSpotId]) || ''
    const [address, setAddress] = useState(currentSpot.address);
    const [city, setCity] = useState(currentSpot.city);
    const [state, setState] = useState(currentSpot.state);
    const [country, setCountry] = useState(currentSpot.country);
    const [lat, setLatitude] = useState(currentSpot.lat);
    const [lng, setLongitude] = useState(currentSpot.lng);
    const [name, setName] = useState(currentSpot.name);
    const [description, setDescription] = useState(currentSpot.description);
    const [price, setPrice] = useState(currentSpot.price);
    const [previewImage, setPreviewImage] = useState(currentSpot.previewImage);
    // const [errors, setErrors] = useState([]);

    // if (sessionUser) return <Redirect to='/' />;



    const handleSubmit = (e) => {
        e.preventDefault();
        let spotEdit = {
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

        // setErrors([]);
        return dispatch(spotActions.editASpot(spotEdit, userSpotId))
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
            })
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors);
        // });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* <ul>
                {errors.map((error, idx) =>
                    <li key={idx}>{error}</li>
                )}
            </ul> */}
            <label>
                Address
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={currentSpot.address}
                    required
                />
            </label>
            <label>
                City
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={currentSpot.city}
                    required
                />
            </label>
            <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder={currentSpot.state}
                    required
                />
            </label>
            <label>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder={currentSpot.country}
                    required
                />
            </label>
            <label>
                Latitude
                <input
                    type="text"
                    value={lat}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder={currentSpot.lat}
                    required
                />
            </label>
            <label>
                Longitude
                <input
                    type="text"
                    value={lng}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder={currentSpot.lng}
                    required
                />
            </label>
            <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={currentSpot.name}
                    required
                />
            </label>
            <label>
                Description
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={currentSpot.description}
                    required
                />
            </label>
            <label>
                Price
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={currentSpot.price}
                    required
                />
            </label>
            <label>
                Preview Image
                <input
                    type="text"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    placeholder={currentSpot.previewImage}
                    required
                />
            </label>
            <button type="submit">Update Listing</button>
        </form>
    );
}

export default EditListingForm;