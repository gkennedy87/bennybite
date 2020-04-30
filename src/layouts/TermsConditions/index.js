import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import CustomButton from '../../components/CustomButton';

import styles from './styles';

export default class TermsConditions extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.contentpadd}>
            <Text style={styles.maintitle}>
              READ THIS DOCUMENT CAREFULLY BEFORE CHECKING THE BOX
            </Text>
            <Text style={styles.txtcontent}>
              By checking this box you acknowledge that you have made a
              conscious and voluntary decision to use the Benny’s Bites mobile
              application (“the application”) and all related activities. In
              doing so, I understand that I am choosing to undertake and assume
              voluntarily all risks associated with my participation in the
              application including food related illnesses and potential
              allergic reactions which vary from person to person but can
              include nausea, vomiting, swelling, itching, and possibly
              anaphylaxis that could lead to shock and/or death whether or not
              those risks relate in any way to the facts and circumstances of my
              health and/or the condition of all equipment and facilities,
              and/or the conduct of any and all other participants in and
              persons associated with the application.
            </Text>
            <Text style={styles.txtcontent}>
              In light of the foregoing and in consideration of my decision to
              participate in the application, I hereby forever, fully,
              completely and voluntarily release, discharge and acquit
              Susquehanna University, its Trustees, employees, volunteers,
              contractors, subcontractors and agents, and any all other persons
              who are involved in any way with the application (collectively,
              the “Discharged Persons”) from any and all present and/or future
              claims, whether known or unknown and accrued or not, including,
              but not limited to, claims, suits or demands for property damage
              or personal injury, including but not limited to wrongful death,
              arising as a result of my participation in the application, no
              matter wherever, whenever, or however they may arise
              (collectively, “Claims”).
            </Text>
            <Text style={styles.txtcontent}>
              My waiver is voluntary and complete. It includes Claims which are
              or could be made by me, my personal representative, family,
              estate, heirs, or my assigns, or any other person or entity
              claiming by or through me or any of the foregoing (collectively
              the “Discharging Persons”).
            </Text>
          </View>
        </ScrollView>
        <View style={styles.reatbtnview}>
          <CustomButton
            btnText="Agree & Continue "
            mainStyle={styles.createvent}
            btnStyle={styles.createventxt}
            onClick={() => {
              this.props.navigation.navigate('Events');
            }}
          />
        </View>
      </View>
    );
  }
}
