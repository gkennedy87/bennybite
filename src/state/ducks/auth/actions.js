import * as types from "./types";

export const login = ( payload) => ( {
    type: types.LOGIN,
    meta: {
        async: true,
        blocking: true,
        path: "/auth/login",
        method: "POST",
        body: payload
    },
} );

export const logout = ( ) => ( {
    type: types.LOGOUT,
} );

export const authenticated = ( ) => ( {
    type: types.AUTHENTICATED,
} );

export const initializeSession = (payload ) => ( {
    type: types.INITIALIZE,
    payload
} );

export const destroySession = ( ) => ( {
    type: types.DESTROY
} );

export const forgotPassword = ( payload) => ( {
    type: types.FORGOT_PASSWORD,
    meta: {
        async: true,
        blocking: true,
        path: "/auth/forgot-password",
        method: "POST",
        body: payload
    },
} );

