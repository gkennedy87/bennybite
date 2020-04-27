import React, {Component} from 'react';
import {View, SafeAreaView, Text} from 'react-native';

import styles from './styles';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.safeareaview}>
        <SafeAreaView style={styles.contentcenter}>
          <Text>Profile</Text>
        </SafeAreaView>
      </View>
    );
  }
}
