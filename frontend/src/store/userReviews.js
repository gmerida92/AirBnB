import { csrfFetch } from "./csrf";

const initialState = {
    userReview: null
};

//Type String Literals
const LOAD_USER_REVIEWS = "/api/getReviewsOfCurrentUser";

//Redux action creators
const loadReviewsForAUser = (allReviewByUser) => {
    return {
        type: LOAD_USER_REVIEWS,
        payload: allReviewByUser
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

const userReviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_USER_REVIEWS:
            newState = { ...state };
            newState.userReview = action.payload;
            return newState;
        default:
            return state;
    }
};

export default userReviewReducer;