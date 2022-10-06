import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as singleSpotActions from '../../store/singlespot';
// import * as reviewActions from '../../store/reviews'
import ReviewsForSpot from '../Reviews/ReviewsForSpot';
import AddReviewFormModal from '../Reviews/ReviewsByUser/ModifyingButtons/AddReviewModal';

import "./SingleSpot.css"

function SingleSpot({ sessionUser }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    let loadSpot = useSelector((state) => state?.singleSpot?.spot) || ''

    useEffect(() => {
        dispatch(singleSpotActions?.loadSpotById(id));
    }, [dispatch, id]);

    let imageArr = loadSpot?.Images;

    return (
        <div className='single_listing_container'>

            <div className='single_listing_header_container'>
                <span id='single_listing_name'><h1>{`${loadSpot?.name}`}</h1></span>
                <span id='single_listing_price'><h3>{`$${loadSpot?.price} night`}</h3></span>
            </div>

            <div className='single_listing_subheader_container'>
                {loadSpot?.avgStarRating && <div><i className="fa-sharp fa-solid fa-star"></i>
                    <span>{`${loadSpot?.avgStarRating}`}</span></div>}

                <div>
                    <i className="fa-sharp fa-solid fa-circle"></i>
                    <span>{`${loadSpot?.numReviews} reviews`}</span>
                </div>

                <div><span>{`${loadSpot?.city}, ${loadSpot?.state}, ${loadSpot?.country}`}</span></div>
            </div>

            {imageArr?.length ?
                <div>
                    {imageArr?.map((imageDetails) => {
                        return (
                            <img
                                className='spot-image'
                                src={imageDetails?.url}
                                alt={imageDetails?.id}
                            />
                        )
                    })}
                </div> :
                <div>
                    <i class="fa-solid fa-camera"></i>
                </div>
            }

            <div>
                <h2>{`Hosted by ${loadSpot?.Owner?.firstName} ${loadSpot?.Owner?.lastName}`}</h2>
            </div>
            <div>
                <p>{`${loadSpot?.description}`}</p>
            </div>
            <div>
                <p>
                    <h2>Reviews</h2>
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