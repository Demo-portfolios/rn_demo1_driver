import React,{Component} from 'react'
import{
  View,
  Platform,
  Linking,
  SafeAreaView
} from 'react-native'
import { Provider } from 'react-redux';
import store from './src/Store'
import Navigation from './src/Navigation/index'
import NavigationService from './src/Service/navigationService'
import firebase, { Notification, NotificationOpen } from 'react-native-firebase'
import AsyncStorage from "@react-native-community/async-storage";
import {userUpdateNotificationToken} from './src/Modules/user/reducer';
import {getVersion} from 'react-native-device-info'
import {IOS_APP_ID, ANDROID_PACKAGE_NAME} from './src/Modules/app/config'
import CustomModal from './src/Components/CustomModal/index'
import { axios } from './src/Modules/app'
import requestPermission from "./src/Utils/requestPermission";
import {PERMISSIONS} from 'react-native-permissions';

export default class App extends Component{
  constructor(prop){
    super(prop)
    this.state={
       updateApp:false
    }   
  }
  async componentDidMount() {
    const REQUESTED = Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    await requestPermission(REQUESTED, function (results) {
      console.log('requestPermission', results);
    })
    firebase.notifications().setBadge(0);
    this.getAppVersion()
    this.createNotificationListeners();
    this.checkPermission();
  }
  async checkPermission() {
    try{
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        this.getToken();
      } else {
        this.requestPermission();
      }
    }catch(e){

    }
   
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
    }
  }
  async getToken() {
    try {
      const enabled = await firebase.messaging().hasPermission();
      if (!enabled) {
        await firebase.messaging().requestPermission();
      }
      if (Platform.OS==='ios') {
        firebase.messaging().ios.registerForRemoteNotifications().then(() => {
          firebase.messaging().getToken().then(async token => {
          store.dispatch(userUpdateNotificationToken({token:token}))
            console.log('tokenIOS',token);
          }).catch(error => {
            alert('error ' + error);
          });
        }).catch(error => {
          alert('error register' + error);
        });
      } else {
        firebase.messaging().getToken().then(async token => {
          store.dispatch(userUpdateNotificationToken({token:token}))
          console.log('tokenANDROID',token);
        }).catch(error => {
          alert('error' + error);
        })
      }
    } catch (error) {
      console.warn('notification token error', error);
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      const { title, body } = notification;
      this.notificationHandle(notification)
    });
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.notificationHandle(notificationOpen.notification)

    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      const data = notificationOpen.notification._data
      if (data.type === 'order_history') {
        NavigationService.navigate(NAV_TYPES.ORDERED)
      }
      this.notificationHandle(notificationOpen.notification)
    }
    console.log('notification+++++++++++++++',notificationOpen);

  }
  notificationHandle = (notification) => {
    try {
      firebase.notifications().setBadge(0);
      var typeMessange = 'success'
      if(notification && notification.data && notification.data.typeMessange){
        typeMessange = notification.data.typeMessange
        body = notification.data.body
      } 
    } catch (error) {
      console.log('notificationHandle error', error);
    }
  }
  handleUpdateVersion(){
    if(Platform.OS === 'ios'){
        Linking.openURL("https://apps.apple.com/app/id"+IOS_APP_ID)
    }
    if(Platform.OS === 'android'){
      Linking.openURL("https://play.google.com/store/apps/details?id="+ANDROID_PACKAGE_NAME)
    }
  }
  render(){
    const {updateApp} = this.state
    return(
      <Provider store={store}>
        <View style={{flex:1}}>
            <Navigation
            ref={navigatorRef =>
              NavigationService.setTopLevelNavigator(navigatorRef)
            }
            />
            {/* <Testing/> */}
          <CustomModal 
              title={"We released new version, please update!"}
              oneButtonText={"OK"}
              oneButtonPress={() => this.handleUpdateVersion()}
              visible={updateApp}
          />
        </View>
      </Provider>
    );
  }
  async getAppVersion() {
    // fetch data from a url endpoint
    await axios
      .get("app/site-description")
      .then((result) => {
        var version = result.data.data[0]['appDriverVersion']
        console.log(parseFloat(version), parseFloat(getVersion()));
        if (parseFloat(version) > parseFloat(getVersion())) {
          this.setState({ updateApp: true })
        }

      })
      .catch((error) => {
        console.log("error", error);
      });
  }
}