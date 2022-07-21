import React, {Component} from 'react';
import { Image, StyleSheet, Text, View,TouchableOpacity,TextInput,SafeAreaView, ScrollView, Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import HTML from "react-native-render-html";

const { width, height } = Dimensions.get("window");
export default class ScreenPrivacyPolicy extends Component{
  constructor(prop){
    super(prop)
    this.state={
        privacy:false
    }
}
componentDidMount(){
}

    render(){
        const {user} = this.props
      return(
          <>
            <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:null}}>
                <ScrollView>
                    <View style={ styles.container}>
                        <View style={styles.head}>
                                <TouchableOpacity
                                    style={styles.back}
                                    onPress={() => NavigationService.goBack()} 
                                >
                                    <Text><MaterialIcons name="chevron-left" size={35} color="#970" /></Text>
                                </TouchableOpacity>
                                <Text style={styles.title}>
                                    គោលការណ៍ និង លក្ខខណ្ឌ
                                </Text>
                        </View>
                        <View style={styles.body}>
                            {user && user.dataSiteInformation && user.dataSiteInformation.length > 0 &&
                                <HTML source={{ html: user.dataSiteInformation[0].privacyPolicy }} contentWidth={width} />
                            }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
          </>
      )
    }
    }

    const styles = StyleSheet.create({
        container:{
            flex:1,
            marginLeft:"1%",
            marginRight:"1%",
        },
        head:{
            flex:0.2,
            flexDirection:'row',
            marginTop:'5%',
            alignItems:'center',
            justifyContent:'center',
            width:'100%',
        },
        title:{
            fontSize:25,
            fontFamily:'Siemreap'
        },
        back:{
            position:'absolute',
            left:0,
        },
        body:{
            marginTop:'3%',
            flex:0.8,
            width:'98%'
        },
        message:{
            // flexDirection:'row',
            borderWidth:3,
            borderColor:'#00516F',
            borderRadius:18,
            width:'97%',
            marginTop:10,
        },
        item:{
            marginLeft:'4%',
            alignItems:'center',
            flexDirection:'row',
            marginTop:5,
        },
        text:{
            fontSize:15,
            fontFamily:'Siemreap'
        },
        button:{
            alignItems:'center',
            justifyContent:'center',
            borderRadius:10,
            width:'30%',
            height:45,
            marginLeft:'40%',
            backgroundColor:'green',
        },
        color:{
            fontSize:15,
            color:'white',
            fontFamily:'Siemreap'            
        },
    })
 