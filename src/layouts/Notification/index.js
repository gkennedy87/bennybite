import React, {Component} from 'react';
import {View, SafeAreaView, Text} from 'react-native';

import styles from './styles';

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.safeareaview}>
        <SafeAreaView style={styles.contentcenter}>
          <Text>Notification</Text>
        </SafeAreaView>
      </View>
    );
  }
}
