import React,{Component} from 'react'
import {
    Text,StyleSheet,Image,View,TouchableOpacity, ScrollView, RefreshControl, 
    SafeAreaView, ActivityIndicator
} from 'react-native'
import NavigationService from '../Service/navigationService'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NAV_TYPES } from '../Navigation/navTypes'
import moment from 'moment'
import {images,colors} from '../Assets'
export default class ResultPackage extends Component{
    constructor(prop){
        super(prop)
        this.state={
            page:1,
            loading:true,
            end:false,
            dataListReport:[],
            refreshing:false,
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataListReport, page} = this.state
        if(nextProps.user.dataListReportError && nextProps.user.dataListReportError !== user.dataListReportError){
            alert('មានអ្វីមួយមិនត្រឹមត្រូវ!')
        }
        if(nextProps.user.dataListReport && nextProps.user.dataListReport !== user.dataListReport){
            if(nextProps.user.dataListReport.length > 0){
                this.setState({
                    dataListReport:[...dataListReport, ...nextProps.user.dataListReport],
                    //dataListReport:[],
                    //end:true,
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
      this.handleGetListReport()  
    }
    async handleRefresh(){
        const {page} = this.state
        await this.setState({
            dataListReport:[],
            refreshing:true,
            page: 1,
            end:false,
        })
        this.props.listReport(1)
    }
    handleGetListReport(){
        const {page} = this.state
        this.props.listReport(page)
    }
    renderReportList(){
        const {dataListReport} = this.state
        var results = []
        for (let index = 0; index < dataListReport.length; index++) {
            const element = dataListReport[index];
            results.push(
                <TouchableOpacity 
                    key={index}
                    style={styles.data}
                    onPress={() => NavigationService.navigate(NAV_TYPES.REPORT, {data:element})} 
                >
                    <View style={styles.buttom1}>
                        <Text style={styles.text}>{element.sellerName}</Text>
                    </View>
                    <View style={styles.buttom2}>
                        <Text style={styles.text}>{moment(element.dateTime).format('Do MMMM YYYY')}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        console.log('results', results);
        return results
    }
    render(){
        const { loading, end, refreshing, dataListReport} = this.state
        const {user} = this.props
        return(
            <>
                <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1,backgroundColor:'white'}}>
                    <View style={styles.container}>
                            <View style={styles.header}>
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
                            <View style={styles.head}>
                                <Text style={styles.title}>ទិន្នន័យហាងសរុប</Text>
                            </View>
                            <View style={styles.item}>
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
                                            (user.dataListReport.length <= dataListReport.length) && 
                                            !end
                                        ){
                                            this.handleGetListReport()
                                        }
                                    }}
                                >
                                    <SafeAreaView style={styles.inner}>
                                        {this.renderReportList()}
                                        {loading && 
                                            <ActivityIndicator style={{marginTop:10}} size='small' color={'gray'} />   
                                        }
                                        {end && dataListReport.length > 0 &&
                                            <Text style={styles.end}>No More Results</Text>
                                        }
                                    </SafeAreaView>
                                        {end && dataListReport.length == 0 &&
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
        alignItems:'center',
        backgroundColor: 'white',
    },
    head:{
        flexDirection:'row',
        flex:0.12,
        marginTop:20,
        alignItems:'center',
        marginLeft:"1%",
        marginRight:"1%",
    },
    item:{
        flex: 0.7,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    inner:{
        flex: 0.7,
        width:'98%',
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        fontSize:25,
        color: 'black',
        fontFamily:'Siemreap',
        alignItems:'center'
    },
    data: {
        marginTop:8,
        alignItems:'center',
        borderColor: '#00676F',
        borderTopWidth: 1,
        width:335,
        flexDirection:'row',
        justifyContent: 'center',
    },
    text:{
        marginTop:8,
        fontSize:15,
        fontFamily:'Siemreap',
        //color: '#00676F',
        color:'black',
        textAlign:'center'
    },
    buttom1:{
        flex:0.55,
        // alignItems:'center',
        // justifyContent:'center'

    },
    buttom2:{
        flex:0.45,
        //alignItems:'center',
        //textAlign:'center'
        // justifyContent:'center'
    },
    header:{
        flex:0.18,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginLeft:"1%",
        marginRight:"1%",
        width:'100%'
    },
    Logo:{
        width:60,
        height:60,
    },
    back:{
        position:'absolute',
        left:20,
    },
    end:{
        color:'#c7c7c7',
        fontSize:12,
        textAlign:'center'
    },
    emptyDataImage:{
        height:350,
        resizeMode:'contain',
    }
  });
  