// logs.js
import * as Utils from '../../utils/base';

Page.P({
    data: {
        logs: [],
    },
    onLoad() {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(log => Utils.formatTime(log, 'Y年M月D日 h:m')),
        });
    },
});
