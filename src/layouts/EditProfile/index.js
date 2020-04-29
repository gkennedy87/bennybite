import React, {Component} from 'react';
import {View, SafeAreaView, Text, TouchableOpacity, Image} from 'react-native';
import HeaderTitle from '../../components/Header/HeaderTitle';

import styles from './styles';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: () => <HeaderTitle title={'Settings'} />,
    };
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.safeareaview}>
        <SafeAreaView style={styles.contentcenter}>
          <View style={styles.centeredView}>
            <View style={styles.profilecontentcenter}>
              <View style={styles.profilecontent}>
                <Text style={styles.prfltxt}>User Profile</Text>
                <TouchableOpacity style={styles.profileview}>
                  <Image
                    style={styles.profilepic}
                    source={require('../../assets/Images/userprofile.png')}
                  />
                </TouchableOpacity>
                <Text style={styles.uploadtxt}>Edit</Text>
                <Text style={styles.usertxt}>John Doe</Text>
                <Text style={styles.emailtxt}>johndoe@gmail.com</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
