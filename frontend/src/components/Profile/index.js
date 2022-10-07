import React from 'react';
import { Redirect } from 'react-router-dom';
import ReviewsByUser from '../Reviews/ReviewsByUser';
import './Profile.css'


function Profile({ sessionUser }) {
    if (!sessionUser) return <Redirect to="/" />

    return (
        <div className='profile_container'>

            <div className='user_info_container'>
                <div id='user_name_header'>{`Hi, I'm ${sessionUser?.firstName} ${sessionUser?.lastName?.slice(0, 1)}.`}</div>
                <div id='user_detail_header'>{`${sessionUser?.username}`}</div>
                <div id='user_detail_header'>{`${sessionUser?.email}`}</div>
            </div>

            <div className='all_user_reviews_container'>
                <div id='user_reviews_header'>Reviews</div>
                <ReviewsByUser />
            </div>



        </div>
    )
};

export default Profile;