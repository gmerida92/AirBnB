import React from "react";
import { NavLink } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import * as userReviewActions from '../../../store/userReviews'
import * as spotActions from '../../../store/spots'
import EditReviewFormModal from "./ModifyingButtons/EditReviewModal";
import DeleteReview from './ModifyingButtons/DeleteReview';

function ReviewsByUser() {
    const dispatch = useDispatch();
    let userReviews = useSelector((state) => state?.userReviews?.userReview) || ''
    let allSpots = useSelector((state) => state?.spots?.spot) || ''

    useEffect(() => {
        dispatch(userReviewActions?.loadReviewsByUser());
        dispatch(spotActions?.loadAllSpots())
    }, [dispatch]);



    return (
        <div>
            <h3>Your Reviews:</h3>
            {Object?.keys(userReviews)?.length === 0 && <div>No Reviews At This Moment</div>}
            {Object?.keys(userReviews)?.map((reviewId) => {
                return (
                    <div>
                        <div>
                            <NavLink to={`/api/spots/${userReviews[reviewId]?.Spot?.id}`}>
                                <img
                                    className='spot-image'
                                    src={allSpots[userReviews[reviewId]?.Spot?.id]?.previewImage}
                                    alt={allSpots[userReviews[reviewId]?.Spot?.id]?.name}
                                />
                                {`${userReviews[reviewId]?.Spot?.name}`}
                            </NavLink>
                        </div>
                        <div>
                            <p>{`${userReviews[reviewId]?.Spot?.address}`}</p>
                            <p>{`${userReviews[reviewId]?.Spot?.city}, ${userReviews[reviewId]?.Spot?.state}`}</p>
                        </div>
                        <div>
                            <p>
                                <i className="fa-sharp fa-solid fa-star"></i>
                                {`${userReviews[reviewId]?.stars}`}</p>
                            {userReviews[reviewId]?.Images?.map((imageDetails) => {
                                return (
                                    <div>
                                        <img
                                            className='spot-image'
                                            src={imageDetails?.url}
                                            alt={userReviews[reviewId]?.Spot?.name}
                                        />
                                    </div>
                                )
                            })}
                            <p>{`${userReviews[reviewId]?.review}`}</p>
                        </div>
                        <EditReviewFormModal key={userReviews[reviewId]?.name} userReviewId={userReviews[reviewId]?.id} />
                        <DeleteReview userReviewId={userReviews[reviewId]?.id} />
                    </div>
                )
            })}
        </div>
    )
}

export default ReviewsByUser;