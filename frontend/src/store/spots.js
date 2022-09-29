import { csrfFetch } from "./csrf";

const initialState = {
    spot: null
}

const LOAD_SPOTS = "/api/getSpots";
const LOAD_A_SPOT = "/api/getSpotById"

// Redux action creators
const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        payload: spots
    }
}

// const loadASpot = (spots) => {
//     return {
//         type: LOAD_A_SPOT,
//         payload: spots
//     }
// }


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

// export const loadSpotById = (id) => async (dispatch) => { 
//     const response = await csrfFetch(`/api/spots/${id}`);
//     const spot = await response.json()

//     dispatch(loadASpot(spot));
//     return response
// };

export const loadAllUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/users/spots')
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
        case LOAD_A_SPOT:
            newState = { ...state };
            newState.spot = action.payload;
            return newState;
        default:
            return state
    }
}

export default spotReducer;

