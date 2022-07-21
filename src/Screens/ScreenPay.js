import React, {Component} from 'react';
import { Alert, Image, StyleSheet, Text, View,TouchableOpacity,TextInput,SafeAreaView,KeyboardAvoidingView,ScrollView, TouchableHighlight} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import moment from 'moment'
import { STATUS_TEXT } from "../Modules/app/config";

import { calculateTotalDetail } from "../Utils/calculateTotalDetail";


export default class Del_information extends Component{
  constructor(prop){
    super(prop)
    this.state={
        dataInput:false,
        currencyUsd:true,
    }
}
componentDidMount(){
    const { navigation } = this.props;
    var data = navigation.getParam('data', false);
    console.log('hi', data);
    this.setState({
        dataInput:{
            ...data,
            payMoney:''
        },
    })
}
UNSAFE_componentWillReceiveProps(nextProps){
    const {user} = this.props
        if(nextProps.user.confirmReceiveError && nextProps.user.confirmReceiveError !== user.confirmReceiveError){
        alert('មានអ្វីមួយមិនត្រឹមត្រូវ!')
        }
        console.log('nextProps.user.dataConfirmReceive', nextProps.user.dataConfirmReceive);
        if(nextProps.user.dataConfirmReceive && nextProps.user.dataConfirmReceive !== user.dataConfirmReceive){
        alert('បញ្ជាក់ដោយជោគជ័យ!')
        NavigationService.navigate(NAV_TYPES.QRCODE)
        }
    }
renderProductPrice(){
    const {dataInput} = this.state
    var results = 0
    if(dataInput && dataInput.totalGetEN){
        results = '$'+dataInput.totalGetEN
    }else{
        results = dataInput.totalGetKH+'៛'
    }
    return results
}
renderDriverFee(){
    const {dataInput} = this.state
    var results = 0
    if(dataInput && dataInput.driverFeeEN){
        results = '$'+dataInput.driverFeeEN
    }else{
        results = dataInput.driverFeeKH+'៛'
    }
    return results
}
renderTotal(){
    const {dataInput} = this.state
    const {user} = this.props
    var rate = false
    console.log('rate', rate,  this.props.user);
    if(user && user.dataSiteInformation && user.dataSiteInformation.length > 0){
        rate = user.dataSiteInformation[0].dollarRate
    }
    var results = calculateTotalDetail(dataInput.driverFeeKH, dataInput.productEN, rate)
    return results
}
handleConfirmReceive(){
    const {dataInput,currencyUsd} = this.state
    var results = 0
    var usd = 0
    var khr = 0
    if(currencyUsd === true){
        usd = dataInput.payMoney
    }else{
        khr = dataInput.payMoney
    }
    if(usd > 0 || khr > 0){
        this.handleCallConfirmReceive(dataInput, usd, khr)
    }else{
        Alert.alert(
            "បញ្ចាក់",
            "អ្នកមិនបានបញ្ចូល ទឹកប្រាក់ទទួលបានទេ, តើឥវ៉ាន់នេះគិតលុយរួចរាល់មែនទេ?",
            [
            {
                text:'បោះបង់',
                style:'cancel'
            },
            {
                text: "គិតលុយរួច",
                onPress: () => this.handleCallConfirmReceive(dataInput, usd, khr),
            },
            ],
            { cancelable: true }
        );
    }
    
}
handleCallConfirmReceive(dataInput, usd, khr){
    var data = {
        "id": dataInput.id,
        "moneyGotCustomerEN":usd,
        "moneyGotCustomerKH": khr,
        "sellerID":dataInput.sellerID
    }
    console.log('dataInput', dataInput);
    this.props.confirmReceive(data)
}
handleChangeInput(key, value){
    const {dataInput} = this.state
    var val = value
    val = val.replace(/[^0-9,.$]/g, '')
    this.setState({
        dataInput:{
            ...dataInput,
            [key]:val
        }
    })
}
    render(){
        const {dataInput, currencyUsd} = this.state
      return(
          <>
            <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1}}>
              <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.container}></KeyboardAvoidingView>
                <ScrollView style={styles.full}>
                        <View style={styles.title}>
                            <TouchableOpacity
                                style={styles.icon}
                                onPress={() => NavigationService.goBack()} 
                            >
                            <Text><MaterialIcons name="chevron-left" size={35} color="#970" /></Text>
                            </TouchableOpacity>
                            <Text style={styles.text}>ព័ត៍មានលម្អិតពីការដឹក</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.inner}>
                                <Text style={styles.item}>លេខកូដទំនិញ</Text>
                                <Text style={styles.item}>កាលបរិច្ឆេទ​​</Text>
                                <Text style={styles.item}>ប្រភេទទំនិញ</Text>
                                <Text style={styles.item}>ពីហាង</Text>
                                <Text style={styles.item}>លេខអ្នកផ្ញើ</Text>
                                <Text style={styles.item}>ទីតាំងទទួល</Text>
                                <Text style={styles.item}>លេខអ្នកទទួល</Text>
                                <Text style={styles.item}>អ្នកដឹកឈ្មោះ</Text>
                                <Text style={styles.item}>លេខអ្នកដឹក</Text>
                                <Text style={styles.item}>តម្លៃទំនិញ</Text>
                                <Text style={styles.item}>តម្លៃសេវា</Text>
                                <Text style={styles.item}>តម្លៃទសរុប</Text>
                                <Text style={styles.item}>ស្ថានភាព</Text>
                            </View>
                            <View style={styles.inner1}>
                                <Text style={styles.item}>៖</Text>
                                <Text style={styles.item}>៖</Text>
                                <Text style={styles.item}>៖</Text>
                                <Text style={styles.item}>៖</Text>
                                <Text style={styles.item}>៖</Text>
                                <Text style={styles.item}>៖</Text>
                                <Text style={styles.item}>៖</Text>
                                <Text style={styles.item}>៖</Text>
                                <Text style={styles.item}>៖</Text>
                                <Text style={styles.item}>៖</Text>
                                <Text style={styles.item}>៖</Text>
                                <Text style={styles.item}>៖</Text>
                                <Text style={styles.item}>៖</Text>
                            </View>
                            <View style={styles.inner2}>
                                <Text style={styles.item}>​​{dataInput && dataInput.id}</Text>
                                <Text style={styles.item}>{dataInput && moment(dataInput.dateTime).format('DD-MMMM-YYYY')}</Text>
                                <Text style={styles.item}>{dataInput && dataInput.productType}</Text>
                                <Text style={styles.item}>{dataInput && dataInput.storeName}</Text>
                                <Text style={styles.item}>{dataInput && dataInput.senderPhone}</Text>
                                <Text style={styles.item}>{dataInput && dataInput.location}</Text>
                                <Text style={styles.item}>{dataInput && dataInput.receiverPhone}</Text>
                                <Text style={styles.item}>{dataInput && dataInput.driverName}</Text>
                                <Text style={styles.item}>​​{dataInput && dataInput.driverPhone}</Text>
                                <Text style={styles.item}>{this.renderProductPrice()}</Text>
                                <Text style={styles.item}>{this.renderDriverFee()}</Text>
                                <Text style={styles.item}>{dataInput && this.renderTotal()}</Text>
                                <Text style={[styles.item1, dataInput && {color:STATUS_TEXT[dataInput.status].color} ]}>​​{dataInput && STATUS_TEXT[dataInput.status].text}</Text>
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <View style={styles.text1}>
                                < TouchableOpacity
                                    style={styles.button1}
                                >
                                    <Text style={styles.color}>បង់ប្រាក់</Text>
                                </TouchableOpacity>
                                <View style={styles.box}>
                                    <View style={styles.input}>
                                        <SafeAreaView>
                                            <TextInput
                                                value={dataInput.payMoney}
                                                onChangeText={(value) => this.handleChangeInput('payMoney', value)}
                                                placeholderTextColor="#00716F"
                                                fontSize={15}
                                                keyboardType='numeric'                      
                                            />
                                        </SafeAreaView>
                                    </View>
                                    < TouchableOpacity
                                            style={[styles.input2, currencyUsd && {backgroundColor:'green'}]}
                                            onPress={() => this.setState({currencyUsd:true})}
                                            backgroundColor='black'
                                    >
                                        <Text style={styles.text2}>USA</Text>
                                   </ TouchableOpacity>
                                    < TouchableOpacity
                                            style={[styles.input2, currencyUsd === false && {backgroundColor:'green'}]}
                                            onPress={() => this.setState({currencyUsd:false})}
                                    >
                                        <Text style={styles.text2}>RIEL</Text>
                                   </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.text1}>
                                < TouchableOpacity
                                    style={styles.button2}
                                    onPress={() => this.handleConfirmReceive()}
                                >
                                    <Text style={styles.color}>ដឹកជញ្ជូនជោគជ័យ</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </ScrollView>
            </SafeAreaView>
          </>
      )
    }
    }

    const styles = StyleSheet.create({
    full:{
      flex:1,
      marginLeft:"1%",
      marginRight:"1%",

    },
    body:{
        marginLeft:"4%",
        flex:0.6,
        flexDirection:'row',
        marginBottom:"3%",

    },
    input:{
        flex:0.5,
    },
    input1:{
        flexDirection:'row',
        flex:0.23,
        backgroundColor:'gray',
        alignItems:'center',
        justifyContent:'center',
        height:"90%",
    },
    input2:{
        flexDirection:'row',
        flex:0.23,
        backgroundColor:'gray',
        alignItems:'center',
        justifyContent:'center',
        height:"90%",
        marginLeft:2,
    },
    footer:{
        flex:0.2,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',

    },
    inner:{
        flex:0.4,
        marginTop:9,
        flexDirection:'column',
        // alignItems:'center',

    },
    box:{
        flexDirection:'row',
        height: 50,
        width:'70%',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2,
        borderColor:'#00716F',       
    },
    inner1:{
        marginTop:9,
        flex:0.1,
        flexDirection:'column',
        // alignItems:'center',

    },
    inner2:{
        marginTop:9,
        flex:0.5,
        flexDirection:'column',
        // alignItems:'center',

    },
    title:{
        alignItems:'center',
        justifyContent:"center",
        flexDirection:'row',
        flex:0.2,
        width:'100%',
        marginTop:'7%'
    },
    text:{
        fontSize:25,
        fontFamily:'Siemreap'
        // fontFamily:'KhmerOScontent'
    },
    text2:{
        fontSize:15,
        fontFamily:'Siemreap',
        color:'#00316F'
    },
    item1:{
        color:'green',
        fontSize:13,
        fontFamily:'Siemreap'
    },
    item:{
        color:'black',
        fontSize:12,
        fontFamily:'Siemreap'
    },
    text1:{
        // flex:0.8,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center'
    },
    // button:{
        
    //     marginTop: 2,
    //     backgroundColor:'blue',
    //     height: 50,
    //     width:'25%',
    //     alignItems:'center',
    //     justifyContent:'center',
    //     // borderRadius:5,
    //   },
      button1:{  
        margin: 2,
        backgroundColor:'green',
        height: 50,
        width:'25%',
        alignItems:'center',
        justifyContent:'center',
        // borderRadius:5,
      },
      button2:{  
        margin: 2,
        backgroundColor:'green',
        height: 50,
        width:'98%',
        alignItems:'center',
        justifyContent:'center',
        // borderRadius:5,
      },
      color:{
        color:'white',
        fontSize:18,
        fontFamily:'Siemreap'
      },
      icon:{
        position:'absolute',
        left:0,
        top:4,
      },
    })