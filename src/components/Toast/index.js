// components/ui/Toast/index.js


let toastTimer = null;
Component.C({
    /**
     * 组件的属性列表
     */
    externalClasses: [
        'custom-class',
      ],
    properties: {
        content: {
            type: String,
            value: '',
        },

        isShow: {
            type: Boolean,
            value: false,
            observer(newVal) {
                newVal && this._showToast(newVal);
            },
        },

        duration: {
            type: Number,
            value: 2000,
        },

        contenStyle: {
            type: String,
            value: '',
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        _content: [],
    },

    /**
     * 组件的方法列表
     */
    methods: {
        _showToast() {
            const {
                content,
            } = this.data;
            this.setData({
                _content: content.indexOf('<br/>') > 0 ? content.split('<br/>') : [content],
                isShow: true,
            });
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => {
                this.setData({
                    isShow: false,
                });
            }, this.data.duration);
        },
    },
});
