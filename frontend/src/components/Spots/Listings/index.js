import React from "react";
import { NavLink } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import * as spotActions from '../../../store/spots'
import EditListingFormModal from "./ModifyButtons/EditListingModal";
import DeleteListing from "./ModifyButtons/DeleteButton";

function Listings({ sessionUser }) {
    const dispatch = useDispatch();
    let userSpots = useSelector((state) => state?.spots?.spot) || ''

    useEffect(() => {
        dispatch(spotActions?.loadAllUserSpots());
    }, [dispatch, sessionUser]);

    if (!sessionUser) return <Redirect to="/" />

    return (
        <div>
            <h1>Your Listings</h1>
            {Object?.keys(userSpots)?.length === 0 && <div>No Listings At This Moment</div>}
            {Object?.keys(userSpots)?.map((spotId) => {
                return (
                    <div>
                        <NavLink key={spotId} to={`/api/spots/${userSpots[spotId]?.id}`}>
                            <div>
                                <div>
                                    <img
                                        className='spot-image'
                                        src={userSpots[spotId]?.previewImage}
                                        alt={userSpots[spotId]?.name}
                                    />
                                </div>
                                <div>
                                    <p>{`${userSpots[spotId]?.city}, ${userSpots[spotId]?.state}`}</p>
                                    {userSpots[spotId]?.avgRating ? <p><i className="fa-sharp fa-solid fa-star"></i>{`${userSpots[spotId]?.avgRating}`}</p> : <p>
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                        New</p>}
                                </div>
                                <div>
                                    {`${userSpots[spotId]?.price} night`}
                                </div>
                            </div>
                        </NavLink>
                        <EditListingFormModal key={userSpots[spotId]?.name} userSpotId={userSpots[spotId]?.id} />
                        <DeleteListing userSpotId={userSpots[spotId]?.id} />
                    </div>
                )
            })}
        </div>)
}

export default Listings