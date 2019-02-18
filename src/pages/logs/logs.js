// logs.js
import * as Utils from '@Utils/base';

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
