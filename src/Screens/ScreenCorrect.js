import React, {Component} from 'react';
import { Image, StyleSheet,TouchableOpacity, Text, View,} from 'react-native';
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import  iconAntDesign from 'react-native-vector-icons/FontAwesome';

export default class Correct extends Component{
  constructor(prop){
    super(prop)
    this.state={
       
    }
    
}
  render(){
    return (
      <>
        <View style={styles.container}>
          <View style={styles.photos}>
              <Image
                  style={styles.image}
                  source={require('../Assets/images/correct.png')}
              />
          </View>
          <View style={styles.desc}>
              <Text style={styles.text}>ការហៅរបស់លោកអ្នកបានទទួល</Text>
              <Text style={styles.text}>បានជោគជ័យហើយ</Text>
              <Text style={styles.text}>សូមរង់ចាំការទំនាក់ទំនងពីយើងខ្ញុំបន្តិច</Text>
              <Text style={styles.text}>ទៀតនេះ​ សូមអរគុណ ...!</Text>
          </View>
          <View style={styles.button}>
              <TouchableOpacity
                  onPress={() => NavigationService.navigate(NAV_TYPES.MAP)}  
              >
                  <Text style={styles.text1}>រួចរាល់</Text>
              </TouchableOpacity>
          </View>
        </View>
      </>
    );     
  }
}
 const styles = StyleSheet.create({
    container:{
      flex:1,
      marginLeft:"1%",
      marginRight:"1%",
      alignItems:'center',
    },
    photos:{
      marginTop:25,
    },
    desc:{
      flexDirection:'column',
      alignItems:'center',
      margin:15,
    },
    button:{
      backgroundColor:'green',
      width:150,
      height:50,
      alignItems:'center',
      justifyContent:'center',
      margin:15,

    },
    image:{
      width:210,
      height:170,
    },
    text:{
      fontSize:17,
      margin:5,
      fontFamily:'Siemreap',
    },
    text1:{
      fontSize:15,
      borderRadius:5,
      fontFamily:'Siemreap',
      color:'white',
    }
});
 