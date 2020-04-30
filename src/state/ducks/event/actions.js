import * as types from "./types";

export const fetchList = () => ({
    type: types.FETCH_LIST,
    meta: {
        async: true,
        blocking: true,
        path: "/events",
        method: "GET",
    },
});

export const insertEvent = (event) => ({
    type: types.INSERT,
    meta: {
        async: true,
        blocking: true,
        path: "/events",
        method: "POST",
        body: event
    },
});

export const updateEvent = (eventId, event) => ({
    type: types.UPDATE,
    meta: {
        async: true,
        blocking: true,
        path: `/events/${eventId}`,
        method: "PATCH",
        body: event
    },
});

export const deleteEvent = (eventId) => ({
    type: types.DELETE,
    meta: {
        async: true,
        blocking: true,
        path: `/events/${eventId}`,
        method: "DELETE",
    },
});

