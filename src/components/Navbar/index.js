import React, {Component} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {withNavigation} from 'react-navigation';
import styles from './styles';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <View style={styles.headermain}>
          <View style={styles.userview}>
            <View style={styles.usericonview}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Profile');
                }}>
                <Image
                  style={styles.usericon}
                  source={require('../../assets/Images/user.png')}></Image>
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

export default withNavigation(Navbar);
