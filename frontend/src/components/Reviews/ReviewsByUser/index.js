import React from "react";
import { NavLink } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import * as userReviewActions from '../../../store/userReviews'
import * as spotActions from '../../../store/spots'
import EditReviewFormModal from "./ModifyingButtons/EditReviewModal";
import DeleteReview from './ModifyingButtons/DeleteReview';
import './ReviewsByUser.css'

function ReviewsByUser() {
    const dispatch = useDispatch();
    let userReviews = useSelector((state) => state?.userReviews?.userReview) || ''
    let allSpots = useSelector((state) => state?.spots?.spot) || ''

    useEffect(() => {
        dispatch(userReviewActions?.loadReviewsByUser());
        dispatch(spotActions?.loadAllSpots())
    }, [dispatch]);



    return (
        <div className="user_listings_review_container">
            {!Object?.keys(userReviews)?.length && <div>No Reviews At This Moment</div>}
            {Object?.keys(userReviews)?.map((reviewId) => {
                return (
                    <div className="single_listing_user_review_container">

                        <div className="single_listing_location_details_container">
                            <NavLink to={`/api/spots/${userReviews[reviewId]?.Spot?.id}`}>
                                <img
                                    className='single_listing_image'
                                    src={allSpots[userReviews[reviewId]?.Spot?.id]?.previewImage}
                                    alt={allSpots[userReviews[reviewId]?.Spot?.id]?.name}
                                />
                            </NavLink>

                            <div className="single_listing_details">
                                <NavLink id='single_listing_name' to={`/api/spots/${userReviews[reviewId]?.Spot?.id}`}>
                                    {`${userReviews[reviewId]?.Spot?.name}`}
                                </NavLink>
                                <span>{`${userReviews[reviewId]?.Spot?.address}`}</span>
                                <span>{`${userReviews[reviewId]?.Spot?.city}, ${userReviews[reviewId]?.Spot?.state}`}</span>
                            </div>
                        </div>


                        <div className="user_review_details_container">
                            <div className="user_review_rating_container">
                                <span><i className="fa-sharp fa-solid fa-star"></i></span>
                                <span id="user_review_rating">{`${userReviews[reviewId]?.stars}`}</span>
                                <span id="user_review_createdAt">{`${userReviews[reviewId]?.createdAt?.slice(0, 10)}`}</span>
                            </div>
                            <div className="user_review_images_container">
                                {userReviews[reviewId]?.Images?.map((imageDetails) => {
                                    return (
                                        <img
                                            className='user_review_images'
                                            src={imageDetails?.url}
                                            alt={userReviews[reviewId]?.Spot?.name}
                                        />
                                    )
                                })}
                            </div>
                            <div className="user_review_container">
                                <p>{`${userReviews[reviewId]?.review}`}</p>
                            </div>
                        </div>

                        <EditReviewFormModal key={userReviews[reviewId]?.name} userReviewId={userReviews[reviewId]?.id} />
                        <DeleteReview userReviewId={userReviews[reviewId]?.id} />

                    </div>
                )
            })}
        </div >
    )
}

export default ReviewsByUser;