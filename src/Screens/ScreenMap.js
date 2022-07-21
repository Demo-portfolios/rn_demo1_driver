import React,{Component} from 'react'
import {
    Text,
    Alert,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Dimensions,
    PixelRatio,
    Platform
} from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import { SafeAreaView } from 'react-navigation';

const EdgePadding = {
    top: 50,
    right: 10,
    bottom: 50,
    left: 10
}
const EdgePaddingAndroid = {
    top: 50,
    right: 10,
    bottom: 50,
    left: 10
}

const generateEdgePadding = (edgePadding) => {
 return {
        top: PixelRatio.getPixelSizeForLayoutSize(edgePadding.top),
        right: PixelRatio.getPixelSizeForLayoutSize(edgePadding.right),
        left: PixelRatio.getPixelSizeForLayoutSize(edgePadding.left),
        bottom: PixelRatio.getPixelSizeForLayoutSize(edgePadding.bottom)
 };
}


const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.01922;
const LONGITUDE_DELTA = (ASPECT_RATIO * LATITUDE_DELTA);
export default class Home extends Component{
    constructor(prop){
        super(prop)
        this.state={
            dataShop:false,
            myLocation:false
        }
        
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataShop} = this.state
        if(nextProps.user.dataRequestBookingDoneError && nextProps.user.dataRequestBookingDoneError !== user.dataRequestBookingDoneError){
            alert('មានអ្វីមួយមិនត្រឹមត្រូវ!')
        }
        if(nextProps.user.dataRequestBookingDone && nextProps.user.dataRequestBookingDone !== user.dataRequestBookingDone){
            //console.log('dataShop', dataShop);
            NavigationService.navigate(NAV_TYPES.DEL_INPUT, {data:dataShop.sellerID})
        }
    }
    async componentDidMount(){
        const { navigation } = this.props;
        var data = navigation.getParam('data', false);
        console.log('hi', data);
        await this.setState({
            dataShop:data
        })
        this.fitMarkers()
    }
    fitMarkers(){
        const {dataShop, myLocation} = this.state;
        if(dataShop){
            this.mapRef.fitToCoordinates(
                [
                    {
                        latitude: parseFloat(JSON.parse(dataShop.location).latitude),
                        longitude: parseFloat(JSON.parse(dataShop.location).longitude),
                    },
                    {
                        ...myLocation
                    }
                ], 
                {
                    edgePadding: Platform.OS == 'ios' ? generateEdgePadding(EdgePadding):generateEdgePadding(EdgePaddingAndroid) ,
                    animated: true
                }
            )
        }
    }
    handleChangeLocation(e){
        if(e && e.nativeEvent && e.nativeEvent.coordinate && e.nativeEvent.coordinate.latitude){
            this.setState({
                myLocation: {
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude
                }
            })
        }
        this.fitMarkers()
    }
    handleGetID(){
        const {dataShop} = this.state
        console.log('dataShop', dataShop);
        this.props.requestBookingDone({id: dataShop.id})
    }
    render(){
        const {dataShop} = this.state
        return(
            <>
            {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.container}>
                <ScrollView style={{flex:1}}> */}
                <View style={styles.container}>
                    <View style={styles.mapBox}>
                        <MapView 
                            provider={MapView.PROVIDER_GOOGLE}
                            style={styles.map}
                            ref={(ref) => { this.mapRef = ref }}
                            initialRegion={{
                                latitude: 11.5605504,
                                longitude: 104.9001984,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            }}
                            showsUserLocation={true}
                            onUserLocationChange={(e) => this.handleChangeLocation(e)}
                        >
                        {dataShop &&
                            <Marker
                                coordinate={{
                                    latitude: parseFloat(JSON.parse(dataShop.location).latitude),
                                    longitude: parseFloat(JSON.parse(dataShop.location).longitude),
                                }}
                            />
                        }
                        </MapView>
                        <View style={styles.btnBack}>
                            <TouchableOpacity style={styles.back}
                                onPress={() => NavigationService.goBack()} >
                                    <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:null}}>
                                        <View style={styles.tinyLogo}>
                                            <MaterialIcons style={styles.icon} name="keyboard-arrow-left" size={35} color="#970"> </MaterialIcons>
                                        </View>
                                    </SafeAreaView>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity style={styles.footer}
                            onPress={() => this.handleGetID()}
                        >
                            <Text style={styles.call} >រួចរាល់</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* </ScrollView>
                </KeyboardAvoidingView> */}
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginLeft:"0%",
        marginRight:"0%",
        backgroundColor: 'white',
        // position: 'relative',
    },
    map:{
        flex:1,
        flexDirection: 'row',
        height:"100%",
    },
    tinyLogo:{
        marginTop: 15,
        marginLeft: 10,
    },   
    mapBox:{
        flex: 0.9,
        flexDirection: 'row',
        // position: 'relative',
    },
    bottom:{
        flex:0.1,
        alignItems:'center',
        backgroundColor:'blue',
        justifyContent: 'center',
        backgroundColor: '#00316F',
    },
    btnBack:{
        flex: 0.15,
        flexDirection: 'row',
        position: 'absolute',
    },
    footer:{
        height: 47,
        width:"40%",
        borderRadius:5,
        backgroundColor: '#00676F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    call:{
        fontFamily:'Siemreap',
        color:'white',
        fontSize:18,
    }
  });
  