import React, {Component} from 'react';
import { Image, StyleSheet, Text, View,TouchableOpacity,TextInput,SafeAreaView} from 'react-native';
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Platform } from 'react-native';

export default class Home extends Component{
  constructor(prop){
    super(prop)
    this.state={
        dataInput:{
            id: '9',
            date: '',
        }
    }
}
UNSAFE_componentWillReceiveProps(nextProps){
    const {user} = this.props
        if(nextProps.user.confirmDelayError && nextProps.user.confirmDelayError !== user.confirmDelayError){
        alert('សូមបញ្ជាក់ថ្ងៃត្រូវដឹកសារជាថ្មី!')
        }
        console.log('nextProps.user.dataConfirmDelay', nextProps.user.dataConfirmDelay);
        if(nextProps.user.dataConfirmDelay && nextProps.user.dataConfirmDelay !== user.dataConfirmDelay){
        alert('ពន្យាពេលជោគជ័យ!')
        NavigationService.navigate(NAV_TYPES.QRCODE)
        }
    }
componentDidMount(){
    const { navigation } = this.props;
    var data = navigation.getParam('data', false);
    console.log('hi', data);
    this.setState({
        dataInput:{
            ...data,
            date:'',
            year:'2021'

        },
    })
}
handleChangeInput(key, value){
    const {dataInput} = this.state
    var val = value
    if(key == ''){
        val = val.replace(/[^0-9]/g, '')
    }
    this.setState({
        dataInput:{
            ...dataInput,
            [key]:val
        }
    })
}
handleFormDelay(){
    const {dataInput} = this.state
    var data = {
        "id": dataInput.id,
        "date": dataInput.year + '-' + dataInput.month + '-' + dataInput.day,
        "sellerID":dataInput.sellerID
    }
    console.log('data', data);
    this.props.confirmDelay(data)
}
    render(){
        const {dataInput} = this.state
      return(
          <>
            <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1}}>
              <View style={ styles.container}>
                    <View style={styles.head}>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => NavigationService.goBack()} 
                        >
                        <Text><MaterialIcons name="chevron-left" size={35} color="#970" /></Text>
                        </TouchableOpacity>
                        <Image
                            style={styles.Logo}
                            source={require('../Assets/images/logoMST.png')}
                        />
                    </View>
                    <View style={styles.body}>
                        <View style={styles.text1}>
                            <View style={styles.title}>
                                <Text style={styles.text}>
                                    ឥវ៉ាន់ពន្យាពេលទទួល
                                </Text>
                            </View>
                            <View style={styles.input}>
                                <Text style={styles.text2}>ទទួលវិញថ្ងៃទី /</Text>
                                <SafeAreaView>
                                    <TextInput
                                        value={dataInput.day}
                                        onChangeText={(data) => this.handleChangeInput('day', data)}
                                        style={styles.input}
                                        placeholderTextColor="black"
                                        placeholder="........"
                                        keyboardType='numeric'    
                                        maxLength={2}
                                    />
                                </SafeAreaView>
                                <Text style={styles.text2}>​/</Text>
                                <SafeAreaView>
                                    <TextInput
                                        onChangeText={(data) => this.handleChangeInput('month', data)}
                                        value={dataInput.month}
                                        style={styles.input}
                                        placeholderTextColor="black"
                                        placeholder="........"
                                        keyboardType='numeric'
                                        maxLength={2}
                                        
                                    />
                                </SafeAreaView>
                                <Text style={styles.text2}>​/</Text>
                                <SafeAreaView>
                                    <TextInput
                                        onChangeText={(data) => this.handleChangeInput('year', data)}
                                        value={dataInput.year}
                                        style={styles.input}
                                        placeholderTextColor="black"
                                        placeholder="........"
                                        keyboardType='numeric'
                                        maxLength={4}
                                        
                                    />
                                </SafeAreaView>
                            </View>
                            <View style={styles.buttom}>
                                < TouchableOpacity
                                    style={styles.button3}
                                    onPress={() => this.handleFormDelay()}
                                >
                                    <Text style={styles.color}>
                                        ពន្យាពេលទទួល
                                    </Text>
                                </TouchableOpacity>
                            </View>
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
      alignItems:'center',
    //   padding:25,
    marginLeft:"1%",
    marginRight:"1%",
    },
    body:{
        flex:0.6,
        marginRight:'5%',
        marginLeft:'5%',
    },
    head:{
        flexDirection:'row',
        flex:0.25,
        alignItems:'center',
        justifyContent:'center',
        width:'98%'
    },
    Logo:{
        width: 200,
        height: 100,
        alignItems:'center',

    },
    icon:{
        position:'absolute',
        left:14,
        top:Platform.OS == 'ios' ? 70:55,
    },
    text:{
        fontSize:25,
        fontFamily:'Siemreap',
        color:'black',
        marginBottom:"20%"
    },
    text2:{
        fontSize:18,
        fontFamily:'Siemreap',
        color:'black'
    },
    text1:{
        flex:1,
        alignItems:'center',
        // justifyContent:'center',
        flexDirection:'column'
    },
    button3:{  
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'orange',
        height: 55,
        width:300,
        // borderRadius:5,
    },
    color:{
        fontFamily:'Siemreap',
        fontSize:18,
        color:'white'
    },
    input:{
        flexDirection:'row',
        alignItems:'center',
        fontSize:18,
    },
    input1:{
        height: 30,
        width:95,
        paddingHorizontal:30,
        fontSize:15,
        fontFamily:'Siemreap',
      },
    })
 