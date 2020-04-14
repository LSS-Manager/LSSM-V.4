module.exports = {
    getColorFromString(string = '') {
        let hash = 0;
        for (let i = 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        hash = (hash & 0x00ffffff).toString(16).toUpperCase();
        return '00000'.substring(0, 6 - hash.length) + hash;
    },
    getTextColor(color = '000000') {
        color = parseInt(color, 16);
        return Math.sqrt(
            (color & 0xff0000) ** 2 * 0.241 +
                (color & 0xff00) ** 2 * 0.691 +
                (color & 0xff) ** 2 * 0.068
        ) < 130
            ? 'fff'
            : '000';
    },
};
