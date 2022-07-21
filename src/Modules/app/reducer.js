import { success, error, abort } from "redux-saga-requests";

export const SET_APP_LOCALE = "SET_APP_LOCALE";
export const SET_NETWORK_STATUS = "SET_NETWORK_STATUS";
export const APP_INIT = "APP_INIT";
export const setLocale = (payload) => ({
    type: SET_APP_LOCALE,
    payload,
  });
  export const setNetworkStatus = payload => ({
    type: SET_NETWORK_STATUS,
    payload
  });
  export const startupWorker = () => ({
    type: APP_INIT,
  });
  const initialState = {
    locale:"en"
  };

  const reducer = (state = initialState, action) =>{
      switch (action.type){
        /**
         * DEFAULT CASE
         */
        default:
            return state;
      }
  }
  export default reducer;