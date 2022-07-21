import React, { Component } from 'react'
import { View,SafeAreaView,TouchableOpacity,Text, Switch, StyleSheet} from 'react-native'
import { WebView,WebViewNavigation } from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../Service/navigationService'
import {generateUrlReceipt} from "../Utils/generateUrlReceipt";
import Share from 'react-native-share';
import ViewShot from "react-native-view-shot";
import RNFS from "react-native-fs";
import {NAV_TYPES} from '../Navigation/navTypes'
class ScreenViewWebInvoice extends Component {
    constructor(prop){
        super(prop)
        this.state={
            token:"",
            id:false,
        }
    }
    // DEL_CORRECT
    componentDidMount(){
        const {navigation} = this.props
        const id = navigation.getParam('id',false);
        this.setState({
            id:id
        })
        this.__GetlocalStore();
    }
    __GetlocalStore = async () => {
        var value = await AsyncStorage.getItem('@DataLogin');
        if(value !== null){
            value = JSON.parse(value)
            this.setState({
                token:value.token
            })
            console.log('value', value.token);
        }else{
            console.log('value', value);
        }
    }
    async printHTML(url) {
        await axios
        .get(url)
        .then(async (result) => {
            console.log('result', result);
            await RNPrint.print({
                html: `${result.data}`
            })
        })
        .catch((error) => {
            console.log("error", error);
        });
    }
    handlePrint(){
        Share.open()
        .then((res) => {
            console.log('handlePrint', res);
        })
        .catch((err) => {
            err && console.log('handlePrint err', err);
        });
    }
    captureAndShareScreenshot(){
        this.refs.viewShot.capture().then((uri) => {
        RNFS.readFile(uri, 'base64').then((res) => {
            let urlString = 'data:image/jpeg;base64,' + res;
            let options = {
                title: 'Share Title',
                message: 'Share Message',
                url: urlString,
                type: 'image/jpeg',
            };
            Share.open(options)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
        });
        });
    };
    render() {
        const {id, token} = this.state
        var url = '';
        if(id && token){
            var url = generateUrlReceipt(id, token)  
            console.log('url', url);
        }
        return (
                <>
                    <SafeAreaView  style={styles.container}>
                        <ViewShot
                            style={styles.container}
                            ref="viewShot"
                            options={{format: 'jpg', quality: 0.9}}
                        >
                            {id && token ?
                                    <View style={{flex:1,marginBottom:0}}>
                                        <WebView source={{ uri:url }} />
                                    </View> 
                                :null  
                            }
                        </ViewShot>
                        
                        <View style={{position:'absolute',bottom:0,right:0,left:0, flexDirection:'row'}}>
                            <TouchableOpacity
                                style={[styles.button, {backgroundColor:'#004a80'}]}
                                onPress={() => NavigationService.goBack()} 
                            >
                                <Text style={styles.text1}>បន្ថែម</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button]}
                                onPress={() => NavigationService.navigate(NAV_TYPES.MAIN_HOME)} 
                            >
                                <Text style={styles.text1}>រួចរាល់</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, {backgroundColor:'orange'}]} onPress={()=>{this.captureAndShareScreenshot()}}>
                                <Text style={styles.text1}>
                                    ព្រ៊ីន
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>  
                </>
        )
    }
}
export default ScreenViewWebInvoice

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor:"#FFF"
   },
   title_oneone:{
       fontSize:14
   },
   invoce:{
       flex:1,
       flexDirection:'column',
       backgroundColor:'#FAFAFA',
       padding:10,
       shadowColor:'#e3f2fd',
       shadowOffset: {
           width: 1,
           height: 1
         },
       shadowOpacity:10,
       marginVertical: 5,
       overflow: "hidden",
       borderBottomWidth:1,
       borderBottomColor:'#e3f2fd',
   },
   button:{
       flex:0.33333,
    backgroundColor:'#5cb85c',
    padding:10,
    alignItems:'center',
    justifyContent:'center',

  },
  text1:{
    fontSize:18,
    fontFamily:'Siemreap',
    color:'white',
  }
 });

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   Button,
//   StyleSheet,
//   NativeModules,
//   Platform,
//   Text,
//   View
// } from 'react-native';

// import { axios } from '../Modules/app'
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import RNPrint from 'react-native-print';

// export default class RNPrintExample extends Component {
//   state = {
//     selectedPrinter: null
//   }

//   // @NOTE iOS Only
//   selectPrinter = async () => {
//     const selectedPrinter = await RNPrint.selectPrinter({ x: 100, y: 100 })
//     this.setState({ selectedPrinter })
//   }

//   // @NOTE iOS Only
//   silentPrint = async () => {
//     if (!this.state.selectedPrinter) {
//       alert('Must Select Printer First')
//     }

//     const jobName = await RNPrint.print({
//       printerURL: this.state.selectedPrinter.url,
//       html: '<h1>Silent Print</h1>'
//     })

//   }

//     async printHTML() {
//         await axios
//         .get("https://mst.amatak.net/report/77/receipt/-/-/-/-?undefined/token")
//         .then(async (result) => {
//             console.log('result', result);
//             await RNPrint.print({
//                 html: `${result.data}`
//             })
//         })
//         .catch((error) => {
//             console.log("error", error);
//         });
//     }

//   async printPDF() {
//     const results = await RNHTMLtoPDF.convert({
//       html: '<h1>Custom converted PDF Document</h1>',
//       fileName: 'test',
//       base64: true,
//     })

//     await RNPrint.print({ filePath: results.filePath })
//   }

//   async printRemotePDF() {
//     await RNPrint.print({ filePath: 'https://graduateland.com/api/v2/users/jesper/cv' })
//   }

//   customOptions = () => {
//     return (
//       <View>
//         {this.state.selectedPrinter &&
//           <View>
//             <Text>{`Selected Printer Name: ${this.state.selectedPrinter.name}`}</Text>
//             <Text>{`Selected Printer URI: ${this.state.selectedPrinter.url}`}</Text>
//           </View>
//         }
//       <Button onPress={this.selectPrinter} title="Select Printer" />
//       <Button onPress={this.silentPrint} title="Silent Print" />
//     </View>

//     )
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {Platform.OS === 'ios' && this.customOptions()}
//         <Button onPress={this.printHTML} title="Print HTML" />
//         <Button onPress={this.printPDF} title="Print PDF" />
//         <Button onPress={this.printRemotePDF} title="Print Remote PDF" />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
// });