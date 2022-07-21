import { success, error, abort } from "redux-saga-requests";

export const GET_RATE = 'GET_RATE';

export const getRateWorker = () =>({
    type: GET_RATE,
    payload
});

const initialState = {
    pending: false,
    error: false,
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
    //GET_RATE
    case GET_RATE:{
        return{...state,pending:true};
        }
        case success(GET_RATE):{
            return{
                ...state,
                ...action.payload,
                pending:false};
        }
        case error(GET_RATE):{
            return{...state,
                error:true,
                pending:false,
                ...action.payload
            };
        }
        case abort(GET_RATE):{
            return{...state,pending:false};
        }

    /**
     * DEFAULT_CASE
     */
    default:
        return state;
    }
};
export default homeReducer;