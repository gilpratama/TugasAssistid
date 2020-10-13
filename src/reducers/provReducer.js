import { FETCH_PROVINSI } from "../actions/types";

const initialState = {
    allUsers: [],
    allProv: [],
    message: "Default",
    variant: "success"
};

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_PROVINSI:
            return {
                ...state,
                allProv: action.payload
            }    
        default:
            return state;
    }
}