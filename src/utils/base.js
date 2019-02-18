const _toString = Object.prototype.toString;

export const isObeject = value => _toString.call(value) === '[object Object]';
export const isFunction = value => _toString.call(value) === '[object Function]';
export const isArray = value => _toString.call(value) === '[object Array]';
export const isString = value => _toString.call(value) === '[object String]';

export function getUrlVars(action) {
    const vars = {};
        const reg = /[?&]+([^=&]+)=([^&]*)/gi;
    action.replace(reg, (m, key, value) => {
        vars[key] = decodeURIComponent(value);
    });
    return vars;
}

function _formatNumber(n) {
    n = n.toString();
    return n[1] ? n : `0${n}`;
}

export function formatTime(number, format) {
    const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    const returnArr = [];
    const date = new Date(number) || new Date();
    returnArr.push(date.getFullYear());
    returnArr.push(_formatNumber(date.getMonth() + 1));
    returnArr.push(_formatNumber(date.getDate()));
    returnArr.push(_formatNumber(date.getHours()));
    returnArr.push(_formatNumber(date.getMinutes()));
    returnArr.push(_formatNumber(date.getSeconds()));
    for (const i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

/**
 * 设置用户设备唯一标识
 */
let _uuid;
export function getUUID() {
    if (_uuid) return _uuid;
    try {
        _uuid = wx.getStorageSync('_YH_UUID');
    } catch (e) {}
    return _uuid;
}

export function setUUID() {
    _uuid = getUUID();
    if (_uuid) return;
    _uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    wx.setStorageSync('_YH_UUID', _uuid);
}


export function getPage() {
    if (typeof getCurrentPages !== 'function') return {};

    const pages = getCurrentPages();
    // 获取当前页面
    return pages && pages.length ? pages[pages.length - 1] : {};
}

/**
 * 获取前置页面
 *
 * @params {Number} index 前置第几页， 默认1即前一页
 */
export function getPrePage(index = 1) {
    if (typeof getCurrentPages !== 'function') return {};

    const pages = getCurrentPages();
    // 获取当前页面
    return pages && pages.length && (pages.length >= (index + 1)) ? pages[pages.length - 1 - index] : {};
}

export function jsonToQueryString(json) {
    return Object.keys(json).map(key =>
        // return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
         `${key}=${json[key]}`).join('&');
}
