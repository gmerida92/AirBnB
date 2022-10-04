import { csrfFetch } from "./csrf";


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


let initialState = {
    spot: null
};
//Redux reducer
const singleSpotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_A_SPOT:

        //  newState = {
        //         ...state,
        //         spot: {
        //             ...state.spot,
        //             Images: [
        //                 ...state.spot.Images,
        //                 action.payload.Images
        //             ],
        //             Owner: {
        //                 ...state.spot.Owner,
        //                 action.payload.Owner
        //             },
        //             action.payload
        //         }
        //     }

            //1 newState = {
            //     ...state,
            //     spot: {
            //         ...state.spot,
            //         Images: [
            //             ...state.spot.Images,
            //             action.payload.Images
            //         ],
            //         Owner: {
            //             ...state.spot.Owner,
            //             action.payload.Owner
            //         },
            //         action.payload
            //     }
            // }

            //2 newState = {
            //     ...state,
            //     action.payload
            // }

            // newState = {
            //     ...state,
            //     spot: {...action.payload}
            // }       

             newState = {
                ...state,
                spot: action.payload
            }          

            //4 newState = { ...state }
            // newState.spot = action.payload;
            return newState;
        default:
            return state
    }
}

export default singleSpotReducer;