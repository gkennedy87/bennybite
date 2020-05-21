import * as types from "./types";

export const login = (payload) => ({
    type: types.LOGIN,
    meta: {
        async: true,
        blocking: true,
        path: "/auth/login",
        method: "POST",
        body: payload
    },
});

export const logout = (payload) => ({
    type: types.LOGOUT,
    meta: {
        async: true,
        blocking: true,
        path: "/auth/logout",
        method: "POST",
        body: payload
    },
});

export const authenticated = () => ({
    type: types.AUTHENTICATED,
});

export const initializeSession = (payload) => ({
    type: types.INITIALIZE,
    payload
});

export const destroySession = () => ({
    type: types.DESTROY
});

export const forgotPassword = (payload) => ({
    type: types.FORGOT_PASSWORD,
    meta: {
        async: true,
        blocking: true,
        path: "/auth/forgot-password",
        method: "POST",
        body: payload
    },
});

export const signup = (payload) => ({
    type: types.SIGNUP,
    meta: {
        async: true,
        blocking: true,
        path: "/auth/register",
        method: "POST",
        body: payload
    },
});

export const updateProfilePic = (userId, payload) => ({
    type: types.UPDATE_PROFILE_PIC,
    meta: {
        async: true,
        blocking: true,
        path: `/users/${userId}/change-profile-pic`,
        method: "PATCH",
        body: payload
    },
});

export const changePassword = (userId, payload) => ({
    type: types.CHANGE_PASSWORD,
    meta: {
        async: true,
        blocking: true,
        path: `/users/${userId}/change-password`,
        method: "PATCH",
        body: payload
    },
});

export const updateProfile = (userId, payload) => ({
    type: types.UPDATE_PROFILE,
    meta: {
        async: true,
        blocking: true,
        path: `/users/${userId}`,
        method: "PATCH",
        body: payload
    },
});

export const resetPassword = (token, payload) => ({
    type: types.RESET_PASSWORD,
    meta: {
        async: true,
        blocking: true,
        path: "/auth/reset-password?token=" + token,
        method: "POST",
        body: payload
    },
});
