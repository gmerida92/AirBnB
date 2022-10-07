import React from "react";
import { NavLink } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import * as spotActions from '../../../store/spots'
import EditListingFormModal from "./ModifyButtons/EditListingModal";
import DeleteListing from "./ModifyButtons/DeleteButton";
import './listings.css'

function Listings({ sessionUser }) {
    const dispatch = useDispatch();
    let userSpots = useSelector((state) => state?.spots?.spot) || ''

    useEffect(() => {
        dispatch(spotActions?.loadAllUserSpots());
    }, [dispatch, sessionUser]);

    if (!sessionUser) return <Redirect to="/" />

    return (
        <>
            <div className="user_listings_header">
                <h1>Your Listings</h1>
            </div>

            <div className="user_listings_container">
                {Object?.keys(userSpots)?.length === 0 && <div>No Listings At This Moment</div>}

                {Object?.keys(userSpots)?.map((spotId) => {
                    return (

                        <div className="single_listing_container">

                            <NavLink className="single_listing_link" key={spotId} to={`/api/spots/${userSpots[spotId]?.id}`}>

                                <div className="single_listing_image_container">
                                    <img
                                        className='single_listing_image'
                                        src={userSpots[spotId]?.previewImage}
                                        alt={userSpots[spotId]?.name}
                                    />
                                </div>

                                <div className="single_listing_detail_container">
                                    <span>{`${userSpots[spotId]?.city}, ${userSpots[spotId]?.state}`}</span>

                                    {userSpots[spotId]?.avgRating ?
                                        <span>
                                            <i className="fa-sharp fa-solid fa-star"></i>
                                            <span id="rating_default">{`${userSpots[spotId]?.avgRating}`}</span>
                                        </span> :
                                        <span>
                                            <i className="fa-sharp fa-solid fa-star"></i>
                                            <span id="rating_default">New</span>
                                        </span>}

                                </div>

                                <div className="single_listing_price_detail_container">
                                    {`${userSpots[spotId]?.price} night`}
                                </div>

                            </NavLink>

                            <div>
                                <EditListingFormModal key={userSpots[spotId]?.name} userSpotId={userSpots[spotId]?.id} />
                                <DeleteListing userSpotId={userSpots[spotId]?.id} />
                            </div>


                        </div>

                    )
                })}
            </div>
        </>
    )
}

export default Listings