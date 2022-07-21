import React, { Component } from 'react'
import { Text, StyleSheet, Platform, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

export default class InputText extends Component {
    render() {
        const {
            icon,
            placeholder,
            onValueChange,
            value,
            error,
            items,
        } = this.props;
        return (
            <View style={styles.content}>
                <View style={styles.iconStyle}>
                    {icon &&
                        icon
                    }
                </View>
                <View
                    style={[
                        styles.input,
                        error ? {borderColor:'red'}:null
                    ]}
                >
                <RNPickerSelect
                    placeholder={placeholder}
                    value={value}
                    onValueChange={onValueChange}
                    items={items}
                    style={{
                        inputIOS: {
                            fontSize:16,
                            color:'#000',
                            height:50,
                            paddingLeft:16,
                            fontFamily:'KhmerOScontent'
                        },
                        inputAndroid: {
                            fontSize:15,
                            color:'#000'
                        },
                        placeholder: {
                            color: 'black',
                            fontSize: 15,
                        },
                    }}
                    useNativeAndroidPickerStyle={true}
                />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    content:{
        flex:1,
    },
    input:{
        flex:1,
        width:295,
        borderRadius:5,
        borderWidth: 2,
        borderColor:'#00716F',
        paddingHorizontal:10,
        fontSize:15,
        fontFamily:'KhmerOScontent',
        color:'#00716F'
        //backgroundColor:'red',
    },
    iconStyle:{
        justifyContent: "center",
        alignSelf:'center',
        width: 20,
        marginBottom:10,

    },
    errorText:{
        fontSize:10,
        color:'red',
        position:'absolute',
        right:0,
        bottom:-5
    }
})