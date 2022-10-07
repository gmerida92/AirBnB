import React from 'react'
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spots';
import "./spots.css"

function Spots() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions?.loadAllSpots());
    }, [dispatch]);

    let loadSpots = useSelector((state) => state?.spots?.spot) || ''


    return (
        <div className='spot-container'>
            {Object?.keys(loadSpots)?.map((spotId) => {
                return (
                    <div className='single_listing_container'>
                        <NavLink className='single_listing_link' key={spotId} to={`/api/spots/${loadSpots[spotId]?.id}`}>

                            <div className='single_listing_image_container'>
                                <img
                                    className='single_listing_image'
                                    src={loadSpots[spotId]?.previewImage}
                                    alt={loadSpots[spotId]?.name}
                                />
                            </div>

                            <div className='single_listing_detail_container'>
                                <span id='single_listing_detail_location'>{`${loadSpots[spotId]?.city}, ${loadSpots[spotId]?.state}`}</span>

                                {loadSpots[spotId]?.avgRating &&
                                    <span>
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                        <span id='rating_default'>{`${loadSpots[spotId]?.avgRating}`}</span>
                                    </span>
                                }
                                {!loadSpots[spotId]?.avgRating &&
                                    <span>
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                        <span id='rating_default'>New</span>
                                    </span>
                                }

                            </div>

                            <div className='single_listing_price_detail_container'>
                                {`$${loadSpots[spotId]?.price} night`}
                            </div>

                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
};

export default Spots;