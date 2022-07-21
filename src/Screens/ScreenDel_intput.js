import React, {Component} from 'react';
import { Image, StyleSheet, Text, View,TouchableOpacity,TextInput,SafeAreaView,ScrollView,KeyboardAvoidingView} from 'react-native';
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
import SelectBox from "../Components/SelectBox";
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Del_input extends Component{
  constructor(prop){
    super(prop)
        this.state={
            dataInput:{
                storeName: "",
                senderPhone: "",
                receiverAddress: "",
                zone: "",
                receiverPhone: "",
            
                note: "",
                productType: "",
                productPriceKH: "",
                productPriceEN: "",
            
                productPriceStatus: false,
                driverFeeKH: "",
                driverFeeEN: "",
                driverFeeStatus: false,
                driverStatus: "",
            
                type: "",
                seller_id: false
            },
            dataGetStore:[]
        }
        this.handleChangeInput = this.handleChangeInput.bind(this)
    }
    async componentDidMount(){
        const { navigation } = this.props;
        await this.props.getStore()
        this.focusListener = navigation.addListener('didFocus', () => {
            var data = navigation.getParam('data', false);
            if(data){
                console.log('navigation', data);
                this.handleChangeInput('seller_id', data)
            }
        });
        
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        if(nextProps.user.dataEnterData && nextProps.user.dataEnterData !== user.dataEnterData){
            this.clearInput()
            NavigationService.navigate(NAV_TYPES.RECEIPT_WEBVIEW, {id: nextProps.user.dataEnterData}) 
        }
        if(nextProps.user.dataGetStore && nextProps.user.dataGetStore !== user.dataGetStore){
            console.log('nextProps.user.dataGetStore', nextProps.user.dataGetStore);
            var data = []
            for (let index = 0; index < nextProps.user.dataGetStore.length; index++) {
                const element = nextProps.user.dataGetStore[index];
                data.push(
                    { 
                        ...element,
                        label: element.name, value: element.id 
                    }
                )
            }
            this.setState({
                dataGetStore:data
            })
        }
    }
    handleChangeInput(key, value){
        const {dataInput, dataGetStore} = this.state
        console.log(key, value);
        var val = value
        if(key == 'driverFeeKH' || key == 'driverFeeEN'){
            val = val.replace(/[^0-9]/g, '')
        }
        if(key == 'seller_id'){
            if(value || value == 0){
                var index = dataGetStore.findIndex(elem => elem['id'] == value)
                if(index > -1){
                    this.setState({
                        dataInput:{
                            ...dataInput,
                            senderPhone:dataGetStore[index].phone,
                            storeName:dataGetStore[index].name,
                            [key]:val
                        }
                    })
                    console.log('done', dataGetStore[index].phone);
                }
            }else{
                this.setState({
                    dataInput:{
                        ...dataInput,
                        senderPhone:'',
                        storeName:'',
                        [key]:false
                    }
                })
            }
        }else{
            this.setState({
                dataInput:{
                    ...dataInput,
                    [key]:val
                }
            })
        }
    }
    handleFormAdd(){
        const {dataInput} = this.state
        console.log('dataInput', dataInput);
        this.props.enterData(dataInput)
    }
    clearInput(){
        const {dataInput} = this.state
        this.setState({
            dataInput:{
                ...dataInput,
                receiverAddress: "",
                zone: "",
                receiverPhone: "",
            
                note: "",
                productType: "",
                productPriceKH: "",
                productPriceEN: "",
            
                productPriceStatus: false,
                driverFeeKH: "",
                driverFeeEN: "",
                driverFeeStatus: false,
                driverStatus: "",
            
                type: "",
            },
        })
    }
    render(){
        const {dataInput, dataGetStore} = this.state
        console.log('dataInput', dataInput);
      return(
          <>
            <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1}}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.container}></KeyboardAvoidingView>
                    <ScrollView style={{flex:1}}>
                        <View style={ styles.container}>
                            <View style={styles.head}>
                                <TouchableOpacity
                                    style={styles.icon}
                                    onPress={() => NavigationService.navigate(NAV_TYPES.MAIN_HOME)} 
                                >
                                    <Text><MaterialIcons name="chevron-left" size={35} color="black" /></Text>
                                </TouchableOpacity>
                                <Text style={styles.title}>ទទួលអីវ៉ាន់</Text>
                            </View>
                            <View style={styles.body}>
                                <View style={styles.box}>
                                    <SafeAreaView>
                                        <SelectBox 
                                            placeholder={ { label: 'ឈ្មោះហាង', value: '' }}
                                            placeholderTextColor="black"
                                            onValueChange={(data) => this.handleChangeInput('seller_id', data)}
                                            value={dataInput.seller_id}
                                            items={dataGetStore}
                                            style={Platform.OS === "ios" ?{height:40}:null}
                                        />
                                    </SafeAreaView>
                                </View>
                                <View style={styles.box}>
                                    <SafeAreaView>
                                        <TextInput
                                            value={dataInput.senderPhone}
                                            onChangeText={(data) => this.handleChangeInput('senderPhone', data)}
                                            style={styles.input}
                                            placeholderTextColor="black"
                                            placeholder="លេខអ្នកផ្ញើ"
                                            
                                        />
                                    </SafeAreaView>
                                </View>
                                <View style={styles.box}>
                                    <SafeAreaView>
                                        <TextInput
                                            value={dataInput.receiverAddress}
                                            onChangeText={(data) => this.handleChangeInput('receiverAddress', data)}
                                            style={styles.input}
                                            placeholderTextColor="black"

                                            placeholder="ទីតាំងអ្នកទទួល"
                                            
                                        />
                                    </SafeAreaView>
                                </View>
                                <View style={styles.box}>
                                    <SafeAreaView>
                                        <TextInput
                                            value={dataInput.receiverPhone}
                                            onChangeText={(data) => this.handleChangeInput('receiverPhone', data)}
                                            style={styles.input}
                                            placeholderTextColor="black"
                                            placeholder="លេខអ្នកទទួល"
                                            
                                        />
                                    </SafeAreaView>
                                </View>
                                <View style={styles.box}>
                                    <SafeAreaView>
                                        <TextInput
                                            value={dataInput.productType}
                                            onChangeText={(data) => this.handleChangeInput('productType', data)}
                                            style={styles.input}
                                            placeholderTextColor="black"
                                            placeholder="ប្រភេទអីវ៉ាន់"
                                            
                                        />
                                    </SafeAreaView>
                                </View>
                                <View style={styles.box}>
                                    <SafeAreaView>
                                        <TextInput
                                            value={dataInput.productPriceEN}
                                            onChangeText={(data) => this.handleChangeInput('productPriceEN', data)}
                                            style={styles.input}
                                            placeholderTextColor="black"
                                            placeholder="តម្លៃអីវ៉ាន់"
                                            
                                        />
                                    </SafeAreaView>
                                </View>
                                {/* <View style={styles.box}>
                                    <CheckBox
                                        checked={dataInput.productPriceStatus == true ? true:false}
                                        onPress={() => this.setState({
                                            dataInput:{...dataInput, productPriceStatus:true}
                                        })}
                                        size={26}
                                    />
                                    <Text style={styles.text}>ទូទាត់រួច/</Text>
                                    <CheckBox
                                        checked={dataInput.productPriceStatus == false ? true:false}
                                        onPress={() => this.setState({
                                            dataInput:{...dataInput, productPriceStatus:false}
                                        })}
                                        size={26}
                                    />
                                    <Text style={styles.text}>មិនទាន់ទូទាត់/</Text>
                                </View> */}
                                <View style={styles.box}>
                                    <SafeAreaView>
                                        <TextInput
                                            value={dataInput.driverFeeKH}
                                            onChangeText={(data) => this.handleChangeInput('driverFeeKH', data)}
                                            style={styles.input}
                                            placeholderTextColor="black"
                                            //placeholderTextColor="#00716F"
                                            placeholder="តម្លៃសេវាដឹក"
                                            
                                        />
                                    </SafeAreaView>
                                </View>
                                {/* <View style={styles.box}>
                                    <CheckBox
                                        checked={dataInput.driverFeeStatus == true ? true:false}
                                        onPress={() => this.setState({
                                            dataInput:{...dataInput, driverFeeStatus:true}
                                        })}
                                        size={26}
                                    />
                                    <Text style={styles.text}>ទូទាត់រួច/</Text>
                                    <CheckBox
                                        checked={dataInput.driverFeeStatus == false ? true:false}
                                        onPress={() => this.setState({
                                            dataInput:{...dataInput, driverFeeStatus:false}
                                        })}
                                        size={26}
                                    />
                                    <Text style={styles.text}>មិនទាន់ទូទាត់/</Text>
                                </View> */}
                            </View>
                            <View style={styles.footer}>
                                < TouchableOpacity
                                    onPress={() => this.handleFormAdd()}
                                    style={styles.button}
                                    >
                                    <Text style={styles.color}>រួចរាល់</Text>
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
    container:{
    //   flex:1,
    marginLeft:"1%",
    marginRight:"1%",
      alignItems:'center',
    //   backgroundColor:'white'
    },
    box:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
    },
    head:{
        flex:0.15,
        marginTop:8,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        width:'98%'
    },
    body:{
        flex:0.7,
        alignItems:'center',
        justifyContent:'center',
    },
    footer:{
        flex:0.15,
        alignItems:'center',
        justifyContent:'center',
        marginTop:'3%'
    },
    logo:{
      width: 200,
      height: 80,
    },
    input:{
      marginTop:5,
      height: 50,
      width:295,
      borderRadius:5,
      borderWidth: 2,
      borderColor:'#00716F',
      paddingHorizontal:30,
      fontSize:15,
      fontFamily:'Siemreap',

    },
    text:{
      fontSize:15,
      color:'black',
      marginRight:18,
      fontFamily:'Siemreap',
    },
    button:{
    //   margin: 5,
      backgroundColor:'blue',
      height: 50,
      width:290,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:5,
    },
        color:{
        color:'white',
        fontSize:18,
        fontFamily:'Siemreap',   
    },
    title:{
      marginTop:6,
      color:'black',
      fontSize:25,
      fontFamily:'Siemreap',
    },
    icon:{
        position:'absolute',
        left:15,
    },
})
 