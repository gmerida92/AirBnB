import { csrfFetch } from "./csrf";

const initialState = {
    spot: null
}

const LOAD_SPOTS = "/api/getSpots";
const CREATE_SPOT = "/api/createSpot"
const UPDATE_SPOT = "/api/updateSpot"


// Redux action creators
const loadSpots = (allSpots) => {
    return {
        type: LOAD_SPOTS,
        payload: allSpots
    }
};

const createASpot = (newSpot) => {
    return {
        type: CREATE_SPOT,
        payload: newSpot
    }
};

const updateASpot = (editSpot) => {
    return {
        type: UPDATE_SPOT,
        payload: editSpot
    }
};



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
};



export const createSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(spot)
    })
    const data = await response.json();


    dispatch(createASpot(data));
    return response;
};



export const editASpot = (spot, id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: "PUT",
        header: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(spot)
    });
    const data = await response.json();

    dispatch(updateASpot(data));
    return response;
};

//Redux reducer
const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state };
            newState.spot = action.payload;
            return newState;
        case CREATE_SPOT:
            newState = { ...state };
            newState.spot[action.payload.id] = action.payload;
            return newState;
        case UPDATE_SPOT:
            newState = {...state};
            newState.spot[action.payload.id] = action.payload;
            return newState;
        default:
            return state
    }
}

export default spotReducer;

