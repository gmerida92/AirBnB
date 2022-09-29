import React from "react";
import { NavLink } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import * as spotActions from '../../../store/spots'

function Listings() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions?.loadAllUserSpots());
    }, [dispatch]);

    let userSpots = useSelector((state) => state?.spots?.spot) || ''

    return (
        <div>
            {Object?.keys(userSpots)?.map((spotId) => {
                return (
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
                )
            })}
        </div>)
}

export default Listings