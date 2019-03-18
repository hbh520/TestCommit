var app = getApp();

Page({
    data: {},
    onLoad: function n(t) {
        var o = t.id;
        var a = this;
        app.util.request({
            url: "entry/wxapp/Refundconsult",
            method: "post",
            dataType: "json",
            data: {
                id: o
            },
            success: function n(t) {
                a.setData({
                    detail: t.data.data
                });
            }
        });
    },
    onReady: function n() {},
    onShow: function n() {},
    onHide: function n() {},
    onUnload: function n() {},
    onPullDownRefresh: function n() {},
    onReachBottom: function n() {},
    onShareAppMessage: function n() {}
});