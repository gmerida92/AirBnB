import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as reviewActions from '../../../../../store/reviews'


function AddReviewForm({ loadSpotId }) {
    const dispatch = useDispatch();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        let newReview = {
            review,
            stars
        };
        
        return dispatch(reviewActions.createReview(loadSpotId, newReview))
        .then(() => {
            setReview('');
            setStars('');
        })
    };



    return (
        <form onSubmit={handleSubmit}>
            <label>
                Rating
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    required
                />
            </label>
            <label>
                Review
                <textarea
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit Review</button>
        </form>
    )
}

export default AddReviewForm;