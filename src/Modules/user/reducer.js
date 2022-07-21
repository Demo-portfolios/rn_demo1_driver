import { success, error, abort } from "redux-saga-requests";

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const ENTER_DATA = 'ENTER_DATA';
export const SEARCH_PACKAGE = 'SEARCH_PACKAGE';
export const CONFIRM_RECEIVE = 'CONFIRM_RECEIVE';
export const CONFIRM_RETURN = 'CONFIRM_RETURN';
export const CONFIRM_DELAY = 'CONFIRM_DELAY';
export const LIST_REPORT = 'LIST_REPORT';
export const REPORT_DRIVE = 'REPORT_DRIVE';
export const ONLINE_PAYMENT = 'ONLINE_PAYMENT';
export const SEND_REQUIREBOOKING = 'SEND_REQUIREBOOKING';
export const REQUEST_BOOKINGDONE = 'REQUEST_BOOKINGDONE';
export const LIST_DELAY = 'LIST_DELAY';
export const VALIDATE_PASSWORD = 'VALIDATE_PASSWORD';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const SITE_INFORMATION = 'SITE_INFORMATION';
export const USERUPDAT_NOTIFICATION = 'USERUPDAT_NOTIFICATION';
export const GET_STORE = 'GET_STORE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';


export const userLogin = (payload) =>({
    type: USER_LOGIN,
    payload
});
export const userUpdateNotificationToken = (payload) =>({
    type: USERUPDAT_NOTIFICATION,
    payload
});

export const enterData = (payload) =>({
    type: ENTER_DATA,
    payload
});

export const confirmReceive = (payload) =>({
    type: CONFIRM_RECEIVE,
    payload
});

export const confirmReturn = (payload) =>({
    type: CONFIRM_RETURN,
    payload
});

export const confirmDelay = (payload) =>({
    type: CONFIRM_DELAY,
    payload
});

export const requestBookingDone = (payload) =>({
    type: REQUEST_BOOKINGDONE,
    payload
});

export const userLogout = () =>({
    type: USER_LOGOUT,
});

export const searchPackage = (payload) =>({
    type: SEARCH_PACKAGE,
    payload
});
export const siteInformation = () =>({
    type: SITE_INFORMATION,
});

export const listReport = (payload) =>({
    type: LIST_REPORT,
    payload
});

export const reportDrive = (payload) =>({
    type: REPORT_DRIVE,
    payload
});

export const onlinePayment = (payload) =>({
    type: ONLINE_PAYMENT,
    payload
});

export const sendRequireBooking = (payload) =>({
    type: SEND_REQUIREBOOKING,
    payload
});

export const listDelay = (payload) =>({
    type: LIST_DELAY,
    payload
});

export const validatePassword = (payload) =>({
    type: VALIDATE_PASSWORD,
    payload
});

export const changePassword = (payload) =>({
    type: CHANGE_PASSWORD,
    payload
});

export const getStore = () =>({
    type: GET_STORE,
});
export const updateProfile = (payload) =>({
    type: UPDATE_PROFILE,
    payload
});

