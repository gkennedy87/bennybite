import React, {Component} from 'react';
import {TouchableOpacity, View, Image, Modal, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import CustomButton from '../../components/CustomButton';
import CustomIcon from '../../components/CustomIcon';
import styles from './styles';
import {Color, Font} from '../../utils/variable';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  render() {
    const {modalVisible} = this.state;

    return (
      <View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.profiletop}>
              <View style={styles.profiletopview}>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}>
                  <CustomIcon style={styles.closebtn} name="close" />
                </TouchableOpacity>
                <Text style={styles.settingtitle}>Settings</Text>
                <TouchableOpacity style={styles.closebtn}>
                  <Text style={styles.edittxt}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.headermain}>
          <View style={styles.userview}>
            <View style={styles.usericonview}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(true);
                }}>
                <Image
                  style={styles.usericon}
                  source={require('../../assets/Images/user.png')}></Image>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.notificationview}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Notification');
                }}>
                <View style={styles.newnoti}></View>
                <CustomIcon
                  style={styles.notificationicon}
                  name="notification"
                />
              </TouchableOpacity>
            </View> */}
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
