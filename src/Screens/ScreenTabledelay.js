import React,{Component} from 'react'
import {Text,StyleSheet,Image,View,TouchableOpacity,ScrollView, RefreshControl,SafeAreaView,ActivityIndicator} from 'react-native'
import NavigationService from '../Service/navigationService'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NAV_TYPES } from '../Navigation/navTypes'
import moment from 'moment'
import { Platform } from 'react-native';

export default class Tabledelay extends Component{
    constructor(prop){
        super(prop)
        this.state={
            page:1,
            loading:true,
            end:false,
            dataListDelay:[],
            refreshing:false,
        }
        
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataListDelay, page} = this.state
        if(nextProps.user.dataListDelayError && nextProps.user.dataListDelayError !== user.dataListDelayError){
            alert('មានអ្វីមួយមិនត្រឹមត្រូវ!')
        }
        if(nextProps.user.dataListDelay && nextProps.user.dataListDelay !== user.dataListDelay){
            if(nextProps.user.dataListDelay.length > 0){
                this.setState({
                    dataListDelay:[...dataListDelay, ...nextProps.user.dataListDelay],
                    //end:true,
                    //dataListDelay:[],
                    loading:false,
                    page: page+1,
                    refreshing:false,
                })
            }else{
                this.setState({
                    end:true,
                    loading:false,
                    refreshing:false,
                })
            }
        }
    }
    componentDidMount(){
        this.handleGetListDelay()  
    }
    async handleRefresh(){
        const {page} = this.state
        await this.setState({
            dataListDelay:[],
            refreshing:true,
            page: 1,
            end:false,
        })
        this.props.listDelay(1)
    }
    handleGetListDelay(){
        const {page} = this.state
        this.props.listDelay(page)
    }
    renderListDelay(){
        const {dataListDelay} = this.state
        var results = []
        for (let index = 0; index < dataListDelay.length; index++) {
            const element = dataListDelay[index];
            results.push(
                <>
                    <View style={styles.line}></View>
                    <View style={styles.item}>
                        <View style={styles.photo}>
                            <Image
                                style={styles.logo}
                                source={require('../Assets/images/Time.png')}
                            />
                        </View>
                        <View style={styles.text}>
                            <TouchableOpacity
                                onPress={() => NavigationService.navigate(NAV_TYPES.DETIAL, {data:element})} 
                            >
                                <Text style={styles.data}>{element.sellerAddress} - {moment(element.delayDate).format('Do MMMM YYYY')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )
        }
        console.log('results', results);
        return results
    }
    render(){
        const { loading, end, refreshing, dataListDelay} = this.state
        const {user} = this.props
        return(
            <>
                <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1 , backgroundColor:'white'}}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                                <TouchableOpacity 
                                    style={styles.icon}
                                    onPress={() => NavigationService.goBack()}
                                > 
                                    <MaterialIcons  name="keyboard-arrow-left" size={35} color="#970"> </MaterialIcons>                                                                  
                                </TouchableOpacity>                 
                                <Text style={styles.title1}>អីវ៉ាន់ពន្យាពេលទទួល</Text>
                        </View>
                        <View style={styles.body}>
                            <ScrollView
                                refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={() => this.handleRefresh()}
                                />
                                }
                                onMomentumScrollEnd={(e)=>{
                                    const scrollPosition = e.nativeEvent.contentOffset.y
                                    const scrollViewHeigth = e.nativeEvent.layoutMeasurement.height
                                    const contentHeigth = e.nativeEvent.contentSize.height
                                    const isScrollToBottom = scrollPosition+scrollViewHeigth
                                    if(
                                        isScrollToBottom >= (contentHeigth-150) && 
                                        (user.dataListDelay.length <= dataListDelay.length) && 
                                        !end
                                    ){
                                        this.handleGetListDelay()
                                    }
                                }}
                            >
                                <SafeAreaView>
                                    {this.renderListDelay()}
                                    {loading && 
                                        <ActivityIndicator style={{marginTop:10}} size='small' color={'gray'} />   
                                    }
                                    {end && dataListDelay.length > 0 &&
                                        <Text style={styles.end}>No More Results</Text>
                                    }
                                </SafeAreaView>
                                {end && dataListDelay.length == 0 &&
                                    <SafeAreaView style={styles.inner}>
                                        <Image
                                            source={require('../Assets/images/emptyData.png')}
                                            style={styles.emptyDataImage}
                                        />
                                    </SafeAreaView>  
                                }
                            </ScrollView> 
                        </View>
                    </View>
                </SafeAreaView>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginLeft:"1%",
        marginRight:"1%",
        backgroundColor:'white'
    },
    body:{
        flex:0.8,
        width:'100%'
    },
    header:{
        flex:0.2,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        width:'100%',
    },
    icon:{
        position:'absolute',
        left:5,
        top:Platform.OS == 'ios' ? 51:30,
    },
    photo:{
        flex:0.25,
        alignItems:'center',
    },
    text:{
        flex:0.75,
    },
    title1:{
        fontSize:23,
        color:'black',
        fontFamily:'Siemreap'
    },
    line:{
        borderWidth:1,
        borderColor:'gray'
    },
    item:{
        alignItems:'center',
        width:'100%',
        flexDirection:'row',
    },
    logo:{
        width:140,
        height:60,
    },
    data:{
        marginRight:10,
        fontSize:14,
        color:'black',
        fontFamily:'Siemreap'
    },
    end:{
        color:'#c7c7c7',
        fontSize:12,
        textAlign:'center'
    },
    emptyDataImage:{
        height:350,
        resizeMode:'contain',
    },
    inner:{
        flex: 0.7,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
  });
  