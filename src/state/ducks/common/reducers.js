import { combineReducers } from "redux";
import * as types from "./types";
import { createReducer } from "../../utils";

const commonReducer = createReducer(false)({
    [types.UPLOAD_PIC_COMPLETED]: (state) => state,
});



export default combineReducers({
    common: commonReducer,
});
