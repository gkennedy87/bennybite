import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const listReducer = createReducer([])({
    [types.FETCH_LIST_COMPLETED]: (state, action) => {
        return action.payload.payload.events
    },
    [types.INSERT_COMPLETED]: (state, action) => {
        const event = action.payload.payload.event;
        state.push(event)
        return state.slice()
    },
    [types.UPDATE_COMPLETED]: (state, action) => {
        const event = action.payload.payload.event
        return state.map(e => e._id == event._id ? event : e)
    },
    [types.DELETE_COMPLETED]: (state, action) => {
        return state.filter(event => event._id != action.payload.payload.eventId)
    }
});

export default combineReducers({
    list: listReducer,
});
