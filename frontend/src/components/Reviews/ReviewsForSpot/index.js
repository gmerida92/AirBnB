import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as reviewActions from '../../../store/reviews';
import * as singleSpotActions from '../../../store/singlespot';
import './ReviewsForSpot.css'

function ReviewsForSpot({ loadSpotId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reviewActions.loadReviewsBySpotId(loadSpotId))
        dispatch(singleSpotActions?.loadSpotById(loadSpotId));
    }, [dispatch, loadSpotId]);

    let loadReviews = useSelector((state) => state?.reviews?.review) || ''

    return (
        <div className='listing_all_user_reviews_container'>
            {Object?.keys(loadReviews)?.map((reviewId) => {
                return (
                    <div className='listing_single_user_review_container'>
                        <div id="listing_user_review_name">{`${loadReviews[reviewId]?.User?.firstName}`}</div>
                        <div id="listing_user_review_createdAt">{`${loadReviews[reviewId]?.createdAt.slice(0,10)}`}</div>
                        <div id="listing_user_review_review">{`${loadReviews[reviewId]?.review}`}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default ReviewsForSpot;