import React,{Component} from 'react'
import {
    Text, StyleSheet, Image, TouchableOpacity, View, Alert
} from 'react-native'
import NavigationService from '../Service/navigationService'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NAV_TYPES } from '../Navigation/navTypes'
import mediaPicker from "../Service/mediaPicker";
import requestPermission from '../Utils/requestPermission'
import {PERMISSIONS} from 'react-native-permissions';
import AsyncStorage from "@react-native-community/async-storage";
import { PROFILE_URL } from "../Modules/app/config";
import Loading from "../Components/Loading";
import { colors } from '../Assets';
export default class Account extends Component{
    constructor(prop){
        super(prop)
        this.state={
            show:false,
            profilePhoto:false,
            profileUpdating:false,
            GetProfile: false,
            userStorage:{}
        }
        
    }
    componentDidMount(){
        this.getUserStorage()
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {userStorage} = this.state
        const {user} = this.props
        if(nextProps.user.dataUpdateProfile && nextProps.user.dataUpdateProfile !== user.dataUpdateProfile){
          console.log('nextProps.user.dataUpdateProfile', nextProps.user.dataUpdateProfile);
          var newUser = {
              ...userStorage,
              image: nextProps.user.dataUpdateProfile
          }
          this.setNewUserData(newUser)
        }
      }
    handleUserLogout(){
        this.props.userLogout() 
    }
    getUserStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('@DataLogin');
            if (value !== null) {
                // We have data!!
                console.log('value', JSON.parse(value));
                if(value){
                    this.setState({
                        userStorage: JSON.parse(value).data
                    })
                }
            }else{
                console.log('value', false);
                return
            }
        } catch (error) {
            console.log('error', error);
        }
    };
    setNewUserData = async (newUser) => {
        try {
            const value = await AsyncStorage.getItem('@DataLogin');
            if (value !== null) {
                // We have data!!
                console.log('value', JSON.parse(value));
                if(value){
                    var userStorage = JSON.parse(value)
                    userStorage = {
                        ...userStorage,
                        data: newUser
                    }
                    AsyncStorage.setItem('@DataLogin', JSON.stringify(userStorage))
                }
            }
        } catch (error) {
            console.log('error', error);
        }
    };
    selectPhoto = () => {
        Alert.alert(
          "ប្ដូររូបភាព",
         "តើអ្នកចង់ប្រើប្រាស់រូបភាព រឺកាមេរ៉ា",
          [
            {
              text:"កាមេរ៉ា",
              onPress: () => this.openCamera(),
            },
            {
              text: "រូបភាព",
              onPress: () => this.openLibrary(),
            },
          ],
          { cancelable: false }
        );
      };
      openCamera(){
        var this_ = this;
        const REQUESTED = Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
        requestPermission(REQUESTED, function (results) {
            if(results){
              mediaPicker.openCamera(this_.onSelect);
            }
        })
      }
      openLibrary(){
        var this_ = this;
        const REQUESTED = Platform.OS === "ios" ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        requestPermission(REQUESTED, function (results) {
            if(results){
              mediaPicker.selectPhoto(this_.onSelect);
            }
        })
      }
      onSelect = photo => {
        const { GetProfile, userStorage } = this.state
        this.setState({ profilePhoto: photo, profileUpdating:true });
        this.props.updateProfile({
            oldImageName: userStorage && userStorage.image ? userStorage.image: '',
            newImageData: "data:image/png;base64,"+photo.data
        })
      };
    render(){
        const {profilePhoto, userStorage, profileUpdating} = this.state
        const {user} = this.state
        return(
            <>
                {user && user.pending &&
                    <Loading />
                }
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={this.selectPhoto} style={styles.logo}>
                            <Image
                                style={styles.image}
                                source={
                                profilePhoto && profilePhoto.data ? 
                                    { uri: "data:image/png;base64,"+profilePhoto.data } 
                                : 
                                userStorage && userStorage.image ?
                                    { uri: PROFILE_URL+userStorage.image } 
                                    :
                                    require('../Assets/images/userImage.jpg')
                                }
                            />
                        </TouchableOpacity>
                        <View style={styles.title}>
                            <Text style={styles.text}>សូមស្វាគមន៍</Text>
                            {userStorage && userStorage.name &&
                                <Text style={styles.text1}>{userStorage.name}</Text>
                            }
                            {userStorage && userStorage.phone &&
                                <Text style={styles.text}>{userStorage.phone}</Text>
                            }
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.item}>
                            <View style={styles.line}></View>
                        </View>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => NavigationService.navigate(NAV_TYPES.PRIVAC_POLICY)}
                        >
                                <Text style={styles.text2}>​    គោលការណ៍ និង លក្ខខណ្ឌ</Text>
                                
                                <Text style={styles.icon1}><MaterialIcons name="chevron-right" size={40} color={colors.gray_dark} /></Text>
                        </TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.line}></View>
                        </View>
                        <TouchableOpacity
                                style={styles.item}
                                onPress={() => Alert.alert("Only demo!")} 
                            >
                                <Text style={styles.text2}>​    ប្តូរលេខសម្ងាត់</Text>
                                
                                <Text style={styles.icon1}><MaterialIcons name="chevron-right" size={40} color={colors.gray_dark} /></Text>
                        </TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.line}></View>
                        </View>
                        <TouchableOpacity
                                style={styles.item}
                                onPress={() => this.handleUserLogout()}
                            >
                                <Text style={styles.text2}>    ចាកចេញ</Text>
                                
                                <Text style={styles.icon1}><MaterialIcons name="chevron-right" size={40} color={colors.gray_dark} /></Text>
                        </TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.line}></View>
                        </View>
                    </View>
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%'
    },
    header:{
        marginLeft:"1%",
        marginRight:"1%",
        flex:0.25,
        flexDirection:'row',
        alignItems:'center',
        marginLeft:30,
        marginTop:20,
    },
    body:{
        marginTop:20,
        width:'100%',
        flex:0.75,
        flexDirection:'column',
    },
    item:{
        marginLeft:'0.5%',
        marginRight:'0.5%',
        flexDirection:'row',
        alignItems:'center',
    },
    line:{
        borderColor:'gray',
        borderWidth:1,
        width:"100%",
    },
    title:{
        flexDirection:'column',
    },
    image:{
        width:120,
        height:120,
        borderRadius:15,
    },
    text:{
        color:colors.gray_dark,
        fontSize:18,  
        marginLeft:20,
    },
    text1:{
        color:colors.gray_dark,
        fontSize:28,  
        marginLeft:20,
    },
    text2:{
        flex:6,
        color:colors.gray_dark,
        fontSize:15, 
        padding:15, 
    },
    icon1:{
        flex:1,
    },
})