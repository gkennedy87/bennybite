import { createStackNavigator } from 'react-navigation-stack'

import HeaderLeft from './../components/Header/HeaderLeft';
import GlobalStyles from './../utils/GlobalStyles';
import { isIOS } from './../utils/theme';

import ChangePassword from './../layouts/ChangePassword'
import Notification from './../layouts/Notification'
import Profile from './../layouts/Profile'

import Events from './../layouts/Management/Events';
import EventsDetails from './../layouts/Management/EventsDetails';
import CreateEvent from './../layouts/Management/CreateEvent';
import UsersListing from './../layouts/Management/UsersListing';
import EditEvents from './../layouts/Management/EditEvents';


const AuthNavigation = createStackNavigator(
    {
        Events: { screen: Events },
        EventsDetails: { screen: EventsDetails },
        CreateEvent: { screen: CreateEvent },
        EditEvents: { screen: EditEvents },
        UsersListing: { screen: UsersListing },
        Profile: { screen: Profile },
        Notification: { screen: Notification },
        ChangePassword: { screen: ChangePassword },
    },
    {
        initialRouteName: 'Events',
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