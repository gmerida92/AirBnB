import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as spotActions from '../../../../../store/spots'

function DeleteListing({ userSpotId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions?.loadAllUserSpots());
    }, [dispatch]);

    const deleteSpot = (e) => {
        dispatch(spotActions.deleteSpot(userSpotId));
    };

    return (
        <button onClick={deleteSpot}>Remove</button>
    )
}

export default DeleteListing;