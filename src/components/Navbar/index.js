import React, { Component } from 'react';
import { get } from "lodash";
import { connect } from "react-redux";
import { TouchableOpacity, View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from './styles';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let pic = require('../../assets/Images/user.png');
    if (this.props.user.pic)
      pic = { uri: this.props.user.pic }
    return (
      <View>
        <View style={styles.headermain}>
          <View style={styles.userview}>
            <View style={styles.usericonview}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Profile');
                }}>
                <Image style={styles.usericon} source={pic}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Navbar.defaultProps = {
  title: 'Demo',
};

const mapStateToProps = (state) => ({
  user: get(state, 'auth.session.user', {})
});

const mapDispatchToProps = {};

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Navbar));
