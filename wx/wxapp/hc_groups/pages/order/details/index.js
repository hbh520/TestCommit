var _Page;

function _defineProperty(a, t, e) {
    if (t in a) {
        Object.defineProperty(a, t, {
            value: e,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        a[t] = e;
    }
    return a;
}

var app = getApp();

Page((_Page = {
    data: {
        cancel: 0
    },
    onLoad: function a(t) {
        var e = getApp().globalData.shop_name;
        var r = this;
        var n = t.order_id;
        var i = t.status;
        var o = t.isshare;
        var s = t.finsh;
        var d = t.iscomment;
        var u = t.group_id;
        var c = t.goods_id;
        var l = t.cancel;
        var p = t.pic;
        r.setData({
            status: i,
            isshare: o,
            finsh: s,
            iscomment: d,
            order_id: n,
            goods_id: c,
            group_id: u,
            cancel: l,
            pic: p,
            title: e
        });
    },
    showDetail: function a(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../goods/detail/detail?objectId=" + e
        });
    },
    cancel: function a(t) {
        var e = t.currentTarget.dataset.id;
        var r = t.currentTarget.dataset.index;
        var n = this;
        wx.showModal({
            title: "提示",
            showCancel: true,
            content: "确定取消订单吗？",
            success: function a(t) {
                if (t.confirm) {
                    app.util.request({
                        url: "entry/wxapp/Cancelorder",
                        method: "post",
                        dataType: "json",
                        data: {
                            order_id: e
                        },
                        success: function a(t) {
                            n.setData({
                                cancel: 1
                            });
                        }
                    });
                }
            }
        });
    },
    returnM: function a(t) {
        var e = t.currentTarget.dataset.id;
        var r = t.currentTarget.dataset.phone;
        var n = t.currentTarget.dataset.money;
        var i = t.currentTarget.dataset.status;
        a: wx.navigateTo({
            url: "../return/return?order_id=" + e + "&phone=" + r + "&money=" + n + "&status=" + i
        });
    },
    shipping: function a(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../shipping/shipping?order_id=" + e
        });
    },
    onShow: function a() {
        var t = this;
        var e = t.data.order_id;
        app.util.request({
            url: "entry/wxapp/orderdetail",
            method: "get",
            dataType: "json",
            data: {
                order_id: e
            },
            success: function a(e) {
                t.setData({
                    detail: e.data.data
                });
            }
        });
    },
    delorder: function a(t) {
        var e = t.currentTarget.dataset.id;
        var r = this;
        app.util.request({
            url: "entry/wxapp/deleteorder",
            method: "post",
            dataType: "json",
            data: {
                order_id: e
            },
            success: function a(t) {
                wx.showToast({
                    title: t.data.message,
                    icon: "success"
                });
                wx.navigateTo({
                    url: "../list/list"
                });
            }
        });
    },
    gopay: function a(t) {
        var e = t.currentTarget.dataset.id;
        var r = this;
        app.util.request({
            url: "entry/wxapp/gopay",
            method: "post",
            dataType: "json",
            data: {
                order_id: e
            },
            success: function a(t) {
                console.log(t);
                r.setData({
                    payData: t.data.data
                });
                r.pay();
            }
        });
    },
    pay: function a() {
        var t = this.data.payData;
        wx.requestPayment({
            timeStamp: "" + t.timeStamp,
            nonceStr: t.nonceStr,
            package: t.package,
            signType: "MD5",
            paySign: t.sign,
            success: function a(t) {
                console.log(t);
            },
            fail: function a(t) {
                console.log(t);
                wx.navigateTo({
                    url: "../list/list"
                });
            }
        });
    },
    comment: function a(t) {
        var e = t.currentTarget.dataset.id;
        var r = t.currentTarget.dataset.orderid;
        var n = this.data.pic;
        wx.navigateTo({
            url: "../../member/evaluate/evaluate?id=" + e + "&orderid=" + r + "&pic=" + n
        });
    }
}, _defineProperty(_Page, "showDetail", function a(t) {
    var e = t.currentTarget.dataset.id;
    wx.navigateTo({
        url: "../../goods/detail/detail?objectId=" + e
    });
}), _defineProperty(_Page, "call", function a() {
    var t = this.data.detail;
    wx.makePhoneCall({
        phoneNumber: t.telnumber
    });
}), _defineProperty(_Page, "onShareAppMessage", function a(t) {
    if (t.from === "menu") {
        var e = getApp().globalData.share_title;
        return {
            title: e,
            path: "/hc_groups/pages/index/index",
            success: function a(t) {}
        };
        return false;
    }
    if (t.from === "button") {
        var r = t.target.dataset.id;
        var n = t.target.dataset.goodsid;
        var i = t.target.dataset.groupid;
        var o = this;
        var e = getApp().globalData.share_title;
        console.log(e);
        console.log(r);
        return {
            title: e,
            path: "/hc_groups/pages/goods/shareDetails/shareDetails?objectId=" + n + "&groupid=" + i,
            success: function a(t) {}
        };
    }
}), _Page));