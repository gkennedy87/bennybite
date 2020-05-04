import * as types from "./types";

export const uploadPic = (payload) => ({
    type: types.UPLOAD_PIC,
    meta: {
        async: true,
        blocking: true,
        path: "/common/upload-pic",
        method: "POST",
        body: payload
    },
});





