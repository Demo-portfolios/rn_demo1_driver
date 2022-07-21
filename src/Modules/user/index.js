import { call, put, takeLatest } from "redux-saga/effects";
import { error, success } from "redux-saga-requests";
import {axios} from "../app/index";
import nomalize from "./../../Utils/normiliseServerResponce";
import NavigationService from '../../Service/navigationService'
import AsyncStorage from "@react-native-community/async-storage"
import {NAV_TYPES} from '../../Navigation/navTypes'
import {
    USER_LOGIN,
    USER_LOGOUT,
    ENTER_DATA,
    SEARCH_PACKAGE,
    CONFIRM_RECEIVE,
    CONFIRM_RETURN,
    CONFIRM_DELAY,
    LIST_REPORT,
    REPORT_DRIVE,
    ONLINE_PAYMENT,
    SEND_REQUIREBOOKING,
    REQUEST_BOOKINGDONE,
    LIST_DELAY,
    VALIDATE_PASSWORD,
    CHANGE_PASSWORD,
    SITE_INFORMATION,
    USERUPDAT_NOTIFICATION,  
    GET_STORE,
    UPDATE_PROFILE,
} from './reducer'

export function* userLogin({payload}){
    try {
        const userLogin = yield call(axios.post, "app/login/driver", payload);
        console.log(userLogin.data.token);
        yield (axios.defaults.headers.common = {
            Authorization: `Bearer ${userLogin.data.token}`
        });
        yield put({
            type: success(USER_LOGIN),
            payload:{
                userLogin:userLogin.data
            }
        });
        yield call(
            AsyncStorage.setItem,
            "@DataLogin",
            JSON.stringify(userLogin.data)
        );
        console.log('here');
        yield NavigationService.reset(NAV_TYPES.CORE);
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(USER_LOGIN),
            payload:{userLoginError:parseError}
        })
    }
}

export function* enterData({payload}){
    try {
        const dataEnterData = yield call(axios.post, "app/enter-data/input", payload);
        console.log('dataEnterData', dataEnterData);
        yield put({
            type: success(ENTER_DATA),
            payload:{
                dataEnterData:nomalize(dataEnterData)
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError, e);
        yield put({
            type:error(ENTER_DATA),
            payload:{enterDataError:parseError}
        })
    }
}

export function* confirmReceive({payload}){
    try {
        console.log('payload', payload);
        const dataConfirmReceive = yield call(axios.post, "app/enter-data/receive", payload);
        console.log('dataConfirmReceive', dataConfirmReceive);
        yield put({
            type: success(CONFIRM_RECEIVE),
            payload:{
                dataConfirmReceive:true
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(CONFIRM_RECEIVE),
            payload:{confirmReceiveError:parseError}
        })
    }
}

export function* confirmReturn({payload}){
    try {
        const dataConfirmReturn = yield call(axios.post, "app/enter-data/return", payload);
        console.log('dataConfirmReturn', dataConfirmReturn);
        yield put({
            type: success(CONFIRM_RETURN),
            payload:{
                dataConfirmReturn:true
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(CONFIRM_RETURN),
            payload:{confirmReturnError:parseError}
        })
    }
}

export function* confirmDelay({payload}){
    try {
        const dataConfirmDelay = yield call(axios.post, "app/enter-data/delay", payload);
        console.log('dataConfirmDelay', dataConfirmDelay);
        yield put({
            type: success(CONFIRM_DELAY),
            payload:{
                dataConfirmDelay:true
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(CONFIRM_DELAY),
            payload:{confirmDelayError:parseError}
        })
    }
}
export function* requestBookingDone({payload}){
    try {
        const dataRequestBookingDone = yield call(axios.post, "/app/send_requirebooking/driver/done", payload);
        console.log('dataRequestBookingDone', dataRequestBookingDone);
        yield put({
            type: success(REQUEST_BOOKINGDONE),
            payload:{
                dataRequestBookingDone:true
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(REQUEST_BOOKINGDONE),
            payload:{dataRequestBookingDoneError:parseError}
        })
    }
}
export function* listReport({payload}){
    try {
        const dataListReport = yield call(axios.get, "app/report-driver/list/"+payload);
        console.log('dataListReport', dataListReport);
        yield put({
            type: success(LIST_REPORT),
            payload:{
                dataListReport:nomalize(dataListReport)
            }
        })
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(LIST_REPORT),
            payload:{dataListReportError:parseError}
        })
    }
}
export function* reportDrive({payload}){
    try {
        const dataReportDrive = yield call(axios.get, "app/report-driver/invoice/"+payload.date+"/"+payload.sellerID);
        console.log('dataReportDrive', dataReportDrive);
        yield put({
            type: success(REPORT_DRIVE),
            payload:{
                dataReportDrive:nomalize(dataReportDrive)
            }
        })
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(REPORT_DRIVE),
            payload:{dataReportDriveError:parseError}
        })
    }
}
export function* userLogout(){
    try {
        const userLogout = yield call(axios.post, "app/user/logout");
        console.log('userLogout', nomalize(userLogout));
        yield put({
            type: success(USER_LOGOUT),
            payload:{
                userLogout:nomalize(userLogout)
            }
        })
        yield (axios.defaults.headers.common = {
            Authorization: ``
        });
        yield call(
            AsyncStorage.removeItem,
            "@DataLogin"
        );
        yield NavigationService.reset(NAV_TYPES.LOADING);
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError, e);
        yield put({
            type:error(USER_LOGOUT),
            payload:{userLogoutError:parseError}
        })
    }
}
export function* searchPackage({payload}){
    try {
        const searchPackageData = yield call(axios.get, "app/search/driver/"+payload);
        console.log('searchPackageData', nomalize(searchPackageData));
        yield put({
            type: success(SEARCH_PACKAGE),
            payload:{
                searchPackageData:nomalize(searchPackageData)
            }
        })
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(SEARCH_PACKAGE),
            payload:{searchPackageError:parseError}
        })
    }
}

