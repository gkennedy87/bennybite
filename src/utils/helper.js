
import axios from "./../config/axios"
export const safeJSONParser = (value) => {
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}

export const uploadPic = async (image) => {
    var formData = new FormData();
    formData.append("pic", {
        uri: image.uri,
        type: image.type,
        name: image.fileName || 'pic'
    });
    return await axios.post('/common/upload-pic', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}