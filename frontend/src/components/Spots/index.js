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
        // dispatch(spotActions?.loadAllUserSpots());
    }, [dispatch]);

    let loadSpots = useSelector((state) => state?.spots?.spot) || ''

    // if (loadSpots) {
    // }
    return (
        <div className='spot-container'>
            {Object?.keys(loadSpots)?.map((spotId) => {
                return (
                    <NavLink key={spotId} to={`/api/spots/${loadSpots[spotId]?.id}`}>
                        <div>
                            <div>
                                <img
                                    className='spot-image'
                                    src={loadSpots[spotId]?.previewImage}
                                    alt={loadSpots[spotId]?.name}
                                />
                            </div>
                            <div>
                                <p>{`${loadSpots[spotId]?.city}, ${loadSpots[spotId]?.state}`}</p>
                                {loadSpots[spotId]?.avgRating &&
                                    <p>
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                        {`${loadSpots[spotId]?.avgRating}`}</p>}
                                {!loadSpots[spotId]?.avgRating &&
                                    <p>
                                        <i className="fa-sharp fa-solid fa-star"></i>
                                        New</p>}
                            </div>
                            <div>
                                {`$${loadSpots[spotId]?.price} night`}
                            </div>
                        </div>
                    </NavLink>
                )
            })}
        </div>
    )
};

export default Spots;