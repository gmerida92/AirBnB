import { csrfFetch } from "./csrf";

//Type String Literals
const LOAD_USER_REVIEWS = "/api/getReviewsOfCurrentUser";
const UPDATE_USER_REVIEW = "/api/updateReview"
const DELETE_USER_REVIEW = "/api/deleteReview"


//Redux action creators
const loadReviewsForAUser = (allReviewByUser) => {
    return {
        type: LOAD_USER_REVIEWS,
        payload: allReviewByUser
    }
};

const updateAReview = (reviewEdits) => {
    return {
        type: UPDATE_USER_REVIEW,
        payload: reviewEdits
    }
};

const deleteAReview = (reviewId) => {
    return {
        type: DELETE_USER_REVIEW,
        payload: reviewId
    }
};




//Thunk action creators
export const loadReviewsByUser = () => async (dispatch) => {
    const response = await csrfFetch(`/api/users/myaccount/reviews`);
    const reviews = await response.json();

    let userReviews = {};
    reviews.Reviews.forEach((review) => {
        userReviews[review.id] = review
    });

    dispatch(loadReviewsForAUser(userReviews));
    return response;
};


export const editReview = (reviewId, reviewEdits) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewEdits)
    });
    const data = await response.json();

    dispatch(updateAReview(data));
    return response;
};


export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    dispatch(deleteAReview(reviewId))
    return response;
};


const initialState = {
    userReview: null
};

const userReviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER_REVIEWS:
            newState = {
                ...state,
                userReview: action.payload
            };
            return newState;
        case UPDATE_USER_REVIEW:
            newState = {
                ...state,
                userReview: {
                    ...state.userReview,
                    [action.payload.id]: action.payload
                }
            };
            return newState;
        case DELETE_USER_REVIEW:
            newState = { 
                ...state,
                userReview: {
                    ...state.userReview
                } 
            };
            delete newState.userReview[action.payload];
            return newState;
        default:
            return state;
    }
};

export default userReviewReducer;