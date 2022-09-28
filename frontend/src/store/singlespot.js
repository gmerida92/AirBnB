import { csrfFetch } from "./csrf";

const initialState = {
    spot: null
}

const LOAD_A_SPOT = "/api/getSpotById"

// Redux action creators
const loadASpot = (spots) => {
    return {
        type: LOAD_A_SPOT,
        payload: spots
    }
}


// Thunk action creators
export const loadSpotById = (id) => async (dispatch) => { 
    const response = await csrfFetch(`/api/spots/${id}`);
    const spot = await response.json()

    dispatch(loadASpot(spot));
    return response
};


//Redux reducer
const singleSpotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_A_SPOT:
            newState = {...state};
            newState.spot = action.payload;
            return newState;
        default:
            return state
    }
}

export default singleSpotReducer;