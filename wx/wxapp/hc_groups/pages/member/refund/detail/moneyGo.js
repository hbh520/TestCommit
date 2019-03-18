var app = getApp();

Page({
    data: {},
    onLoad: function n(o) {
        var t = o.id;
        var a = this;
        app.util.request({
            url: "entry/wxapp/Refundrun",
            method: "get",
            dataType: "json",
            data: {
                id: t
            },
            success: function n(o) {
                a.setData({
                    moneyGo: o.data.data
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