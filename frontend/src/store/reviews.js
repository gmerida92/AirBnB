import { csrfFetch } from "./csrf";


//Type String Literals
const LOAD_SPOT_REVIEWS = "/api/getReviewsBySpotId";
const CREATE_SPOT_REVIEW = "/api/createReview"


//Redux action creators
const loadReviewsForASpot = (allReviewBySpotId) => {
    return {
        type: LOAD_SPOT_REVIEWS,
        payload: allReviewBySpotId
    }
};

const createAReview = (newReview) => {
    return {
        type: CREATE_SPOT_REVIEW,
        payload: newReview
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


export const createReview = (spotId, review) => async (dispatch) => {
    // const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    //     method: "POST",
    //     header: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(review)
    // })
    // .then(() => {
    //     return csrfFetch(`/api/spots/${spotId}/reviews`)
    // })
    const addReview = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
    const newReview = await addReview.json();

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const reviews = await response.json();

    let spotReviews = {};
    reviews.Reviews.forEach((review) => {
        spotReviews[review.id] = review
    });

    console.log('NEWREVIEW:',newReview)
    console.log("SPOTREVIEWS:",spotReviews)

    dispatch(createAReview(spotReviews[newReview.id]));
    return response;
};


const initialState = {
    review: null
};

//Review Reducer
const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            newState = {
                ...state,
                review: action.payload
            }
            return newState;
        case CREATE_SPOT_REVIEW:
            newState = {
                ...state,
                // review: action.payload
                review: {
                    ...state.review,
                    [action.payload.id]: action.payload
                }
            }
            return newState;
        default:
            return state;
    }
};

export default reviewReducer;

