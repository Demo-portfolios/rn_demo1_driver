import React,{Component} from 'react'
import {Text,StyleSheet,Image,View,TouchableOpacity, ScrollView,SafeAreaView} from 'react-native'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {PAYMENT_URL} from '../Modules/app/config'
import { Platform } from 'react-native';
import { colors,images } from '../Assets';
export default class ResultPackage extends Component{
    constructor(prop){
        super(prop)
        this.state={
           dataIput:false,
           dataOnlinePayment:[]
        }
        
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        if(nextProps.user.dataOnlinePaymentError && nextProps.user.dataOnlinePaymentError !== user.dataOnlinePaymentError){
            alert('មានអ្វីមួយមិនត្រឹមត្រូវ!')
        }
        if(nextProps.user.dataOnlinePayment && nextProps.user.dataOnlinePayment !== user.dataOnlinePayment){
          if(nextProps.user.dataOnlinePayment.length > 0){
            this.setState({
                dataOnlinePayment:nextProps.user.dataOnlinePayment,
            })
          }
        }
      }
    componentDidMount(){
        this.props.onlinePayment()
    }
    renderPaymentImage(){
        const {dataOnlinePayment} = this.state
        var results = []
        var row = []
        var boxes = 0
        for (let index = 0; index < dataOnlinePayment.length; index++) {
            const element = dataOnlinePayment[index];
            row.push(
                <View style={styles.logo1} key={index}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => NavigationService.navigate(NAV_TYPES.QRPAYMENT, {data:element})} 
                    >
                        <Image
                            style={styles.tinyLogo}
                            source={{uri: PAYMENT_URL+element.imageLogo}}
                        />
                    </TouchableOpacity>
                </View>
            )
            boxes++
            if((boxes !== 0 && boxes % 2 == 0) || index == dataOnlinePayment.length - 1){
                results.push(
                    <View style={styles.logo}>
                        {row}
                    </View>
                )
                row = []
                boxes = 0
            }
        }
        return results
    }
    render(){
        const { dataInput} = this.state
        return(
            <>
                <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1}}>
                    <View style={styles.container}>
                        <View style={styles.head}>
                                <TouchableOpacity 
                                    style={styles.back}
                                    onPress={() => NavigationService.goBack()} >
                                            <MaterialIcons style={styles.icon} name="keyboard-arrow-left" size={35} color={colors.main_color}> </MaterialIcons>                                                                                                                                   
                                </TouchableOpacity>
                                <Image
                                    style={styles.Logo}
                                    source={images.logo}
                                />
                        </View>
                        <ScrollView style={styles.body}>
                            {this.renderPaymentImage()}
                        </ScrollView>
                        <View style={styles.line}></View>
                    </View>
                </SafeAreaView>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,

        justifyContent:'center',
        alignItems:'center',
    },
    head:{
        flex:0.25,
        width:'98%',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginBottom:'10%',
    },
    back:{
        position:'absolute',
        left:20
    },
    body:{
        flex:0.8,
        // alignItems:'center',
    },
    logo:{
        flexDirection:'row',
        alignItems:'center',
    },
    tinyLogo:{
        width:160,
        height:160,
        margin:3,
    },
    Logo:{
        width:60,
        height:60,
    },
    line:{
        // marginTop:200,
        borderWidth:2,
        width:'100%',
        borderColor:'#00316F',
    },
});
  