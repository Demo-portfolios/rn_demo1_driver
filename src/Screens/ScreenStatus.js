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
                            <Text style={styles.text}>
                                ស្ថានភាពដឹកជញ្ជូន
                            </Text>
                            < TouchableOpacity
                            style={styles.button1}
                            onPress={() => NavigationService.navigate(NAV_TYPES.PAY, {data:dataInput})} 
                            >
                                <Text style={styles.color}>ដឹកជញ្ជូនជោគជ័យ</Text>
                            </TouchableOpacity>
                            < TouchableOpacity
                                style={styles.button2}
                            onPress={() => NavigationService.navigate(NAV_TYPES.DEFEAT, {data:dataInput})} 
                            >
                                <Text style={styles.color}>ដឹកជញ្ជូនបរាជ័យ</Text>
                            </TouchableOpacity>
                            < TouchableOpacity
                                style={styles.button3}
                            onPress={() => NavigationService.navigate(NAV_TYPES.DELAY, {data:dataInput})} 
                            >
                                <Text style={styles.color}>ពន្យាពេលដឹកជញ្ជូន</Text>
                            </TouchableOpacity>
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
      marginLeft:"1%",
      marginRight:"1%",
    //   padding:25,
    },
    body:{
        flex:0.6,
        flexDirection:'column',
        borderWidth:2,
        borderColor:'#00716F',
        width:'90%',
        height:'100%',
    },
    head:{
        flex:0.25,
        alignItems:'center',
        width:'98%',
        flexDirection:'row',
        justifyContent:'center'
    },
    Logo:{
        width: 200,
        height: 100,
        alignItems:'center',

    },
    icon:{
        position:'absolute',
        left:5,
        top:Platform.OS == 'ios' ? 70:55,
    },
    text:{
        fontSize:25,
        fontFamily:'Siemreap',
        color:'#00716F'
    },
    text1:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column'
    },
    button1:{  
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'green',
        height: 70,
        width:"80%",
        marginTop:10,
        // borderRadius:5,
    },
    button2:{  
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'red',
        height: 70,
        width:"80%",
        marginTop:10,
        // borderRadius:5,
    },
    button3:{  
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'orange',
        height: 70,
        width:"80%",
        marginTop:10,
        // borderRadius:5,
    },
    color:{
        fontFamily:'Siemreap',
        fontSize:18,
        color:'white'
    },
    })
 