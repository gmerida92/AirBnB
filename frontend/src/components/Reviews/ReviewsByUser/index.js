import React from "react";
import { NavLink } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import * as userReviewActions from '../../../store/userReviews'
import EditReviewFormModal from "./ModifyingButtons/EditReviewModal";
import DeleteReview from './ModifyingButtons/DeleteReview';

function ReviewsByUser() {
    const dispatch = useDispatch();
    let userReviews = useSelector((state) => state?.userReviews?.userReview) || ''

    useEffect(() => {
        dispatch(userReviewActions?.loadReviewsByUser());
    }, [dispatch]);



    return (
        <div>
            {Object?.keys(userReviews)?.map((reviewId) => {
                return (
                    <div>
                        {userReviews[reviewId]?.Images?.map((imageDetails) => {
                            return (
                                <NavLink key={imageDetails.id} to={`/api/spots/${userReviews[reviewId]?.Spot?.id}`}>
                                    <div>
                                        <img
                                            className='spot-image'
                                            src={imageDetails?.url}
                                            alt={userReviews[reviewId]?.Spot?.name}
                                        />
                                        {`${userReviews[reviewId]?.Spot?.name}`}
                                    </div>
                                </NavLink>
                            )
                        })}
                        <div>
                            <p>{`${userReviews[reviewId]?.Spot?.address}`}</p>
                            <p>{`${userReviews[reviewId]?.Spot?.city}, ${userReviews[reviewId]?.Spot?.state}`}</p>
                        </div>
                        <div>
                            <p>{`${userReviews[reviewId]?.stars}`}</p>
                            <p>{`${userReviews[reviewId]?.review}`}</p>
                        </div>
                        <EditReviewFormModal key={userReviews[reviewId]?.name} userReviewId={userReviews[reviewId]?.id} />
                        <DeleteReview userReviewId={userReviews[reviewId]?.id} />
                    </div>
                )
            })}
        </div >)
}

export default ReviewsByUser;