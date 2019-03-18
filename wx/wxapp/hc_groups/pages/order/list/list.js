var _Page;

function _defineProperty(t, a, e) {
    if (a in t) {
        Object.defineProperty(t, a, {
            value: e,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        t[a] = e;
    }
    return t;
}

var cPage = 1;

var ctype = "";

var app = getApp();

Page((_Page = {
    data: {
        orders: [],
        trudase: false,
        tabClasss: [ "text-select", "text-normal", "text-normal", "text-normal", "text-normal", "text-normal" ]
    },
    comment: function t(a) {
        var e = a.currentTarget.dataset.id;
        var r = a.currentTarget.dataset.orderid;
        var s = a.currentTarget.dataset.pic;
        wx.navigateTo({
            url: "../../member/evaluate/evaluate?id=" + e + "&orderid=" + r + "&pic=" + s
        });
    },
    getTitle: function t() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/config",
            method: "post",
            dataType: "json",
            success: function t(a) {
                wx.setNavigationBarTitle({
                    title: a.data.data.shop_name
                });
            }
        });
    },
    tabClick: function t(a) {
        var e = a.currentTarget.dataset.index;
        var r = [ "", "WAIT_PAY", "WAIT_SHARE", "WAIT_SEND", "WAIT_GET", "WAIT_COMMENT" ];
        var s = [ "text-normal", "text-normal", "text-normal", "text-normal", "text-normal", "text-normal" ];
        s[e] = "text-select";
        this.setData({
            tabClasss: s,
            tab: e
        });
        cPage = 1;
        ctype = r[e];
        this.data.orders = [];
        this.getOrderLists(r[e], cPage);
        if (e == 2) {
            var n = this.data.trudase;
            this.setData({
                trudase: true
            });
        } else {
            this.setData({
                trudase: false
            });
        }
    },
    delorder: function t(a) {
        var e = a.currentTarget.dataset.id;
        var r = a.currentTarget.dataset.index;
        var s = this;
        var n = s.data.orders;
        app.util.request({
            url: "entry/wxapp/deleteorder",
            method: "post",
            dataType: "json",
            data: {
                order_id: e
            },
            success: function t(a) {
                console.log(a);
                n.splice(r, 1);
                s.setData({
                    orders: n
                });
                wx.showToast({
                    title: a.data.message,
                    icon: "success"
                });
            }
        });
    },
    gopay: function t(a) {
        var e = a.currentTarget.dataset.id;
        var r = this;
        app.util.request({
            url: "entry/wxapp/gopay",
            method: "get",
            dataType: "json",
            data: {
                order_id: e
            },
            success: function t(a) {
                console.log(a);
                r.setData({
                    payData: a.data.data
                });
                r.pay();
            }
        });
    },
    pay: function t() {
        var a = this.data.payData;
        wx.requestPayment({
            timeStamp: "" + a.timeStamp,
            nonceStr: a.nonceStr,
            package: a.package,
            signType: "MD5",
            paySign: a.sign,
            success: function t(a) {
                console.log(a);
            },
            fail: function t(a) {
                console.log(a);
                wx.navigateTo({
                    url: "../list/list"
                });
            }
        });
    },
    shipping: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../shipping/shipping?order_id=" + e
        });
    },
    cancel: function t(a) {
        var e = a.currentTarget.dataset.id;
        var r = a.currentTarget.dataset.index;
        var s = this;
        wx.showModal({
            title: "提示",
            showCancel: true,
            content: "确定取消订单吗？",
            success: function t(a) {
                if (a.confirm) {
                    app.util.request({
                        url: "entry/wxapp/Cancelorder",
                        method: "post",
                        dataType: "json",
                        data: {
                            order_id: e
                        },
                        success: function t(a) {
                            s.data.orders[r].cancel = 1;
                            console.log(s.data.orders);
                            s.setData({
                                orders: s.data.orders
                            });
                        }
                    });
                }
            }
        });
    },
    confirm: function t(a) {
        var e = a.currentTarget.dataset.id;
        var r = a.currentTarget.dataset.index;
        var s = this;
        wx.showModal({
            title: "提示",
            showCancel: true,
            content: "确定已收货吗？",
            success: function t(a) {
                if (a.confirm) {
                    app.util.request({
                        url: "entry/wxapp/finishorder",
                        method: "get",
                        dataType: "json",
                        data: {
                            order_id: e
                        },
                        success: function t(a) {
                            s.data.orders[r].finsh = 1;
                            s.setData({
                                orders: s.data.orders
                            });
                        }
                    });
                }
            }
        });
    },
    orderDetail: function t(a) {
        var e = a.currentTarget.dataset.id;
        var r = a.currentTarget.dataset.status;
        var s = a.currentTarget.dataset.isshare;
        var n = a.currentTarget.dataset.finsh;
        var o = a.currentTarget.dataset.iscomment;
        var i = a.currentTarget.dataset.groupid;
        var d = a.currentTarget.dataset.goodsid;
        var c = a.currentTarget.dataset.pic;
        var l = a.currentTarget.dataset.cancel;
        wx.navigateTo({
            url: "../details/index?order_id=" + e + "&status=" + r + "&isshare=" + s + "&finsh=" + n + "&iscomment=" + o + "&goods_id=" + d + "&group_id=" + i + "&pic=" + c + "&cancel=" + l
        });
    },
    onReachBottom: function t() {
        this.getOrderLists(ctype, ++cPage);
        wx.showToast({
            title: "加载中",
            icon: "loading"
        });
    },
    onPullDownRefresh: function t() {
        this.data.orders = [];
        this.getOrderLists(ctype, 1);
    },
    getOrderLists: function t(a, e) {
        var r = this;
        var s = getApp().globalData.user_id;
        var n = r.data.orders;
        app.util.request({
            url: "entry/wxapp/Getorderlist",
            method: "get",
            dataType: "json",
            data: {
                user_id: s,
                status: a,
                page: e
            },
            success: function t(a) {
                var e = a.data.data;
                for (var s in e) {
                    e[s]["cancel"] = 0;
                    e[s]["finsh"] = 0;
                }
                if (e.length != 0) {
                    for (var s in e) {
                        n.push(e[s]);
                    }
                }
                console.log(n);
                wx.stopPullDownRefresh();
                r.setData({
                    orders: n
                });
            }
        });
    },
    onShow: function t() {
        this.data.orders = [];
        this.getOrderLists(ctype, 1);
    },
    showDetail: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../goods/detail/detail?objectId=" + e
        });
    }
}, _defineProperty(_Page, "getTitle", function t() {
    var a = this;
    app.util.request({
        url: "entry/wxapp/config",
        method: "post",
        dataType: "json",
        success: function t(e) {
            a.setData({
                title: e.data.data.shop_name
            });
            getApp().globalData.shop_name = e.data.data.shop_name;
        }
    });
}), _defineProperty(_Page, "onLoad", function t(a) {
    this.getTitle();
    if (a.cid == "WAIT_PAY") {
        var e = [ "text-normal", "text-select", "text-normal", "text-normal", "text-normal", "text-normal" ];
        this.setData({
            tabClasss: e
        });
    }
    if (a.cid == "WAIT_SEND") {
        var e = [ "text-normal", "text-normal", "text-normal", "text-select", "text-normal", "text-normal" ];
        this.setData({
            tabClasss: e
        });
    }
    if (a.cid == "WAIT_COMMENT") {
        var e = [ "text-normal", "text-normal", "text-normal", "text-normal", "text-normal", "text-select" ];
        this.setData({
            tabClasss: e
        });
    }
    if (a.cid == "WAIT_GET") {
        var e = [ "text-normal", "text-normal", "text-normal", "text-normal", "text-select", "text-normal" ];
        this.setData({
            tabClasss: e
        });
    }
    if (a.cid == "WAIT_SHARE") {
        var e = [ "text-normal", "text-normal", "text-select", "text-normal", "text-normal", "text-normal" ];
        this.setData({
            tabClasss: e
        });
    }
    cPage = 1;
    ctype = a.cid;
    this.data.orders = [];
}), _defineProperty(_Page, "onShareAppMessage", function t(a) {
    if (a.from === "menu") {
        var e = getApp().globalData.share_title;
        return {
            title: e,
            path: "/hc_groups/pages/index/index",
            success: function t(a) {}
        };
        return false;
    }
    if (a.from === "button") {
        var r = a.target.dataset.id;
        var s = a.target.dataset.goodsid;
        var n = a.target.dataset.groupid;
        var o = a.target.dataset.index;
        var i = this;
        var e = getApp().globalData.share_title;
        console.log(e);
        console.log(r);
        return {
            title: e,
            path: "/hc_groups/pages/goods/shareDetails/shareDetails?objectId=" + s + "&groupid=" + n,
            success: function t(a) {}
        };
    }
}), _Page));