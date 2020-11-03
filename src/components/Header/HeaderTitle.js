import React from 'react';
import {View, Text} from 'react-native';
import GlobalStyles from '../../utils/GlobalStyles.js';

class HeaderTitle extends React.Component {
  render() {
    const {title} = this.props;
    return (
      <View style={GlobalStyles.headerTitleViewStyle}>
        <Text style={GlobalStyles.headerTxt}>{title}</Text>
      </View>
    );
  }
}

export default HeaderTitle;
