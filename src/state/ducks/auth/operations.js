import { get } from "lodash"
import {
    login as loginAction,
    logout as logoutAction,
    initializeSession, destroySession, forgotPassword,
    signup, updateProfilePic, changePassword
} from "./actions";

const login = (payload) => {
    return async (dispatch) => {
        const response = await dispatch(loginAction(payload));
        const user = get(response, 'payload.user');
        const tokens = get(response, 'payload.tokens');
        const session = { user, tokens }
        await dispatch(initializeSession(session))
        return session;
    };
}

const logout = (payload) => {
    return async (dispatch) => {
        await dispatch(logoutAction());
        await dispatch(destroySession())
    };
}

export {
    login,
    logout,
    forgotPassword,
    initializeSession,
    signup,
    updateProfilePic,
    changePassword
};
