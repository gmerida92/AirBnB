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
        <div className='single_listing_page_container'>

            <div className='single_listing_header_container'>
                <span id='single_listing_name'><h1>{`${loadSpot?.name}`}</h1></span>
                <span id='single_listing_price'><h2>{`$${loadSpot?.price} night`}</h2></span>
            </div>

            <div className='single_listing_subheader_container'>
                {loadSpot?.avgStarRating && <div className='single_listing_rating_container'><i className="fa-sharp fa-solid fa-star"></i>
                    <span id='single_listing_rating'>{`${loadSpot?.avgStarRating}`}</span>
                    <span id='single_listing_circle'><i className="fa-sharp fa-solid fa-circle"></i></span>
                </div>}

                <div className='single_listing_rating_container'>
                    <span id='single_listing_count'>{`${loadSpot?.numReviews} reviews`}</span>
                </div>

                <div className='single_listing_location_container'><span>{`${loadSpot?.city}, ${loadSpot?.state}, ${loadSpot?.country}`}</span></div>
            </div>

            {imageArr?.length ?
                <div className='single_listing_image_container'>
                    {imageArr?.map((imageDetails) => {
                        return (
                            <img
                                className='listing_image'
                                src={imageDetails?.url}
                                alt={imageDetails?.id}
                            />
                        )
                    })}
                </div> :
                <div className='no_image_container'>
                    <span id='image_default'><i class="fa-solid fa-camera"></i></span>
                </div>
            }

            <div className='single_listing_host_container'>
                <span id='single_listing_host'><h2>{`Hosted by ${loadSpot?.Owner?.firstName} ${loadSpot?.Owner?.lastName}`}</h2></span>
            </div>

            <div>
                <p id='single_listing_description'>{`${loadSpot?.description}`}</p>
            </div>

            <div className='listing_users_reviews_container'>
                <div className='listing_users_reviews_header'>
                    <span><h2>Reviews</h2></span>
                    {sessionUser && <div id="add_review_button_container"> <AddReviewFormModal loadSpotId={id} /> </div>}
                </div>

                <div className='single_listing_subheader_container'>
                    {loadSpot?.avgStarRating && <div className='single_listing_rating_container'><i className="fa-sharp fa-solid fa-star"></i>
                        <span id='single_listing_rating'>{`${loadSpot?.avgStarRating}`}</span>
                        <span id='single_listing_circle'><i className="fa-sharp fa-solid fa-circle"></i></span>
                    </div>}

                    <div className='single_listing_rating_container'>
                        <span id='single_listing_count'>{`${loadSpot?.numReviews} reviews`}</span>
                    </div>
                </div>

                <ReviewsForSpot loadSpotId={id} />
            </div>

        </div >
    )

}

export default SingleSpot;