var app = getApp();

Page({
    data: {},
    onLoad: function t(a) {
        var e = a.id;
        var r = a.status;
        this.refundconsult(e);
        var n = this;
        app.util.request({
            url: "entry/wxapp/Refunddetail",
            method: "post",
            dataType: "json",
            data: {
                id: e
            },
            success: function t(a) {
                n.setData({
                    detail: a.data.data,
                    id: e,
                    status: r
                });
            }
        });
    },
    jump: function t() {
        var a = this.data.id;
        wx.navigateTo({
            url: "../detail/consult/consult?id=" + a
        });
    },
    goreturn: function t(a) {
        var e = a.currentTarget.dataset.id;
        var r = a.currentTarget.dataset.phone;
        var n = a.currentTarget.dataset.status;
        var u = a.currentTarget.dataset.money;
        wx.redirectTo({
            url: "../../../order/return/return?id=" + e + "&status=" + n + "&phone=" + r + "&money=" + u
        });
    },
    moneyGo: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../detail/moneyGo?id=" + e
        });
    },
    cancel: function t(a) {
        var e = this;
        var r = a.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/Refundcancel",
            method: "post",
            dataType: "json",
            data: {
                id: r
            },
            success: function t(a) {
                e.setData({
                    status: 2
                });
            }
        });
    },
    refundconsult: function t(a) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Refundconsult",
            method: "post",
            dataType: "json",
            data: {
                id: a
            },
            success: function t(a) {
                e.setData({
                    refundconsult: a.data.data
                });
            }
        });
    }
});