var app = getApp();

Page({
    data: {},
    onLoad: function a(t) {
        var n = this;
        var o = [];
        var s = [];
        app.util.request({
            url: "entry/wxapp/getexpressinfo",
            method: "get",
            dataType: "json",
            data: {
                order_id: t.order_id
            },
            success: function a(t) {
                var e = t.data.data.data;
                for (var i in e) {
                    s.push(e[i]);
                }
                for (var i = s.length - 1; i >= 0; i--) {
                    o.push(s[i]);
                }
                console.log(o);
                n.setData({
                    shipping: t.data.data,
                    shipList: o
                });
            }
        });
    },
    copy: function a() {
        wx.setClipboardData({
            data: this.data.shipping.nu,
            success: function a(t) {
                wx.getClipboardData({
                    success: function a(t) {
                        console.log(t.data);
                        wx.showToast({
                            title: "复制成功",
                            icon: "success"
                        });
                    }
                });
            }
        });
    },
    onReady: function a() {},
    onShow: function a() {},
    onHide: function a() {},
    onUnload: function a() {},
    onPullDownRefresh: function a() {},
    onReachBottom: function a() {},
    onShareAppMessage: function a() {}
});