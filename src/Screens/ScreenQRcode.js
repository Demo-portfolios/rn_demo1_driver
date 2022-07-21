import React, {Component} from 'react';
import { Image, StyleSheet,TouchableOpacity, Text, View,SafeAreaView,
  TextInput,KeyboardAvoidingView,Dimensions, ScrollView,
} from 'react-native';
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import  iconAntDesign from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import  Loading  from "../Components/Loading/";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Platform } from 'react-native';
import { colors,images } from '../Assets';
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const rectDimensions = SCREEN_WIDTH * 0.8;

export default class QRcode extends Component{
  constructor(prop){
    super(prop)
    this.state={
      dataInput:{
        id: "",
      },
      scanning:false, //setState scanning = false
    }
    
}
UNSAFE_componentWillReceiveProps(nextProps){
  const {user} = this.props
  if(nextProps.user.searchPackageError && nextProps.user.searchPackageError !== user.searchPackageError){
    alert('មានអ្វីមួយមិនត្រឹមត្រូវ!')
  }
  if(nextProps.user.searchPackageData && nextProps.user.searchPackageData !== user.searchPackageData){
    if(nextProps.user.searchPackageData.length > 0){
      NavigationService.navigate(NAV_TYPES.DEL_INFORMATION,{data:nextProps.user.searchPackageData})
    }else{
      alert('លេខកញ្ចប់មិនត្រឹមត្រូវ!')
    }
  }
}
handleChangeInput(key, value){
  const {dataInput} = this.state
  var val = value
  if(key == 'id'){
      val = val.replace(/[^0-9]/g, '')
  }
  this.setState({
      dataInput:{
          ...dataInput,
          [key]:val
      }
  })
}
handleFormSearch(){
  const {dataInput} = this.state
  console.log('dataInput', dataInput);
  this.props.searchPackage(dataInput.id)
}

handleScanBarcode(e){
  if (e && e.data) {
    var data = JSON.parse(e.data)
    // this.handleChangeInput('id', data.id)
    this.props.searchPackage(data.id)
    this.setState({scanning:false})
  }
}
  render(){
    const {dataInput,scanning} = this.state
    const {user} = this.props
    return (
      <>
        <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:null}}>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.title}>
                  <TouchableOpacity
                      style={styles.icon}
                      onPress={() => NavigationService.goBack()} 
                  >
                      <Text><MaterialIcons name="chevron-left" size={35} color={colors.main_color} /></Text>
                  </TouchableOpacity>
                  <Text style={styles.text}>តាមដានការដឹក</Text>
              </View>
              <View style={styles.box}>
                  <SafeAreaView>
                      <TextInput
                          value={dataInput.id}
                          onChangeText={(data) => this.handleChangeInput('id', data)} 
                          keyboardType='numeric'
                          style={styles.input}
                          placeholder="សូមវាយបញ្ជូលលេខកូដអីវ៉ាន់"
                      />
                  </SafeAreaView>
                  <TouchableOpacity 
                      style={styles.icon1}
                      onPress={() => this.handleFormSearch()}  
                  >
                      <MaterialIcons name="chevron-right" size={35} color={colors.main_color} />
                  </TouchableOpacity>
              </View>
              <View style={styles.photos}>
                {scanning ?
                  <QRCodeScanner
                      showMarker
                      ref={node => {
                      this.scanner = node;
                      }}
                      fadeIn={false}
                      onRead={(e) => this.handleScanBarcode(e)}
                      containerStyle={styles.zeroContainer}
                      cameraStyle={styles.zeroContainer}
                      customMarker={
                      <>
                          <TouchableOpacity style={styles.closeScan} onPress={() => this.setState({scanning:false})}>
                          <MaterialCommunityIcons name="close" color={'#fff'} size={30}/>
                          </TouchableOpacity>
                          <View style={styles.rectangleContainer}>
                          <Text style={{color:'white'}}>{`កំពុងចាប់យករូបភាព`}</Text>
                          <View style={styles.rectangle}>
                          </View>
                          </View>
                      </>
                      }
                  />
                  :
                      <>
                        <TouchableOpacity
                            style={styles.back}
                            onPress={()=>this.setState({scanning:true})}
                        >
                          <Image
                            style={styles.image}
                            source={require('../Assets/images/hand-phone.png')}
                        />
                        </TouchableOpacity>
                        <View style={styles.title1}>
                          <Text style={styles.text1}>សូមចុចលើរូបភាពខាងលើដើម្បីស្កេន QR Code</Text>
                      </View>
                      </>
              }    
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );     
  }
}
 const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      margin:20,
      marginLeft:"1%",
      marginRight:"1%",
    },
    input:{
      margin: 20,
      height: 50,
      width:280,
      borderRadius:7,
      borderWidth: 2,
      borderColor:colors.main_color,
      paddingHorizontal:30,
      fontSize:15,
      fontFamily:'Siemreap'
  },
  image:{
    marginRight:'10%',
    width:160,
    height:200,
  },
  photos:{
    width:'83%',
    alignItems:'center',
    alignSelf:'center',
    overflow:'hidden',
    height:400,
  },
  title:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    marginTop:'3%',
    width:'98%',
  },
  title1:{
    alignItems:'center',
    // flexDirection:'column',
  },
  text:{
    color:'black',
    fontSize:25,
    fontFamily:'Siemreap'
  },
  text1:{
    marginTop:10,
    fontSize:15,
        color:'black',
    fontFamily:'Siemreap'
  },
  icon:{
    position:'absolute',
    left:Platform.OS == 'ios' ? 10:20,
  },
  icon1:{
    position:'absolute',
    right:25,
    top:27,
  },
  zeroContainer: {
    width:"100%",
    height:560,
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  rectangle: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: '#fff',
    borderRadius:10,
    //borderWidth: 1,
    //borderStyle: "dashed",
    backgroundColor: "transparent",
    //marginTop:10,
  },
  closeScan:{
    position:'absolute',
    top:10,
    left:10,
    padding:20,
    zIndex:999999999,
  },
  box:{
  },
});

 