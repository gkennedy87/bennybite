import { createStackNavigator } from 'react-navigation-stack';

import HeaderLeft from './../components/Header/HeaderLeft';
import GlobalStyles from './../utils/GlobalStyles';
import { isIOS } from './../utils/theme';

import Login from './../layouts/Login'
import ForgotPassword from './../layouts/ForgotPassword'
import ResetPassword from './../layouts/ResetPassword'


const AuthNavigation = createStackNavigator(
    {
        Login: { screen: Login },
        ForgotPassword: { screen: ForgotPassword },
        ResetPassword: { screen: ResetPassword }
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions: ({ navigation }) => ({
            gesturesEnabled: false,
            headerStyle: GlobalStyles.headerStyle,
            headerLeft: (
                <HeaderLeft iconName="back" onPress={() => navigation.goBack()} />
            ),
            headerRight: isIOS() ? null : <View style={{ width: 30 }}></View>,
        }),
    }
)

export default AuthNavigation