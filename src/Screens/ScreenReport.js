import React,{Component} from 'react'
import {Text,StyleSheet,Image,View,TouchableOpacity, ScrollView,SafeAreaView} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import moment from 'moment'
import { Platform } from 'react-native';
export default class ResultPackage extends Component{
    constructor(prop){
    super(prop)
        this.state={
            dataReportDrive:[]
        }
    }
    componentDidMount(){
        const { navigation } = this.props;
        var data = navigation.getParam('data', false);
        console.log(data);
        this.props.reportDrive({
            date:moment(data.dateTime).format("YYYY-MM-DD"),
            sellerID:data.sellerID
        })
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        console.log('nextProps.user.dataReportDrive');
        const {user} = this.props
        if(nextProps.user.dataReportDriveError && nextProps.user.dataReportDriveError !== user.dataReportDriveError){
            alert('មានអ្វីមួយមិនត្រឹមត្រូវ!')
        }
        if(nextProps.user.dataReportDrive && nextProps.user.dataReportDrive !== user.dataReportDrive){
            if(nextProps.user.dataReportDrive.length > 0){
                this.setState({
                    dataReportDrive:nextProps.user.dataReportDrive
                })
            }
        }
    }
    renderInvoiceList(){
        const {dataReportDrive} = this.state
        var results = []
        var totalReturned = 0
        var totalProductPrice = 0
        var totalFee = 0
        for (let index = 0; index < dataReportDrive.length; index++) {
            const element = dataReportDrive[index];
            if(element.status == 3){
                totalReturned += element.productEN
            }else{
                totalProductPrice += element.productEN
            }
            totalFee += element.driverFeeKH
            var imageStatus = []
            if(element.status == 3){
                imageStatus.push(
                    <Image
                        style={styles.data}
                        source={require('../Assets/images/icon3.png')}
                    />
                )
            }else if(element.status == 4){
                imageStatus.push(
                    <Image
                        style={styles.data}
                        source={require('../Assets/images/delay.jpg')}
                    />
                )
            }else{
                imageStatus.push(
                    <Image
                        style={styles.data}
                        source={require('../Assets/images/Icon4.png')}
                    />
                )
            }

            results.push(
                <View style={styles.inner1} key={index}>
                    <View style={styles.image}>
                        <TouchableOpacity
                            onPress={() => NavigationService.navigate(NAV_TYPES.INFORMATION, {data:element})} 
                        >
                            {imageStatus}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.benner3}>
                        <TouchableOpacity
                            onPress={() => NavigationService.navigate(NAV_TYPES.INFORMATION, {data:element})} 
                        >
                            <Text style={styles.text1}>{element.sellerAdress} -​ {element.receiverAddress}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bennerPrice}>
                        <Text style={styles.textPrice}>{element.productEN}$</Text>
                    </View>  
                    <View style={styles.bennerPrice}>
                        <Text style={styles.textPrice}>{element.driverFeeKH}៛</Text>
                    </View>          
                </View>
            )
        }
        results.push(
            <View style={styles.inner1}>
                <View style={styles.image}>
                    
                </View>
                <View style={styles.bennerTotal}>
                    <Text style={styles.totalPrice}>បរាជ័យ</Text>
                    <Text style={styles.price} >{totalReturned}$</Text>
                </View>
                <View style={styles.bennerTotalPrice}>
                    <Text style={styles.totalPrice}>តម្លៃសរុប</Text>
                    <Text style={styles.price}>{totalProductPrice}$</Text>
                </View>  
                <View style={styles.bennerTotalPrice}>
                    <Text style={styles.totalPrice}>តម្លៃសេវា</Text>
                    <Text style={styles.price}>{totalFee}៛</Text>
                </View>           
            </View> 
        )
        console.log('results', results);
        return results
    }
    render(){
        const{dataReportDrive} = this.state
        return(
            <>
                <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1,backgroundColor:'white'}}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity 
                            style={styles.icon}
                                onPress={() => NavigationService.goBack()} >
                                <MaterialIcons name="keyboard-arrow-left" size={35} color="#970"> </MaterialIcons>                                                                  
                            </TouchableOpacity>
                            <Image
                                style={styles.Logo}
                                source={require('../Assets/images/logoMST.png')}
                            />
                        </View>
                        <View style={styles.inner}>
                            <View style={styles.benner}>
                                <Text style={styles.text}>សរុបចំនួន {dataReportDrive.length}​ កញ្ចប់</Text>
                                <Text style={styles.textSmall}> 
                                {dataReportDrive.length > 0 &&
                                    moment(dataReportDrive[0].dateTime).format('DD-MMMM-YYYY')
                                } </Text>  
                            </View>
                        </View>
                        {/* dollar report of package */}
                        <ScrollView style={styles.body}>
                            {this.renderInvoiceList()}
                        </ScrollView>               
                    </View>
                </SafeAreaView>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',

    },
    header:{
        flex:0.25,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginBottom:'2%',
        width:'100%',
    },
    Logo:{
        width:200,
        height:90,
    },
    icon:{
        position:'absolute',
        left:20,
    },
    inner:{
        flex: 0.23,
        justifyContent: 'center',
        alignItems:'center',
        width:'100%',
    },
    body:{
        flex:0.5,
        width:'100%',
    },
    benner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    banner:{
        flex:0.1,
        justifyContent: 'center',
        alignItems:'center',
    },
    textPrice:{
        fontSize: 12,
        color: 'red',
        fontFamily:'Siemreap'
    },
    inner1:{
        flex: 0.12,
        flexDirection: 'row',
        width:'100%',
        marginBottom:Platform.OS == 'ios' ? '2%':'0%',

    },
    bennerfirst: {
        flex: 0.2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    benner2: {
        flex: 0.38,
        borderColor: 'skyblue',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    benner2Price: {
        flex: 0.20,
        borderColor: 'skyblue',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    bennerTotal: {
        flex: 0.58,
        marginTop:'3%',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'white',

    },
    benner3: {
        flex: 0.55,
        borderColor: 'skyblue',
        borderBottomWidth: 1,
        alignItems:'center',
        justifyContent: 'center',
    },
    bennerPrice: {
        flex: 0.2,
        borderColor: 'skyblue',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        flex: 0.15,
        alignItems:'center',
    },
    bennerTotalPrice: {
        marginTop:'3%',
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text:{
        fontSize: 24,
        color: 'red',
        fontFamily:'Siemreap',

    },
    textSmall:{
        fontSize: 16,
        color: 'gray',
        textAlign:'center',
        fontFamily:'Siemreap',

    },
    text1:{
        fontSize: 13,
        color: 'black',
        fontFamily:'Siemreap'
    },
    totalPrice:{
        fontSize: 15,
        color: 'black',
        fontFamily:'Siemreap',
        marginTop:8,
    },
    price:{
        fontSize: 15,
        color: 'red',
        fontFamily:'Siemreap'
    },
    data: {
        backgroundColor:'white',
        // flex: 1,
        width: 38,
        height: 35,
    },
    data1: {
        // flex: 1,
        width: 38,
        height: 38,
    },
  });
  