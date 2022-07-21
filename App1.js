import React,{Component} from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import{
  View,
} from 'react-native'
import { Provider } from 'react-redux';
import store from './src/Store'
import Navigation from './src/Navigation/index'
import NavigationService from './src/Service/navigationService'
export default class App extends Component{
  
  render(){
    return(
      <Provider store={store}>
        <View style={{flex:1}}>
          <Navigation
           ref={navigatorRef =>
            NavigationService.setTopLevelNavigator(navigatorRef)
          }
          />
        </View>
      </Provider>
    );
  }
}