import React, {Component} from 'react';
import { Image, StyleSheet, Text, View,TouchableOpacity,TextInput,SafeAreaView, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
export default class Del_information extends Component{
  constructor(prop){
    super(prop)
    this.state={
        dataIput:false,
        dataSendRequireBooking:[],
        called: false
    }
}
UNSAFE_componentWillReceiveProps(nextProps){
    const {user} = this.props
    if(nextProps.user.dataSendRequireBookingError && nextProps.user.dataSendRequireBookingError !== user.dataSendRequireBookingError){
        alert('មានអ្វីមួយមិនត្រឹមត្រូវ!')
    }
    if(nextProps.user.dataSendRequireBooking && nextProps.user.dataSendRequireBooking !== user.dataSendRequireBooking){
        if(nextProps.user.dataSendRequireBooking.length > 0){
            this.setState({
                dataSendRequireBooking:nextProps.user.dataSendRequireBooking,
                //called: true,
                //dataSendRequireBooking:[]

            })
        }else{
            this.setState({
                called: true
            }) 
        }
    }
}
componentDidMount(){
    this.props.sendRequireBooking()
}
renderRequireBooking(){
    const {dataSendRequireBooking} = this.state
    var results = []
    for (let index = 0; index < dataSendRequireBooking.length; index++) {
        const element = dataSendRequireBooking[index];
        //console.log('element.selName', element.selName);
        results.push(
            <View style={styles.message} key={index}>
                <View style={styles.item}>
                        <Text style={styles.text}>ឈ្មោះហាង    ៖  {element.selName}</Text>
                </View>
                <View style={styles.item}>
                        <Text style={styles.text}>ចំនួន{element.amount} កញ្ចប់</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => NavigationService.navigate(NAV_TYPES.MAP, {data:element})}
                        >
                            <Text style={styles.color}>ទៅយក</Text>
                        </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <Text style={styles.text}>លេខហាង     ៖  {element.phone}</Text>
                </View>
            </View>
        )
    }
    console.log('results', results);
    return results
}
    render(){
    const {dataSendRequireBooking, called} = this.state

      return(
          <>
            <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1 , backgroundColor:'white'}}>
                <ScrollView style={ styles.container}>
                        <View style={styles.head}>
                                <TouchableOpacity
                                    style={styles.back}
                                    onPress={() => NavigationService.goBack()} 
                                >
                                    <Text><MaterialIcons name="chevron-left" size={35} color="#970" /></Text>
                                </TouchableOpacity>
                                <Text style={styles.title}>
                                    តារាងហៅការដឹក
                                </Text>
                        </View>
                        <View style={styles.body}>
                            {this.renderRequireBooking()}
                            {dataSendRequireBooking.length == 0 && called &&
                                <SafeAreaView style={styles.item}>
                                    <Image
                                        source={require('../Assets/images/emptyData.png')}
                                        style={styles.emptyDataImage}
                                    />
                                </SafeAreaView> 
                            }            
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
            backgroundColor:'white'
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
            flex:0.8,
            alignItems:'center',
            width:'100%'
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
        emptyDataImage:{
            height:350,
            resizeMode:'contain',
        }
    })
 