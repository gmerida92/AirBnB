import React from "react";
import { NavLink } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import * as spotActions from '../../../store/spots'
import EditListingFormModal from "./ModifyButtons/EditListingModal";
import DeleteListing from "./ModifyButtons/DeleteButton";

function Listings() {
    const dispatch = useDispatch();
    let userSpots = useSelector((state) => state?.spots?.spot) || ''

    useEffect(() => {
        dispatch(spotActions?.loadAllUserSpots());
    }, [dispatch]);


    return (
        <div>
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
                                    <p>{`${userSpots[spotId]?.avgRating}`}</p>
                                </div>
                                <div>
                                    {`${userSpots[spotId]?.price} night`}
                                </div>
                            </div>
                        </NavLink>
                        <EditListingFormModal key={userSpots[spotId]?.name} userSpotId={userSpots[spotId]?.id}/>
                        <DeleteListing userSpotId={userSpots[spotId]?.id}/>
                    </div>
                )
            })}
        </div>)
}

export default Listings