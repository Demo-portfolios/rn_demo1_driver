import React,{Component} from 'react'
import {View,StyleSheet,ActivityIndicator} from 'react-native'

export default class Loading extends Component{
    render(){
        return(
            <View style = {styles.loading}>
                <ActivityIndicator size = 'small' color={'black'} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loading:{
        height:'100%',
        width:'100%',
        position:'absolute',
        backgroundColor:'rgba(52,52,52,0.8)',
        zIndex:999999999999,
        alignItems:'center',
        justifyContent:'center'
    }
})