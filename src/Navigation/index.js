import React from 'react'
import {View,Image,StyleSheet,Text,Platform,TouchableOpacity} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {NAV_TYPES} from './navTypes'
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import screenLogin from '../Containers/LoginContainer'
import screenHome from '../Containers/HomeContainer'
import LoadingContainer from '../Containers/LoadingContainer'
import PhoneCallContainer from '../Containers/PhoneCallContainer'
import AccountContainer from '../Containers/AccountContainer'
import DateContainer from '../Containers/DateContainer'
import ReportContainer from '../Containers/ReportContainer'
import BankContainer from '../Containers/BankContainer'
import QRcodeContainer from '../Containers/QRcodeContainer'
import Del_inputContainer from '../Containers/Del_inputContainer'
import Del_correctContainer from '../Containers/Del_correctContainer'
import Del_informationContainer from '../Containers/Del_informationContainer'
import InformationContainer from '../Containers/InformationContainer'
import OrderContainer from '../Containers/OrderContainer'
import QRpaymentContainer from '../Containers/QRpaymentContainer'
import MapContainer from '../Containers/MapContainer'
import ShopnameContainer from '../Containers/ShopnameContainer'
import TabledelayContainer from '../Containers/TabledelayContainer'
import DetialContainer from '../Containers/DetialContainer'
import ChangepasswordContainer from '../Containers/ChangepasswordContainer'
import CorrectContainer from '../Containers/CorrectContainer'
import StatusContainer from '../Containers/StatusContainer'
import DelayContainer from '../Containers/DelayContainer'
import PayContainer from '../Containers/PayContainer'
import DefeatContainer from '../Containers/DefeatContainer'
import PrivacyPolicyContainer from '../Containers/PrivacyPolicyContainer'
import WebReceiptContainer from '../Containers/WebReceiptContainer'

const IntroNavigator = createStackNavigator(
    {
        [NAV_TYPES.LOGIN]:{
            screen:screenLogin,
            navigationOptions:{
                headerShown:false
            },
        },
    },
    {
        initialRouteName:NAV_TYPES.LOGIN
    }
    )


const HomeNavigation = createStackNavigator(
    {
        [NAV_TYPES.MAIN_HOME]:{
            screen:screenHome,
            navigationOptions:{
                headerShown:false,
            }
        },
        [NAV_TYPES.DATE]:{
            screen:DateContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.REPORT]:{
            screen:ReportContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.BANK]:{
            screen:BankContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.QRCODE]:{
            screen:QRcodeContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.DEL_INPUT]:{
            screen:Del_inputContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.DEL_CORRECT]:{
            screen:Del_correctContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.DEL_INFORMATION]:{
            screen:Del_informationContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.INFORMATION]:{
            screen:InformationContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.ORDER]:{
            screen:OrderContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.QRPAYMENT]:{
            screen:QRpaymentContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.SHOP]:{
            screen:ShopnameContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.MAP]:{
            screen:MapContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.STATUS]:{
            screen:StatusContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.DELAY]:{
            screen:DelayContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.PAY]:{
            screen:PayContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.DEFEAT]:{
            screen:DefeatContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.TABLEDELAY]:{
            screen:TabledelayContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.DETIAL]:{
            screen:DetialContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.RECEIPT_WEBVIEW]:{
            screen:WebReceiptContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
    }
)

const PhoneCallNavigation = createStackNavigator(
    {
        [NAV_TYPES.PHONE_CALL]:{
            screen:PhoneCallContainer,
            navigationOptions:{
                headerShown:false
            }
        },
    }
)

const AccountNavigation = createStackNavigator(
    {
        [NAV_TYPES.ACCOUNT]:{
            screen:AccountContainer,
            navigationOptions:{
                headerShown:false
            }
        },

        [NAV_TYPES.CORRECT]:{
            screen:CorrectContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.CHANGE]:{
            screen:ChangepasswordContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
        [NAV_TYPES.PRIVAC_POLICY]:{
            screen:PrivacyPolicyContainer,
            navigationOptions:{
                headerShown:false,
                // tabBarVisible: false,
            }
        },
    }
)


// Tab Navigation
const TabNavigation = createBottomTabNavigator(
    {
        [NAV_TYPES.HOME]:{
            screen:HomeNavigation,
            navigationOptions:{
                tabBarLabel:({focused})=>(
                    <Image
                        style={{alignSelf:'center',width:40,height:35,}}
                        source={require('../Assets/images/home.png')}
                    />
                    // <Text style={{marginLeft:15}}><Icon name="home" size={38} color="#00316F"  /></Text>    
                ),
            }
        },
        //[NAV_TYPES.PHONE_CALL]:{
          //  screen:PhoneCallNavigation,
            //navigationOptions:{
              //  tabBarLabel:({focused})=>(
                //    <Image
                  //      style={{alignSelf:'center',width:40, height:35,}}
                    //    source={require('../Assets/images/phone.png')}
                    ///>
                    // <Text style={{marginLeft:50}}><Icon name="phone" size={38} color="#00316F"  /></Text>
                //),
            //}
        //},
        [NAV_TYPES.ACCOUNT]:{
            screen:AccountNavigation,
            navigationOptions:{
                tabBarLabel:({focused})=>(
                    <Image
                        style={{alignSelf:'center',width:47,height:35,}}
                        source={require('../Assets/images/account.png')}
                    />
                    // <Text style={{marginLeft:77}}><MaterialIcons name="account-circle" size={38} color="#00316F"  /></Text>
                ),
            }
        },
        
    },
    {
        tabBarOptions: {
          showIcon: true,
          showLabel:true,
        //   activeBackgroundColor:'#f5f5f5',
        
          labelStyle: {
            fontSize: 20,
          },
          //style:{ height:Platform.OS==='ios'?60:50,paddingBottom:Platform.OS==='ios' ? 0 :10},
          activeColor:'blue',
        activeTabStyle:{backgroundColor:'blue'},
        
        },
    }

)


const CoreNavigation = createStackNavigator(
    {
        [NAV_TYPES.MAIN]:{
            screen:TabNavigation,
            navigationOptions: {
                headerShown:false
              }
        },
    },
    {
        initialRouteName:NAV_TYPES.MAIN
    }
)
const MainNavigation = createStackNavigator(
    {
        [NAV_TYPES.INTRO]:{
            screen:IntroNavigator,
            navigationOptions:{
                headerShown:false
            }
        },
        [NAV_TYPES.CORE]:{
            screen:CoreNavigation,
            navigationOptions:{
                headerShown:false
            }
        },
        [NAV_TYPES.LOADING]:{
            screen:LoadingContainer,
            navigationOptions:{
                headerShown:false
            }
        }
    },
    {
        initialRouteName:NAV_TYPES.LOADING
    }
)

HomeNavigation.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === NAV_TYPES.MAP){
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible
  };
};

export default createAppContainer(MainNavigation)