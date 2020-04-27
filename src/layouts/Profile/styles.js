import {StyleSheet, Dimensions} from 'react-native';
import {Font, Color} from '../../utils/variable';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentcenter: {
    width: Dimensions.get('window').width - 40,
  },
});

export default styles;
