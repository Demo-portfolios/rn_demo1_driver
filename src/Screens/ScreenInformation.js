import React, {Component} from 'react';
import { Image, StyleSheet, Text, View,TouchableOpacity,TextInput,SafeAreaView,Linking} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import moment, { months } from 'moment'
import { STATUS_TEXT } from "../Modules/app/config";
import { calculateTotalDetail } from "../Utils/calculateTotalDetail";

export default class ScreenInformation extends Component{
  constructor(prop){
    super(prop)
        this.state={
            dataInput:false
        }
    }
    componentDidMount(){
        const { navigation } = this.props;
        var data = navigation.getParam('data', false);
        this.setState({
            dataInput:data,
        })
    }
    renderProductPrice(){
        const {dataInput} = this.state
        var results = 0
        if(dataInput && dataInput.productEN){
            results = '$'+dataInput.productEN
        }else{
            results = dataInput.productEN+'៛'
        }
        results = '$'+dataInput.productEN
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
        results = dataInput.driverFeeKH+'៛'
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
    render(){
        const {dataInput} = this.state
      return(
          <>
            <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1}}>
                <View style={ styles.container}>
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
                            <Text style={styles.item}>​​{dataInput && moment(dataInput.dateTime).format("DD-MMM-YYYY")}</Text>
                            <Text style={styles.item}>​​{dataInput && dataInput.productType}</Text>
                            <Text style={styles.item}>​​{dataInput && dataInput.storeName}</Text>
                            <Text style={styles.item}>​​{dataInput && dataInput.senderPhone}</Text>
                            <Text style={styles.item}>​​{dataInput && dataInput.receiverAddress}</Text>
                            <Text style={styles.item}>​​{dataInput && dataInput.receiverPhone}</Text>
                            <Text style={styles.item}>​​{dataInput && dataInput.driverName}</Text>
                            <Text style={styles.item}>​​{dataInput && dataInput.driverPhone}</Text>
                            <Text style={styles.item}>{this.renderProductPrice()}</Text>
                            <Text style={styles.item}>​​{this.renderDriverFee()}</Text>
                            <Text style={styles.item}>​​{dataInput && this.renderTotal()}</Text>
                            <Text style={[styles.item1, dataInput && {color:STATUS_TEXT[dataInput.status].color} ]}>​​{dataInput && STATUS_TEXT[dataInput.status].text}</Text>
                        </View>
                    </View>
                </View>
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
    body:{
        flex:0.8,
        flexDirection:'row',
        marginLeft:'8%',

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
    },
    text:{
        fontSize:25,
        textAlign:'center',
        fontFamily:'Siemreap'
    },
    icon:{
        position:'absolute',
        left:17,
    },
    item1:{
        color:'green',
        fontSize:12,
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
    button:{
        
        marginTop: 2,
        backgroundColor:'blue',
        height: 50,
        width:'50%',
        alignItems:'center',
        justifyContent:'center',
        // borderRadius:5,
      },
      button1:{  
        margin: 2,
        backgroundColor:'green',
        height: 50,
        width:'50%',
        alignItems:'center',
        justifyContent:'center',
        // borderRadius:5,
      },
      button2:{  
        margin: 2,
        backgroundColor:'orange',
        height: 50,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        // borderRadius:5,
      },
      color:{
        color:'white',
        fontSize:18,
        fontFamily:'Siemreap'
      },
    })
 