import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as singleSpotActions from '../../store/singlespot';
import { useParams } from 'react-router-dom';

import "./spots.css"

function SingleSpot() {
    const dispatch = useDispatch();
    const { id } = useParams();

    console.log(id)

    useEffect(() => {
        dispatch(singleSpotActions?.loadSpotById(id));
    }, [dispatch, id]);

    let loadSpot = useSelector((state) => state?.singleSpot?.spot)
    console.log(loadSpot)

    // if (loadSpot) {
    // } else { return null }
        return (
            <div>
                <div>
                    {`${loadSpot?.name}`}
                </div>
                <div>
                    <p>{`${loadSpot?.avgRating}`}</p>
                    <p>{`${loadSpot?.numReviews} reviews`}</p>
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
                    <p>Reviews</p>
                </div>
            </div>
        )

}

export default SingleSpot;