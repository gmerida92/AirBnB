import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as userReviewActions from '../../../../../store/userReviews'


function EditReviewForm({ userReviewId }) {
    const dispatch = useDispatch();
    const currentReview = useSelector((state) => state?.userReviews?.userReview[userReviewId]) || ''
    const [review, setReview] = useState(currentReview.review);
    const [stars, setStars] = useState(currentReview.stars);

    const handleSubmit = (e) => {
        e.preventDefault();

        let reviewEdits = {
            review,
            stars
        };

        return dispatch(userReviewActions.editReview(userReviewId, reviewEdits))
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
                    placeholder={currentReview.stars}
                    required
                />
            </label>
            <label>
                Review
                <textarea
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder={currentReview.review}
                    required
                />
            </label>
            <button type="submit">Submit Review</button>
        </form>
    )
}

export default EditReviewForm;