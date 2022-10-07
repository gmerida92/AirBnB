import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as userReviewActions from '../../../../../store/userReviews'


function EditReviewForm({ userReviewId, onSubmit }) {
    const dispatch = useDispatch();
    const currentReview = useSelector((state) => state?.userReviews?.userReview[userReviewId]) || ''
    const [review, setReview] = useState(currentReview.review);
    const [stars, setStars] = useState(currentReview.stars);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(review.indexOf(" ") === 0) return setErrors(['Review Can Not be Empty Space']);

        setErrors([]);
        let reviewEdits = {
            review,
            stars
        };

        return dispatch(userReviewActions.editReview(userReviewId, reviewEdits))
            .then(() => {
                dispatch(userReviewActions?.loadReviewsByUser())
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
                Rating
                <input
                    id='add_review_input'
                    type="number"
                    min="1"
                    max="5"
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    placeholder={currentReview.stars}
                />
            </label>
            <label className='form_labels'>
                Review
                <textarea
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder={currentReview.review}
                />
            </label>
            <button className='form_button' type="submit">Submit Review</button>
        </form>
    )
}

export default EditReviewForm;