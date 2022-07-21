import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    Dimensions,
    Alert,
} from 'react-native'
import  Loading  from "../Components/Loading";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'


const { width, height } = Dimensions.get("window");
const formHeight = 73
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
export default class CreatePass extends Component{
   
    constructor(prop){
        super(prop)
        this.state = {
            dataInput:{
                oldPassword:'',
                password:'',
                confirmPassword :'',
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataInput} = this.state
      
        if(nextProps.user.dataValidatePasswordError && nextProps.user.dataValidatePasswordError !== user.dataValidatePasswordError){
            if(nextProps.user.dataValidatePasswordError.data && nextProps.user.dataValidatePasswordError.data.message && nextProps.user.dataValidatePasswordError.data.message == "invalid_password"){
                alert('ពាក្យសម្ងាត់មិនត្រឹមត្រូវ!')
            }
            else{
                alert('មានអ្វីមួយមិនត្រឹមត្រូវ!')
            }
        }
        if(nextProps.user.dataValidatePassword && nextProps.user.dataValidatePassword !== user.dataValidatePassword){
            this.handleChangePassword()
        }

        if(nextProps.user.dataChangePasswordError && nextProps.user.dataChangePasswordError !== user.dataChangePasswordError){
            alert('មានអ្វីមួយមិនត្រឹមត្រូវ!')
        }
        if(nextProps.user.dataChangePassword && nextProps.user.dataChangePassword !== user.dataChangePassword){
            alert("ពាក្យសម្ងាត់របស់អ្នកត្រូវបានផ្លាស់ប្តូរ!")
            NavigationService.goBack()
        }
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
    handleValidatePassword(){
        const {dataInput} = this.state
        var oldPassword = dataInput.oldPassword
        this.props.validatePassword({
            password: oldPassword
        })
    }
    componentDidMount(){
        console.log(this.props);
    }
    handleChangePassword(){
        const {dataInput} = this.state
        var password = dataInput.password
        var oldPassword = dataInput.oldPassword
        var confirmPassword = dataInput.confirmPassword
        if(password != confirmPassword){
            alert('ពាក្យសម្ងាត់មិនត្រូវគ្នា!')
            return
        }
        this.props.changePassword({
           password:password
        })
    }
    render(){
        const {dataInput} = this.state
        const {user} = this.props
        return(
            <>
            {user.pending &&
                    <Loading/>
                }
                <ScrollView style={styles.container}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.keyAvoid}>
                        <View style={styles.upBox}>
                            <View style={styles.headerImage}>
                                <Image style={{width:120,height:120}}
                                    source={require('../Assets/images/lock.png')}
                                />
                            </View>
                            
                            <Text style={styles.MeassageTitle}>
                                    បង្កើតពាក្យសម្ងាត់
                            </Text>
                            <TextInput style={styles.inputBox}
                                placeholder="ពាក្យសម្ងាត់ចាស់"
                                placeholderTextColor="#cae4db"
                                keyboardType="default"
                                color='white'
                                fontSize={12}
                                secureTextEntry={true}
                                value={dataInput.oldPassword}
                                onChangeText={(value) => this.handleChangeInput('oldPassword', value)}
                            />
                            <TextInput style={styles.inputBox}
                                placeholder="ពាក្យសម្ងាត់ថ្មី"
                                placeholderTextColor="#cae4db"
                                keyboardType="default"
                                color='white'
                                fontSize={12}
                                secureTextEntry={true}
                                value={dataInput.password}
                                onChangeText={(value) => this.handleChangeInput('password', value)}
                            />
                            <TextInput style={styles.inputBox}
                                placeholder="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
                                placeholderTextColor="#cae4db"
                                keyboardType="default"
                                color='white'
                                fontSize={12}
                                secureTextEntry={true}
                                value={dataInput.confirmPassword}
                                onChangeText={(value) => this.handleChangeInput('confirmPassword', value)}
                            />
                            <Text style={{marginLeft:'10%',marginTop:10,fontSize:14,fontFamily:'Siemreap',color:'#cae4db'}}>
                                ពាក្យសម្ងាត់ត្រូវតែជាអក្សរអង់គ្លេស ហើយត្រូវមាន:
                            </Text>
                            <AntDesign style={styles.tinyLogo} name="checkcircle" color={'#aad8d3'} style={{marginLeft:'10%',marginTop:'5%',fontSize:13,fontFamily:'Siemreap',}}>
                                <Text style={{fontSize:14,fontFamily:'Siemreap',color:'#cae4db'}}>
                                {'  '}យ៉ាងតិចណាស់ ៥ តួ
                                </Text>
                            </AntDesign>
                            <AntDesign style={styles.tinyLogo} name="checkcircle" color={'#aad8d3'} style={{marginLeft:'10%',fontSize:13,fontFamily:'Siemreap'}}>
                                <Text style={{paddingLeft:10,fontSize:14,fontFamily:'Siemreap',color:'#cae4db'}}>
                                {'  '}រួមបញ្ចូលអក្សរធំ (A-Z)
                                </Text>
                            </AntDesign>
                            <AntDesign style={styles.tinyLogo} name="checkcircle" color={'#aad8d3'} style={{marginLeft:'10%',fontSize:13,fontFamily:'Siemreap'}}>
                                <Text style={{fontSize:14,fontFamily:'Siemreap',color:'#cae4db'}}>
                                {'  '}រួមបញ្ចូលអក្សរតូច (a-z)
                                </Text>
                            </AntDesign>
                            <AntDesign style={styles.tinyLogo} name="checkcircle" color={'#aad8d3'} style={{marginLeft:'10%',fontSize:13,fontFamily:'Siemreap'}}>
                                <Text style={{fontSize:14,fontFamily:'Siemreap',color:'#cae4db'}}>
                                {'  '}រួមបញ្ចូលលេខ (0-9)
                                </Text>
                            </AntDesign>
                            <AntDesign style={styles.tinyLogo} name="checkcircle" color={'#aad8d3'} style={{marginLeft:'10%',fontSize:13,fontFamily:'Siemreap'}}> 
                                <Text style={{fontSize:14,fontFamily:'Siemreap',color:'#cae4db'}}>
                                    {'  '}និងមិនត្រូវបញ្ចូល ឈ្មោះ ឬនាមត្រកូលអ្នកឡើយ
                                </Text>
                            </AntDesign>
                        </View> 
                        <View style={styles.formContent}>
                            <TouchableOpacity style={styles.footer}
                                onPress={() => this.handleValidatePassword()} >
                                <Text style={styles.ready}>រួចរាល់</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>    
                </ScrollView>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#02475e',
    },
    keyAvoid:{
        height:'100%'
    },  
    upBox:{
        width:'100%',
        height: height - formHeight,
    },
    formContent:{
        width:'100%',
        height: formHeight-24,
        backgroundColor:'#02475e',
        position:'relative'
    }, 
    headerImage:{
        flex: 0.6,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        top:10,
    },

    MeassageTitle:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily:'Siemreap',
        margin:'10%',
        marginTop:'0%',
        marginBottom:'5%',

    },
    inputBox:{
        flex:0.08,
        flexDirection:"row",
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
        fontFamily:'Siemreap', 
        marginLeft:"10%",
        marginRight:"10%"
    },
    footer:{
        width:'100%',
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: '#fb3640',
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        bottom:"0%",
        alignSelf:'flex-end'
    },
    ready:{
        fontSize: 18,
        color:  'white',
        fontFamily:'Siemreap',
    }, 
});
  