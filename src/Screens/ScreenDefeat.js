import React, {Component} from 'react';
import { Image, StyleSheet, Text, View,TouchableOpacity,TextInput,SafeAreaView,KeyboardAvoidingView,ScrollView} from 'react-native';
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class Defeat extends Component{
  constructor(prop){
    super(prop)
    this.state={
        dataInput:false
    }
}
componentDidMount(){
    const { navigation } = this.props;
    var data = navigation.getParam('data', false);
    console.log('hi', data);
    this.setState({
        dataInput:{
            ...data,
            note:''

        },
    })
}
handleChangeInput(key, value){
    const {dataInput} = this.state
    var val = value
    this.setState({
        dataInput:{
            ...dataInput,
            [key]:val
        }
    })
}
UNSAFE_componentWillReceiveProps(nextProps){
    const {user} = this.props
        if(nextProps.user.confirmReturnError && nextProps.user.confirmReturnError !== user.confirmReturnError){
        alert('សូមបញ្ជាក់មូលហេតុ!')
        }
        console.log('nextProps.user.dataConfirmReturn', nextProps.user.dataConfirmReturn);
        if(nextProps.user.dataConfirmReturn && nextProps.user.dataConfirmReturn !== user.dataConfirmReturn){
        alert('ការត្រលប់ឥវ៉ាន់បានជោគជ័យ!')
        NavigationService.navigate(NAV_TYPES.QRCODE)
        }
    }
handleConfirmReturn(){
    const {dataInput} = this.state
    var data = {
        "id": dataInput.id,
        "note":dataInput.note,
        "sellerID":dataInput.sellerID
    }
    console.log('data', data);
    this.props.confirmReturn(data)
}
    render(){
        const {dataInput} = this.state
      return(
          <>
            <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1}}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.container}></KeyboardAvoidingView>
                        <ScrollView style={styles.full}>
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
                                        <Text style={styles.text}>
                                            ស្ថានភាពដឹកជញ្ជូន
                                        </Text>
                                    </View>
                                    <View style={styles.input}>
                                        <SafeAreaView>
                                            <TextInput
                                                value={dataInput.note}
                                                onChangeText={(data) => this.handleChangeInput('note', data)}
                                                style={styles.input1}
                                                placeholderTextColor="black"
                                                placeholder="សូមរាយការពីមូលហេតុ"                    
                                            />
                                        </SafeAreaView>
                                    </View>
                                </View>
                                <View style={styles.footer}>
                                    < TouchableOpacity
                                        style={styles.button2}
                                        onPress={() => this.handleConfirmReturn()}
                                    >
                                        <Text style={styles.color}>ដឹកជញ្ជូនបរាជ័យ</Text>
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
      alignItems:'center',
      marginLeft:"1%",
      marginRight:"1%",
    //   padding:25,
    },
    full:{
        flex:1,
    },
    body:{
        flex:0.4,
        flexDirection:'column',
        borderWidth:2,
        borderColor:'#00716F',
        width:'90%',
        height:300,
        marginBottom:'10%'
    },
    head:{
        flexDirection:'row',
        flex:0.2,
        width:'98%',
        alignItems:'center',
        justifyContent:'center'
    },
    footer:{
        flex:0.2,
        width:'90%',
    },
    Logo:{
        width: 200,
        height: 100,
        alignItems:'center',
    },
    icon:{
        position:'absolute',
        left:5,
        top:33,
    },
    text:{
        fontSize:25,
        fontFamily:'Siemreap',
        color:'black',
        marginTop:10,
    },
    text1:{
        flex:0.7,
        alignItems:'center',
        // justifyContent:'center',
        flexDirection:'column'
    },
    input:{
        flex:0.2,
        margin:10,
        // justifyContent:'center',
        borderBottomWidth:2,
        borderColor:'#00716F',
        // width:"96%"
    },
    input1:{
        fontSize:15,
        fontFamily:'Siemreap',
    },
    button2:{  
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'red',
        height: 55,
        width:"100%",
        // marginTop:10,
        // borderRadius:5,
    },
    color:{
        fontFamily:'Siemreap',
        fontSize:18,
        color:'white'
    },
    })


 