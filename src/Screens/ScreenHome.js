import React, { Component,Fragment } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView
} from "react-native";
import NavigationService from "../Service/navigationService";
import { NAV_TYPES } from "../Navigation/navTypes";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { colors, images } from "../Assets";
import Oneoption from "../Components/Oneoption";
import AsyncStorage from "@react-native-community/async-storage";

export var OPTION = [
    {
      id: 1,
      title: "ទទួលអីវ៉ាន់",
      image: images.box,
      detail: "ទទួលអីវ៉ាន់ពីអតិថិជន",
      onpress: "DEL_INPUT",
    },
    {
      id: 2,
      title: "ស្វែងរកអតិថិជន",
      image: images.search,
      detail: "ស្វែងរកអតិថិជន",
      onpress: "QRCODE",
    },
    {
      id: 3,
      title: "ទិន្នន័យទទួលបាន",
      image: images.list,
      detail: "ទិន្នន័យទទួលបាន",
      onpress: "SHOP",
    },
    {
        id: 4,
        title: "ទូទាត់ប្រាក់",
        image: images.money,
        detail: "ទូទាត់ប្រាក់",
        onpress: "BANK",
      },
      {
        id: 5,
        title: "ហាងហៅដឹក",
        image: images.van,
        detail: "ហាងហៅដឹក",
        onpress: "ORDER",
      },
      {
        id: 6,
        title: "អីវ៉ាន់ពន្យាពេលទទួល",
        image: images.clock,
        detail: "អីវ៉ាន់ពន្យាពេលទទួល",
        onpress: "TABLEDELAY",
      },
  ];
  
export default class Home extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
        userStorage:null
    };
  }
  componentDidMount() {
    this.props.siteInformation();
    this.getUserStorage();

  }
  getUserStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("@DataLogin");
      if (value !== null) {
        if (value) {
          this.setState({
            userStorage: JSON.parse(value).data,
          });
        }
      } else {
        return;
      }
    } catch (error) {}
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    if (
      nextProps.user.dataSiteInformation &&
      nextProps.user.dataSiteInformation !== user.dataSiteInformation
    ) {
      // console.log('nextProps.user.dataSiteInformation', nextProps.user.dataSiteInformation);
    }
  }
  renderOption(data) {
    var rs = [];
    if (data && data.length > 0) {
      console.log(data);
      data.map((one, i) => {
        rs.push(<Oneoption data={one} index={i} />);
      });
    }
    return rs;
  }
  render() {
    var {userStorage}=this.state
    return (
      <>
        <Fragment>
          <SafeAreaView style={styles.main_safeAreaview}>
            <View style={styles.handerRow}>
              <View style={styles.handerRow_left}>
                <Text style={styles.text_hello}>
                    សួស្តី, {userStorage && userStorage.name}
                </Text>
              </View>
              <View style={styles.handerRow_right}>
                <Image style={styles.centerLogo} source={images.logo} />
              </View>
            </View>
            <ScrollView style={{ flex: 1, flexDirection: "column" }}>
              {this.renderOption(OPTION)}
            </ScrollView>
          </SafeAreaView>
        </Fragment>
      </>
    );
  }
}

const styles = StyleSheet.create({
    //main
    main_safeAreaview: {
      flex: 1,
      flexDirection: "column",
    },
    //top
    handerRow: {
      flex: 0.1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },
    handerRow_left: {
      flexDirection: "column",
      justifyContent: "center",
    },
    handerRow_right: {
      flexDirection: "column",
      justifyContent: "center",
    },
    centerLogo: {
      width: 40,
      height: 40,
    },
    text_hello: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.main_color,
    },
  
    //search
    view_search: {
      height: 52,
      paddingHorizontal: 20,
      marginVertical: 20,
    },
    touchsearch: {
      height: 52,
      borderRadius: 10,
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "center",
      borderColor: colors.main_color,
      backgroundColor: colors.white,
    },
    view_search_right: {
      justifyContent: "center",
      backgroundColor: colors.main_color,
      borderRadius: 9,
      width: 51,
      height: 51,
      alignItems: "center",
    },
    view_search_text: {
      flex: 1,
      justifyContent: "center",
    },
    text_search: {
      paddingLeft: 10,
      fontSize: 16,
      color: colors.main_color,
    },
  });
  