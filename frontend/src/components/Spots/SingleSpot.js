import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as singleSpotActions from '../../store/singlespot';
// import * as reviewActions from '../../store/reviews'
import ReviewsForSpot from '../Reviews/ReviewsForSpot';
import AddReviewFormModal from '../Reviews/ReviewsByUser/ModifyingButtons/AddReviewModal';

import "./spots.css"

function SingleSpot({ sessionUser }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    let loadSpot = useSelector((state) => state?.singleSpot?.spot) || ''

    useEffect(() => {
        dispatch(singleSpotActions?.loadSpotById(id));
    }, [dispatch, id]);

    let imageArr = loadSpot?.Images;

    return (
        <div>
            <div>
                {`${loadSpot?.name}`}
                {`$${loadSpot?.price} night`}
            </div>
            <div>
                {loadSpot?.avgStarRating && <p><i className="fa-sharp fa-solid fa-star"></i>
                    {`${loadSpot?.avgStarRating}`}</p>}
                <p>
                    <i className="fa-sharp fa-solid fa-circle"></i>
                    {`${loadSpot?.numReviews} reviews`}</p>
                <p>{`${loadSpot?.city}, ${loadSpot?.state}, ${loadSpot?.country}`}</p>
            </div>
            {imageArr?.length ? <div>
                {imageArr?.map((imageDetails) => {
                    return (
                        <img
                            className='spot-image'
                            src={imageDetails?.url}
                            alt={imageDetails?.id}
                        />
                    )
                })}
            </div> : <div><i class="fa-solid fa-camera"></i></div>}
            <div>
                <p>{`Hosted by ${loadSpot?.Owner?.firstName} ${loadSpot?.Owner?.lastName}`}</p>
            </div>
            <div>
                <p>{`${loadSpot?.description}`}</p>
            </div>
            <div>
                <p>
                    Reviews
                    {sessionUser && <div> <AddReviewFormModal loadSpotId={id} /> </div>}
                </p>
                <div>
                    {loadSpot?.avgStarRating && <p><i className="fa-sharp fa-solid fa-star"></i>
                        {`${loadSpot?.avgStarRating}`}</p>}
                    <p>
                        <i className="fa-sharp fa-solid fa-circle"></i>
                        {`${loadSpot?.numReviews} reviews`}</p>
                </div>
                <ReviewsForSpot loadSpotId={id} />
            </div>
        </div >
    )

}

export default SingleSpot;