const initialState = {
    pending: false,
    error: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
    //USER_LOGIN
    case USER_LOGIN:{
        return{...state,pending:true};
    }
    case success(USER_LOGIN):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(USER_LOGIN):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(USER_LOGIN):{
        return{...state,pending:false};
    }
    //USER_LOGOUT
    case USER_LOGOUT:{
        return{...state,pending:true};
    }
    case success(USER_LOGOUT):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(USER_LOGOUT):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(USER_LOGOUT):{
        return{...state,pending:false};
    }
    //SEARCH_PACKAGE
    case SEARCH_PACKAGE:{
        return{...state,pending:true};
    }
    case success(SEARCH_PACKAGE):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(SEARCH_PACKAGE):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    //USERUPDAT_NOTIFICATION
    case USERUPDAT_NOTIFICATION:{
        return{...state,pending:true};
    }
    case success(USERUPDAT_NOTIFICATION):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(USERUPDAT_NOTIFICATION):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    //SITE_INFORMATION
    case SITE_INFORMATION:{
        return{...state,pending:true};
    }
    case success(SITE_INFORMATION):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(SITE_INFORMATION):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(SITE_INFORMATION):{
        return{...state,pending:false};
    }
    //ENTER_DATA
    case ENTER_DATA:{
        return{...state,pending:true};
    }
    case success(ENTER_DATA):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(ENTER_DATA):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(ENTER_DATA):{
        return{...state,pending:false};
    }
    //CONFIRM_RECEIVE
    case CONFIRM_RECEIVE:{
        return{...state,pending:true, dataConfirmReceive:false};
    }
    case success(CONFIRM_RECEIVE):{
        console.log('action.payload', action.payload);
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(CONFIRM_RECEIVE):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(CONFIRM_RECEIVE):{
        return{...state,pending:false};
    }
    //CONFIRM_RETURN
    case CONFIRM_RETURN:{
        return{...state,pending:true,dataConfirmReturn:false};
    }
    case success(CONFIRM_RETURN):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(CONFIRM_RETURN):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(CONFIRM_RETURN):{
        return{...state,pending:false};
    }
    //CONFIRM_DELAY
    case CONFIRM_DELAY:{
        return{...state,pending:true, dataConfirmDelay:false};
    }
    case success(CONFIRM_DELAY):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(CONFIRM_DELAY):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    //REQUEST_BOOKINGDONE
    case REQUEST_BOOKINGDONE:{
        return{...state,pending:true, dataRequestBookingDone:false};
    }
    case success(REQUEST_BOOKINGDONE):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(REQUEST_BOOKINGDONE):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(REQUEST_BOOKINGDONE):{
        return{...state,pending:false};
    }
    //LIST_REPORT
    case LIST_REPORT:{
        return{...state,pending:true};
    }
    case success(LIST_REPORT):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(LIST_REPORT):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    //REPORT_DRIVE
    case REPORT_DRIVE:{
        return{...state,pending:true};
    }
    case success(REPORT_DRIVE):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(REPORT_DRIVE):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    //ONLINE_PAYMENT
    case ONLINE_PAYMENT:{
        return{...state,pending:true};
    }
    case success(ONLINE_PAYMENT):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(ONLINE_PAYMENT):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    //SEND_REQUIREBOOKING
    case SEND_REQUIREBOOKING:{
        return{...state,pending:true};
    }
    case success(SEND_REQUIREBOOKING):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(SEND_REQUIREBOOKING):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    //LIST_DELAY
   case LIST_DELAY:{
        return{...state,pending:true};
    }
    case success(LIST_DELAY):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(LIST_DELAY):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    //VALIDATE_PASSWORD
    case VALIDATE_PASSWORD:{
        return{...state,pending:true,dataValidatePassword:false, dataValidatePasswordError:false};
    }
    case success(VALIDATE_PASSWORD):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(VALIDATE_PASSWORD):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(VALIDATE_PASSWORD):{
        return{...state,pending:false};
    }
    //CHANGE_PASSWORD
    case CHANGE_PASSWORD:{
        return{...state,pending:true,dataChangePassword:false, dataChangePasswordError:false};
    }
    case success(CHANGE_PASSWORD):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(CHANGE_PASSWORD):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(CHANGE_PASSWORD):{
        return{...state,pending:false};
    } 
    //GET_STORE
    case GET_STORE:{
        return{...state,pending:true};
    }
    case success(GET_STORE):{
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(GET_STORE):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(GET_STORE):{
        return{...state,pending:false};
    } 
    //UPDATE_PROFILE
    case UPDATE_PROFILE:{
        return{...state,pending:true, dataUpdateProfile:false};
    }
    case success(UPDATE_PROFILE):{
        console.log('action.payload', action.payload);
        return{
            ...state,
            ...action.payload,
            pending:false};
    }
    case error(UPDATE_PROFILE):{
        return{...state,
            error:true,
            pending:false,
            ...action.payload
        };
    }
    case abort(UPDATE_PROFILE):{
        return{...state,pending:false};
    }             
/**
     * DEFAULT_CASE
     */
    default:
        return state;
    }
};
export default userReducer;