export function* siteInformation(){
    try {
        const dataSiteInformation = yield call(axios.get, "app/site-description");
        console.log('dataSiteInformation', nomalize(dataSiteInformation));
        yield put({
            type: success(SITE_INFORMATION),
            payload:{
                dataSiteInformation:nomalize(dataSiteInformation)
            }
        })
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(SITE_INFORMATION),
            payload:{dataSiteInformationError:parseError}
        })
    }
}

export function* onlinePayment({payload}){
    try {
        const dataOnlinePayment = yield call(axios.get, "app/online-payment");
        console.log('dataOnlinePayment', nomalize(dataOnlinePayment));
        yield put({
            type: success(ONLINE_PAYMENT),
            payload:{
                dataOnlinePayment:nomalize(dataOnlinePayment)
            }
        })
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(ONLINE_PAYMENT),
            payload:{dataOnlinePaymentError:parseError}
        })
    }
}

export function* sendRequireBooking({payload}){
    try {
        const dataSendRequireBooking = yield call(axios.get, "app/send_requirebooking/driver/list");
        console.log('dataSendRequireBooking', nomalize(dataSendRequireBooking));
        yield put({
            type: success(SEND_REQUIREBOOKING),
            payload:{
                dataSendRequireBooking:nomalize(dataSendRequireBooking)
            }
        })
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(SEND_REQUIREBOOKING),
            payload:{dataSendRequireBookingError:parseError}
        })
    }
}

export function* listDelay({payload}){
    try {
        const dataListDelay = yield call(axios.get, "app/enter-data/delay/"+payload);
        console.log('dataListDelay', nomalize(dataListDelay));
        yield put({
            type: success(LIST_DELAY),
            payload:{
                dataListDelay:nomalize(dataListDelay)
            }
        })
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(LIST_DELAY),
            payload:{dataListDelayError:parseError}
        })
    }
}

export function* validatePassword({payload}){
    try {
        const dataValidatePassword= yield call(axios.post, "app/user/validate-password", payload);
        console.log('dataValidatePassword', dataValidatePassword);
        yield put({
            type: success(VALIDATE_PASSWORD),
            payload:{
                dataValidatePassword:true
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(VALIDATE_PASSWORD),
            payload:{dataValidatePasswordError:parseError}
        })
    }
}

export function* changePassword({payload}){
    try {
        const dataChangePassword= yield call(axios.post, "app/user/change-password", payload);
        console.log('dataChangePassword', dataChangePassword);
        yield put({
            type: success(CHANGE_PASSWORD),
            payload:{
                dataChangePassword:true
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(CHANGE_PASSWORD),
            payload:{dataChangePasswordError:parseError}
        })
    }
}
export function* userUpdateNotificationToken({payload}){
    try {
        const dataUserUpdateNotificationToken= yield call(axios.post, "app/update_notification_token", payload);
        console.log('dataUserUpdateNotificationToken', dataUserUpdateNotificationToken);
        yield put({
            type: success(USERUPDAT_NOTIFICATION),
            payload:{
                dataUserUpdateNotificationToken:true
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(USERUPDAT_NOTIFICATION),
            payload:{dataUserUpdateNotificationTokenError:parseError}
        })
    }
}

export function* getStore(){
    try {
        const dataGetStore= yield call(axios.get, "app/enter-data/store");
        console.log('dataGetStore', dataGetStore);
        yield put({
            type: success(GET_STORE),
            payload:{
                dataGetStore:nomalize(dataGetStore)
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(GET_STORE),
            payload:{dataGetStoreError:parseError}
        })
    }
}

export function* updateProfile({payload}){
    try {
        console.log('payload', payload);
        const dataUpdateProfile = yield call(axios.post, "app/user/profile", payload);
        console.log('dataUpdateProfile', dataUpdateProfile);
        yield put({
            type: success(UPDATE_PROFILE),
            payload:{
                dataUpdateProfile:nomalize(dataUpdateProfile)
            }
        });
    } catch (e) {
        const parseError = yield JSON.parse(JSON.stringify(e));
        console.log('message', parseError);
        yield put({
            type:error(UPDATE_PROFILE),
            payload:{dataUpdateProfileError:parseError}
        })
    }
}

export function* userSaga(){
    yield takeLatest(USER_LOGIN,userLogin);
    yield takeLatest(USER_LOGOUT,userLogout);
    yield takeLatest(ENTER_DATA,enterData);
    yield takeLatest(SEARCH_PACKAGE,searchPackage);
    yield takeLatest(CONFIRM_RECEIVE,confirmReceive);
    yield takeLatest(CONFIRM_RETURN,confirmReturn);
    yield takeLatest(CONFIRM_DELAY,confirmDelay);
    yield takeLatest(LIST_REPORT,listReport);
    yield takeLatest(REPORT_DRIVE,reportDrive);
    yield takeLatest(ONLINE_PAYMENT,onlinePayment);
    yield takeLatest(SEND_REQUIREBOOKING,sendRequireBooking);
    yield takeLatest(REQUEST_BOOKINGDONE,requestBookingDone);
    yield takeLatest(LIST_DELAY,listDelay);
    yield takeLatest(VALIDATE_PASSWORD,validatePassword);
    yield takeLatest(CHANGE_PASSWORD,changePassword);
    yield takeLatest(SITE_INFORMATION,siteInformation);
    yield takeLatest(USERUPDAT_NOTIFICATION,userUpdateNotificationToken);
    yield takeLatest(GET_STORE,getStore);
    yield takeLatest(UPDATE_PROFILE,updateProfile);
}