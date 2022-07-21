import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

class CustomModal extends PureComponent {
  render() {
    const {
      content,
      oneButtonText,
      oneButtonPress,
      secondButtonText,
      secondButtonPress,
      onRequestClose,
      visible,
      title
    } = this.props;
    return (
      <View>
        <Modal animationType={"fade"} visible={visible} transparent={true} onRequestClose={onRequestClose}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBlock}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.container}>{content}</View>
              <View style={styles.btnsBlock}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={oneButtonPress}
                >
                  <Text>{oneButtonText}</Text>
                </TouchableOpacity>
                {secondButtonText && secondButtonPress ? (
                  <>
                    <View style={styles.verticalLine} />
                    <TouchableOpacity
                      style={styles.button}
                      onPress={secondButtonPress}
                    >
                      <Text>{secondButtonText}</Text>
                    </TouchableOpacity>
                  </>
                ) : null}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default CustomModal;

CustomModal.defaultProps = {
  oneButtonPress: () => {},
  secondButtonPress: () => {}
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding:20
  },
  container: {
    padding: 15
  },
  btnsBlock: {
    width: "100%",
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: 'gray'
  },
  verticalLine: {
    height: "100%",
    width: 0.5,
    backgroundColor: 'gray'
  },
  modalBlock: {
    backgroundColor: '#fff',
    width: SCREEN_WIDTH * 0.80,
    maxWidth: SCREEN_WIDTH * 0.80,
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'gray',
    shadowColor: 'gray',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 10,
    shadowOpacity: 0.5
  },
  button: {
    flex: 1,
    padding: 15,
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    paddingTop: 15
  }
});
