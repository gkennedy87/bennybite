
import axios from "./../config/axios"
export const safeJSONParser = (value) => {
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}

export const sameDayEvent = (d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
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