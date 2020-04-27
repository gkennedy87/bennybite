import React, {Component} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import Navbar from '../../../components/Navbar';
import CustomButton from '../../../components/CustomButton';

import styles from './styles';

const listData = [
  {key: '1. element'},
  {key: '2. element'},
  {key: '3. element'},
];

export default class UsersListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: true,
      data: this.props.data,
    };
  }

  setScrollEnabled(enable) {
    this.setState({
      enable,
    });
  }

  success(key) {
    const data = this.state.data.filter((item) => item.key !== key);
    this.setState({
      data,
    });
  }

  static navigationOptions = {
    header: null,
  };

  renderItem(item) {
    return (
      <ListItem
        text={item.key}
        success={this.success}
        setScrollEnabled={(enable) => this.setScrollEnabled(enable)}
      />
    );
  }
}
