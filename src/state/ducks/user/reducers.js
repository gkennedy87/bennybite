import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const listReducer = createReducer([])({
    [types.FETCH_LIST_COMPLETED]: (state, action) => {
        return action.payload.payload.users
    },
    [types.ASSIGN_ROLE_COMPLETED]: (state, action) => {
        const user = action.payload.payload.user
        return state.map(u => u.id === user.id ? user : u)
    },
    [types.DELETE_COMPLETED]: (state, action) => {
        const userId = action.payload.payload.userId
        return state.filter(u => u.id !== userId)
    },
    [types.ENABLE_COMPLETED]: (state, action) => {
        const user = action.payload.payload.user
        return state.map(u => u.id === user.id ? user : u)
    },
    [types.DISABLE_COMPLETED]: (state, action) => {
        const user = action.payload.payload.user
        return state.map(u => u.id === user.id ? user : u)
    },
});

export default combineReducers({
    list: listReducer,
});
