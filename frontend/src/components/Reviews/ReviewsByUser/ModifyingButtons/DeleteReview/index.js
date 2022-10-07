import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as userReviewActions from '../../../../../store/userReviews'

function DeleteReview({ userReviewId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userReviewActions?.loadReviewsByUser());
    }, [dispatch]);

    const removeReview = (e) => {
        dispatch(userReviewActions.deleteReview(userReviewId));
    };

    return (
        <button onClick={removeReview}><i className="fa-solid fa-trash"></i></button>
    )
}

export default DeleteReview;