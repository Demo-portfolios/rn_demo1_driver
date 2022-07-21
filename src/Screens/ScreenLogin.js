import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import NavigationService from "../Service/navigationService";
import { NAV_TYPES } from "../Navigation/navTypes";
import Loading from "../Components/Loading/";
import { colors, images } from "../Assets";

export default class Login extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      dataInput: {
        phone: "",
        password: "",
        //phone:'0123456789',
        //password:'12345678'
      },
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    if (
      nextProps.user.userLoginError &&
      nextProps.user.userLoginError !== user.userLoginError
    ) {
      if (
        nextProps.user.userLoginError.data &&
        nextProps.user.userLoginError.data.message &&
        nextProps.user.userLoginError.data.message == "user_not_match"
      ) {
        alert("អ្នកប្រើមិនត្រឹមត្រូវ!");
      } else {
        alert("មានអ្វីមួយមិនត្រឹមត្រូវ!");
      }
    }
  }

  handleChangeInput(key, value) {
    const { dataInput } = this.state;
    var val = value;
    if (key == "phone") {
      val = val.replace(/[^0-9]/g, "");
    }
    this.setState({
      dataInput: {
        ...dataInput,
        [key]: val,
      },
    });
  }
  handleUserLogin() {
    const { dataInput } = this.state;
    var phone = dataInput.phone;
    if (phone[0] == "0") {
      phone = phone.substr(1, phone.length - 1);
    }
    phone = "855" + phone;
    this.props.userLogin({
      ...dataInput,
      phone: phone,
    });
  }
  render() {
    const { dataInput } = this.state;
    const { user } = this.props;
    return (
      <>
        {user.pending && <Loading />}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "null"}
          style={styles.container}
        >
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.inner}>
              <TouchableOpacity
                style={styles.flag}
                onPress={() => {
                  this.setState({ show: true });
                }}
              >
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={
                    this.state.lang === "kh"
                      ? images.khmerLang
                      : images.enlishLang
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={styles.HeaderImage}>
              <Image style={{ width: 120, height: 120 }} source={images.logo} />
            </View>
            <Text style={styles.HeaderTitle}>Login</Text>
            <TextInput
              style={styles.inputBox}
              placeholder={"លេខទូរស័ព្ទ"}
              placeholderTextColor="grey"
              color="black"
              value={dataInput.phone}
              onChangeText={value => this.handleChangeInput("phone", value)}
              maxLength={10}
            />
            <TextInput
              style={styles.inputBox}
              placeholder={"លេខសំងាត់"}
              placeholderTextColor="grey"
              secureTextEntry={true}
              color="black"
              value={dataInput.password}
              onChangeText={value => this.handleChangeInput("password", value)}
            />
            <TouchableOpacity
              style={styles.btnSignIn}
              onPress={() => this.handleUserLogin()}
            >
              <Text style={styles.signInTitle}>ចូលគណនី</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  language: {
    flex: 0.1,
    flexDirection: "row",
  },
  inner: {
    fontSize: 16,
    padding: 10,
    height: Platform.OS == "ios" ? "22%" : 60,
    alignItems: "flex-end",
    position: "relative",
  },
  flag: {
    flex: 0.8,
    width: 45,
    flexDirection: "column",
    paddingRight: "2%",
    marginTop: Platform.OS == "ios" ? "10%" : "0%",
  },
  popUpTitle: {
    height: 50,
    flexDirection: "row",
    backgroundColor: colors.gray_ligth,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  listBox: {
    backgroundColor: "white",
    height: 40,
    flexDirection: "row",
    color: "white",
    paddingLeft: 20,
    alignItems: "center",
  },
  radioTitle: {
    fontSize: 16,
    fontFamily: "Battambang",
    marginTop: 0,
    color: "#005792",
  },
  footerBtn: {
    height: 45,
    width: "100%",
    flexDirection: "row",
    backgroundColor: colors.gray_dark,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  HeaderImage: {
    flex: 0.3,
    height: 130,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  HeaderTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.gray_dark,
    textAlign: "center",
    fontFamily: "Battambang",
    margin: "10%",
    marginBottom: "5%",
    marginTop: "5%",
  },
  inputBox: {
    borderWidth: 1,
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: 10,
    borderColor: colors.gray_ligth,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 16,
    height: 48,
    lineHeight: 16,
  },
  signIn: {
    fontSize: 18,
    color: "#344fa1",
  },
  btnSignIn: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10%",
    marginRight: "10%",
    margin: 10,
    backgroundColor: colors.gray_dark,
    borderRadius: 5,
  },
  signInTitle: {
    fontSize: 16,
    color: "white",
    fontFamily: "Battambang",
  },
  register: {
    flex: 0.15,
    fontSize: 16,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  registerLink: {
    fontSize: 14,
    color: colors.gray_dark,
    fontFamily: "Battambang",
  },
});
