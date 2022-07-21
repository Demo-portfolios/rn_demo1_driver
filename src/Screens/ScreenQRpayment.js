import React, {Component} from 'react';
import { Image, StyleSheet, Text, View,TouchableOpacity,TextInput,SafeAreaView, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import {PAYMENT_URL} from '../Modules/app/config'
import { Platform } from 'react-native';

export default class Del_information extends Component{
  constructor(prop){
    super(prop)
    this.state={
       dataInput:false,
       infomation: false
    }
}
componentDidMount(){
    const { navigation } = this.props;
    var data = navigation.getParam('data', false);
    console.log(data);
    this.setState({
        dataInput:data
    })
}

    render(){
        const {dataInput, infomation} = this.state
        return(
          <>
            <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1,backgroundColor:'white'}}>
                <ScrollView style={{backgroundColor:'#fff'}}>
                <View style={ styles.container}>
                        <View style={styles.head}>
                                <TouchableOpacity
                                    style={styles.back}
                                    onPress={() => NavigationService.goBack()} 
                                >
                                    <Text><MaterialIcons name="chevron-left" size={Platform.OS == 'ios' ? 35:30} color="#970" /></Text>
                                </TouchableOpacity>
                                <Text style={styles.title}>
                                    {dataInput && dataInput.name}
                                </Text>
                        </View>
                        <View style={styles.backg}>
                            <View style={styles.body}>
                                <Text style={styles.text1}>ROC MERCHANDISE</Text>
                                <Text style={styles.text2}>scan here to pay</Text>
                                {dataInput && 
                                    <Image
                                        style={styles.logo}
                                        source={{uri: PAYMENT_URL+dataInput.qrImage}}
                                    />
                                }
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this.setState({infomation: infomation ? false:true})} 
                                    >
                                        <Text><MaterialIcons name={infomation ? 'keyboard-arrow-up':'keyboard-arrow-down'} size={35} color="#970" /></Text>
                                    </TouchableOpacity>
                            </View>
                            {infomation &&
                                <>
                                    <View style={styles.datahide}>
                                        <View style={styles.item}>
                                            <Text style={styles.text3}>ឈ្មោះគណនី</Text>
                                            <Text style={styles.text4}>{dataInput && dataInput.accountName}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.text3}>លេខគណនី</Text>
                                            <Text style={styles.text4}>{dataInput && dataInput.accountNumber}</Text>
                                        </View>
                                    </View>
                                </>
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
            alignItems:'center',
            backgroundColor:'white',
        },
        head:{
            marginTop:40,
            marginLeft:"1%",
            marginRight:"1%",
            width:'100%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center'
        },
        back:{
            position:'absolute',
            left:40,
            bottom:10
        },
        body:{
            // marginTop:5,
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            marginBottom:"5%",
        },
        title:{
            fontFamily:'Siemreap',
            fontSize:25,
            // marginRight:70,
        },
        text1:{
            fontSize:15,
            fontFamily:'Siemreap'
        },
        text2:{
            fontFamily:'Siemreap',
            fontSize:12,
        },
        text3:{
            flex:0.4,
            fontSize:14,
            fontFamily:'Siemreap'
        },
        text4:{
            flex:0.6,
            fontFamily:'Siemreap',
            fontSize:14,
        },
        logo:{
            width:220,
            height:200,
        },
        logo1:{
            width:160,
            height:50,
        },
        datahide:{
            flexDirection:'column',
            alignItems:'center',
            // marginBottom:"5%",
        },
        item:{
            // alignItems:'center',
            flexDirection:'row',
            borderBottomWidth:1,
            borderColor:"#00676F",
            marginBottom:"5%",
            width:'90%',
        },
        backg:{
            // marginTop:15,
            // // backgroundColor:'gray',
            width:"90%",
            marginLeft:"1%",
            marginRight:"1%",
            // marginBottom:"5%",
            // height:430,
        },
    })
 