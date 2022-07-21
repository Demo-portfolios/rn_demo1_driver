import React, {Component} from 'react';
import { Image, StyleSheet,TouchableOpacity, Text, View,} from 'react-native';
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import  iconAntDesign from 'react-native-vector-icons/FontAwesome';

export default class Del_correct extends Component{
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
              <Text style={styles.text}>លោកអ្នកបញ្ចូល</Text>
              <Text style={styles.text}>អីវ៉ាន់</Text>
              <Text style={styles.text}>បានជោគជ័យ</Text>
          </View>
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => NavigationService.goBack()} 
              >
                  <Text style={styles.text1}>បន្ថែម</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => NavigationService.navigate(NAV_TYPES.MAIN_HOME)} 
              >
                  <Text style={styles.text1}>រួចរាល់</Text>
              </TouchableOpacity>
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
      marginBottom:'2%',

    },
    image:{
      width:200,
      height:130,
      marginTop:10,
    },
    text:{
      fontSize:20,
      margin:5,
      fontFamily:'Siemreap',
    },
    text1:{
      fontSize:18,
      fontFamily:'Siemreap',
      color:'white',
    }
});
 