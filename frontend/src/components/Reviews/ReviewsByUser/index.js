import React from "react";
import { NavLink } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import * as userReviewActions from '../../../store/userReviews'
import EditReviewFormModal from "./ModifyingButtons/EditReviewModal";
import DeleteReview from './ModifyingButtons/DeleteReview';

function ReviewsByUser() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userReviewActions?.loadReviewsByUser());
    }, [dispatch]);

    let userReviews = useSelector((state) => state?.userReviews?.userReview) || ''

    return (
        <div>
            {Object?.keys(userReviews)?.map((reviewId) => {
                return (
                    <div>
                        <NavLink key={reviewId} to={`/api/spots/${userReviews[reviewId]?.Spot?.id}`}>
                            <div>
                                <img
                                    className='spot-image'
                                    src={userReviews[reviewId]?.Images[0]?.url}
                                    alt={userReviews[reviewId]?.name}
                                />
                                {`${userReviews[reviewId]?.Spot?.name}`}
                            </div>
                        </NavLink>
                        <div>
                            <p>{`${userReviews[reviewId]?.Spot?.address}`}</p>
                            <p>{`${userReviews[reviewId]?.Spot?.city}, ${userReviews[reviewId]?.Spot?.state}`}</p>
                        </div>
                        <div>
                            <p>{`${userReviews[reviewId]?.stars}`}</p>
                            <p>{`${userReviews[reviewId]?.review}`}</p>
                        </div>
                        <EditReviewFormModal key={userReviews[reviewId]?.name} userReviewId={userReviews[reviewId]?.id}/>
                        <DeleteReview userReviewId={userReviews[reviewId]?.id}/>
                        {/* <EditReviewFormModal key={userSpots[spotId]?.name} userSpotId={userSpots[spotId]?.id}/>
                        <DeleteListing userSpotId={userSpots[spotId]?.id}/> */}
                    </div>
                )
            })}
        </div >)
}

export default ReviewsByUser;