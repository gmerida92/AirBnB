import { csrfFetch } from "./csrf";

const initialState = {
    review: null
};

//Type String Literals
const LOAD_SPOT_REVIEWS = "/api/getReviewsById";

//Redux action creators
const loadReviewsForASpot = (allReviewBySpotId) => {
    return {
        type: LOAD_SPOT_REVIEWS,
        payload: allReviewBySpotId
    }
};



//Thunk action creators
export const loadReviewsBySpotId = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);
    const reviews = await response.json();

    let spotReviews = {};
    reviews.Reviews.forEach((review) => {
        spotReviews[review.id] = review
    });

    dispatch(loadReviewsForASpot(spotReviews));
    return response;
};



//Review Reducer
const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            newState = { ...state };
            newState.review = action.payload;
            return newState;
        default:
            return state;
    }
};

export default reviewReducer;

