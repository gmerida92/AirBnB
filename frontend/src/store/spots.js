import { csrfFetch } from "./csrf";

const initialState = {
    spot: null
}

const LOAD_SPOTS = "/api/getSpots";


// Redux action creators
const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        payload: spots
    }
}


// Thunk action creators
export const loadAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    const spots = await response.json();

    let allSpots = {};
    spots.Spots.forEach(spot => {
        allSpots[spot.id] = spot;
    });

    dispatch(loadSpots(allSpots));
    return response;
};


export const loadAllUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/users/myaccount/spots')
    const spots = await response.json();

    let userSpots = {};
    spots.Spots.forEach((spot) => {
        userSpots[spot.id] = spot
    }
    );

    dispatch(loadSpots(userSpots));
    return response;
}


//Redux reducer
const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state };
            newState.spot = action.payload;
            return newState;
        default:
            return state
    }
}

export default spotReducer;

