import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import AsyncStorage from "@react-native-community/async-storage"
import { Globals } from '../utils/variable'
import { AppState, Platform } from "react-native";
import nextFrame from "next-frame";

const configPushNotification = (onNotification) => {
    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: async function (device) {
            console.log('DEVICE TOKEN:', device.token)
            console.log('DEVICE TYPE:', device.os)
            await AsyncStorage.setItem(Globals.kDeviceToken, device.token)
            await AsyncStorage.setItem(Globals.kDeviceType, device.os)

            const { currentState } = AppState;
            if (currentState === 'active') {
                if (Platform.OS == 'ios') {
                    PushNotification.setApplicationIconBadgeNumber(0);
                }
            }
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: async function (notification) {
            await nextFrame(); // this is required to get appState == active
            notification.userInteraction = notification.userInteraction || (!notification.foreground && AppState.currentState == "active");
            // console.log('NOTIFICATION:', notification);

            // process the notification
            onNotification && onNotification(notification)

            if (Platform.OS === 'ios') {
                // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            }
        },

        // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
        senderID: '145589030158', // bhadresh@nimblechapps.com

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         */
        requestPermissions: true,
    });
}
export { configPushNotification }
export default PushNotification;