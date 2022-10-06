import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as reviewActions from '../../../../../store/reviews'
import * as singleSpotActions from '../../../../../store/singlespot';


function AddReviewForm({ loadSpotId, onSubmit }) {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        let newReview = {
            review,
            stars
        };

        return dispatch(reviewActions.createReview(loadSpotId, newReview))
            .then(() => {
                dispatch(singleSpotActions?.loadSpotById(loadSpotId));
                setReview('');
                setStars('');
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
        <form className='add_review_form_modal_input_container' onSubmit={handleSubmit}>
            <ul>
                {Object.keys(errors).length > 0 && Object.keys(errors).map((errorKey, idx) =>
                    <li key={idx}>{errors[errorKey]}</li>
                )}
            </ul>
            <label className='form_labels'>
                <input
                    id='add_review_input'
                    type="number"
                    min="1"
                    max="5"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    placeholder='Rating'
                />
            </label>
            <label className='form_labels'>
                <textarea
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder='Review'
                />
            </label>
            <button className='form_button' type="submit">Submit Review</button>
        </form>
    )
}

export default AddReviewForm;