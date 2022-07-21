import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../Assets";

const SCREEN_WIDTH = Dimensions.get("window").width;
import NavigationService from "../../Service/navigationService";

class Oneoption extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <TouchableOpacity
        onPress={() => NavigationService.navigate(data.onpress)}
        style={styles.mainRow}
      >
        <View style={styles.one_option}>
          <View style={styles.view_oneOption}>
            <View style={styles.text_top_title}>
              <Text>{data.title}</Text>
            </View>
            <Text style={styles.text_detail} numberOfLines={3}>
              {data.detail}
            </Text>
          </View>
          <View style={styles.div_image_option}>
            <Image source={data.image} style={styles.image_option} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Oneoption;

const styles = StyleSheet.create({
  mainRow: {marginVertical:5},
  view_oneOption: {
    flex: 0.8,
    marginRight: "5%",
    backgroundColor: colors.gray_ligth,
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    height: 120,
    borderRadius: 5,
    paddingTop: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text_top_title: {
    backgroundColor: colors.main_color,
    borderRadius: 5,
    overflow: "hidden",
    position: "absolute",
    top: -15,
    left: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  one_option: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 15,
    marginVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
  },
  div_image_option: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: -60,
  },
  image_option: {
    width: 85,
    height: 85,
  },
  text_detail: {
    width: "60%",
    justifyContent: "center",
    marginTop: 10,
  },
});
