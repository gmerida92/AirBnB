import React, { useState } from 'react';
// import * as sessionActions from '../../../../../store/session';
import * as spotActions from '../../../../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';


function EditListingForm({ userSpotId, onSubmit }) {
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
    const [errors, setErrors] = useState([]);

    // if (sessionUser) return <Redirect to='/' />;



    const handleSubmit = (e) => {
        e.preventDefault();

        if(address.indexOf(" ") === 0) return setErrors(['Address Can Not be Empty Space']);
        if(city.indexOf(" ") === 0) return setErrors(['City Can Not be Empty Space']);
        if(state.indexOf(" ") === 0) return setErrors(['State Can Not be Empty Space']);
        if(country.indexOf(" ") === 0) return setErrors(['Country Can Not be Empty Space']);
        // if(lat.indexOf(" ") >= 0) return setErrors(['Latitude Can Not be Empty Space']);
        // if(lng.indexOf(" ") >= 0) return setErrors(['Longitude Can Not be Empty Space']);
        if(name.indexOf(" ") === 0) return setErrors(['Name Can Not be Empty Space']);
        if(description.indexOf(" ") === 0) return setErrors(['Description Can Not be Empty Space']);
        // if(price.indexOf(" ") >= 0) return setErrors(['Price Can Not be Empty Space']);
        if(previewImage.indexOf(" ") >= 0) return setErrors(['Preview Image Can Not be Empty Space']);
        
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

        setErrors([]);
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
                onSubmit();
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                } else { setErrors([data.message]) };
            });
    };

    return (
        <form className='edit_lising_form_modal_input_container' onSubmit={handleSubmit}>
            <ul>
                {Object.keys(errors).length > 0 && Object.keys(errors).map((errorKey, idx) =>
                    <li className='all_errors_text' key={idx}>{errors[errorKey]}</li>
                )}
            </ul>
            <label className='form_labels'>
                Address
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={currentSpot.address}

                />
            </label>
            <label className='form_labels'>
                City
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={currentSpot.city}

                />
            </label>
            <label className='form_labels'>
                State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder={currentSpot.state}

                />
            </label>
            <label className='form_labels'>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder={currentSpot.country}

                />
            </label>
            <label className='form_labels'>
                Latitude
                <input
                    type="number"
                    step=".000001"
                    value={lat}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder={currentSpot.lat}

                />
            </label>
            <label className='form_labels'>
                Longitude
                <input
                    type="number"
                    step=".000001"
                    value={lng}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder={currentSpot.lng}

                />
            </label>
            <label className='form_labels'>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={currentSpot.name}

                />
            </label>
            <label className='form_labels'>
                Description
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={currentSpot.description}

                />
            </label>
            <label className='form_labels'>
                Price
                <input
                    type="number"
                    step=".01"
                    min='0'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={currentSpot.price}
                />
            </label>
            <label className='form_labels'>
                Preview Image
                <input
                    type="text"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    placeholder={currentSpot.previewImage}

                />
            </label>
            <button className='form_button' type="submit">Update Listing</button>
        </form>
    );
}

export default EditListingForm;