import * as types from "./types";

export const fetchList = (queryString) => ({
    type: types.FETCH_LIST,
    meta: {
        async: true,
        blocking: true,
        path: '/users' + (queryString ? `?${queryString}` : ''),
        method: "GET",
    },
});

export const assignRole = (userId, role) => ({
    type: types.ASSIGN_ROLE,
    meta: {
        async: true,
        blocking: true,
        path: `/users/${userId}/assign-role`,
        method: "PATCH",
        body: { role }
    },
});

export const deleteUser = (userId) => ({
    type: types.DELETE,
    meta: {
        async: true,
        blocking: true,
        path: `/users/${userId}`,
        method: "DELETE"
    },
});

export const enableUser = (userId) => ({
    type: types.ENABLE,
    meta: {
        async: true,
        blocking: true,
        path: `/users/${userId}/enable`,
        method: "PATCH"
    },
});

export const disableUser = (userId) => ({
    type: types.DISABLE,
    meta: {
        async: true,
        blocking: true,
        path: `/users/${userId}/disable`,
        method: "PATCH"
    },
});
