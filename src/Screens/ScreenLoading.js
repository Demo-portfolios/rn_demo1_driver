import React,{Component} from 'react'
import {
    View, ActivityIndicator, StyleSheet
} from 'react-native'
import NavigationService from "../Service/navigationService";
import { NAV_TYPES } from "../Navigation/navTypes";
import AsyncStorage from "@react-native-community/async-storage"
export default class Home extends Component{
    constructor(prop){
        super(prop)
        this.state={
           
        }
        
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('@DataLogin');
            if (value !== null) {
                // We have data!!
                console.log(value);
                NavigationService.navigate(NAV_TYPES.CORE)
            }else{
                NavigationService.navigate(NAV_TYPES.INTRO)
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    componentDidMount(){
        //this._retrieveData()
        this.props.startupWorker()
        // AsyncStorage.removeItem('@DataLogin')
        // setTimeout(() => {
        // }, 2000);
    }
    render(){
        return(
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})