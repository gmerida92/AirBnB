import React from 'react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux'
import UserReviews from '../Reviews/ReviewsByUser';


function Profile({ sessionUser }) {
    return (
        <div>
            <div>
                <h2>{`Hi, I'm ${sessionUser?.firstName} ${sessionUser?.lastName.slice(0, 1)}.`}</h2>
                <h4>{`${sessionUser?.username}`}</h4>
                <h4>{`${sessionUser?.email}`}</h4>
            </div>
            <div>Review</div>
            <UserReviews />
        </div>
    )
};

export default Profile