import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as singleSpotActions from '../../store/singlespot';
import ReviewsForSpot from '../Reviews/ReviewsForSpot';

import "./spots.css"

function SingleSpot() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(singleSpotActions?.loadSpotById(id));
    }, [dispatch, id]);

    let loadSpot = useSelector((state) => state?.singleSpot?.spot)

    // if (loadSpot) {
    // } else { return null }
    return (
        <div>
            <div>
                {`${loadSpot?.name}`}
            </div>
            <div>
                <p><i className="fa-sharp fa-solid fa-star"></i>
                    {`${loadSpot?.avgRating}`}</p>
                <p>
                    <i className="fa-sharp fa-solid fa-circle"></i>
                    {`${loadSpot?.numReviews} reviews`}</p>
                <p>{`${loadSpot?.city}, ${loadSpot?.state}, ${loadSpot?.country}`}</p>
            </div>
            <div>
                <img
                    className='spot-image'
                    src={loadSpot?.Images[0]?.url}
                    alt={loadSpot?.name}
                />
            </div>
            <div>
                <p>{`Hosted by ${loadSpot?.Owner?.firstName} ${loadSpot?.Owner?.lastName}`}</p>
            </div>
            <div>
                <p>{`${loadSpot?.description}`}</p>
            </div>
            <div>
                <p>
                    Reviews
                    {/* sessionUser && <div> <AddReviewFormModal> </div>*/}
                </p>
                <div>
                    <p><i className="fa-sharp fa-solid fa-star"></i>
                        {`${loadSpot?.avgRating}`}</p>
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