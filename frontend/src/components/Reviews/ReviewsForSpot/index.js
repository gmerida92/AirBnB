import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as reviewAction from '../../../store/reviews'

function ReviewsForSpot({ loadSpotId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reviewAction.loadReviewsBySpotId(loadSpotId))
    }, [dispatch, loadSpotId]);

    let loadReviews = useSelector((state) => state?.reviews?.review) || ''

    return (
        <div>
            {Object?.keys(loadReviews)?.map((reviewId) => {
                return (
                    <div>
                        <p>{`${loadReviews[reviewId]?.User?.firstName}`}</p>
                        <p>{`${loadReviews[reviewId]?.createdAt.slice(0,10)}`}</p>
                        <p>{`${loadReviews[reviewId]?.review}`}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default ReviewsForSpot;