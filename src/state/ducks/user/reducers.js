import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const listReducer = createReducer([])({
    [types.FETCH_LIST_COMPLETED]: (state, action) => {
        return action.payload.payload.users
    },
    
});

export default combineReducers({
    list: listReducer,
});
