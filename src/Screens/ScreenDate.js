import React,{Component} from 'react'
import {Text,StyleSheet,Image,View,TouchableOpacity} from 'react-native'
import NavigationService from '../Service/navigationService'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NAV_TYPES } from '../Navigation/navTypes'
export default class ResultPackage extends Component{
    constructor(prop){
        super(prop)
        this.state={
           
        }
        
    }
    render(){
        return(
            <>
                <View style={styles.container}>
                        <View style={styles.header}>
                                <TouchableOpacity 
                                    onPress={() => NavigationService.goBack()} >
                                        <MaterialIcons style={styles.icon} name="keyboard-arrow-left" size={35} color="#970"> </MaterialIcons>                                                                  
                                </TouchableOpacity>
                                <Image
                                    style={styles.Logo}
                                    source={require('../Assets/images/logoMST.png')}
                                />
                        </View>
                    <View style={styles.body}>
                        <View style={styles.inner1}>
                            <View style={styles.bennerfirst}>
                                <TouchableOpacity
                                    onPress={() => NavigationService.navigate(NAV_TYPES.REPORT)} 
                                >
                                    <Image
                                        style={styles.data1}
                                        source={require('../Assets/images/icon2.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.benner2}>
                                <TouchableOpacity
                                    onPress={() => NavigationService.navigate(NAV_TYPES.REPORT)} 
                                >
                                    <Text style={styles.text1}>បញ្ជី នូវថ្ងៃ 03, មេសា, 2021</Text>
                                </TouchableOpacity>
                            </View>      
                        </View>
                        <View style={styles.inner1}>
                            <View style={styles.bennerfirst}>
                                <TouchableOpacity
                                    onPress={() => NavigationService.navigate(NAV_TYPES.REPORT)} 
                                >
                                    <Image
                                        style={styles.data1}
                                        source={require('../Assets/images/icon2.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.benner2}>
                                <TouchableOpacity
                                    onPress={() => NavigationService.navigate(NAV_TYPES.REPORT)} 
                                >
                                    <Text style={styles.text1}>បញ្ជី នូវថ្ងៃ 02, មេសា, 2021</Text>
                                </TouchableOpacity>
                            </View>        
                        </View>
                    </View>
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        // alignItems:'center',
    },
    body:{
        marginLeft:"1%",
        marginRight:"1%",
        flex:0.7,
    },
    inner1:{
        marginTop:20,
        flex: 0.15,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
    },
    bennerfirst: {
        flex: 0.24,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    benner2: {
        flex: 0.70,
        borderColor: 'skyblue',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text1:{
        fontSize:15,
        color: 'skyblue',
        fontFamily:'Siemreap'
    },
    data1: {
        flex: 1,
        width: 56,
        // height: 325,
    },
    header:{
        marginLeft:"1%",
        marginRight:"1%",
        flex:0.18,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    Logo:{
        marginRight:32,
        width:200,
        height:100,
    },
  });
  