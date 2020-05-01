import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const authReducer = createReducer(false)({
    [types.AUTHENTICATED]: () => true,
    [types.LOGOUT]: () => false,
    [types.AUTHORIZATION_FAILED]: () => {
        // localStorage.removeItem('isAuthenticated');
        // localStorage.removeItem('user');
        // localStorage.removeItem('token');
        return false
    }
});

const initializeSessionReducer = createReducer(null)({
    [types.INITIALIZE]: (state, action) => ({ user: action.payload.user, tokens: action.payload.tokens }),
    [types.DESTROY]: (state, action) => null
});


export default combineReducers({
    session: initializeSessionReducer,
    isAuthenticated: authReducer
});