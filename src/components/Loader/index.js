import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ActivityIndicator, StyleSheet, Modal, Text } from "react-native";
import { Color, Font } from "../../utils/variable";

class Loader extends Component {
  render() {
    return this.props.loading ? (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.props.loading}
      >
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            style={{ alignSelf: "center" }}
            color={Color.TXT_WHITE}
            size="large"
          />
          <Text style={styles.loadertxt}>{"Please Wait..!!"}</Text>
        </View>
      </Modal>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  loadertxt: {
    marginTop: 10,
    fontFamily: Font.MYRIAD_SEMIBOLD,
    fontSize: Font.FONTSIZE_18,
    color: Color.TXT_WHITE,
  },
});

export const mapStateToProps = (state) => ({
  loading : !!state.busy
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);

// export default Loader;
