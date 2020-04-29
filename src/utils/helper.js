export const safeJSONParser = (value) => {
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}