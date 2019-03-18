var server = require("../../../utils/server");

var timeout = null;

var exit;

Page({
    data: {
        amount: 0,
        carts: [],
        addressList: [],
        addressIndex: 0,
        height: 0
    },
    addressObjects: [],
    doHandler: function t() {
        if (app.globalData.login) wx.switchTab({
            url: "/pages/member/index/index"
        });
    },
    onShow: function t() {
        if (exit) {
            wx.navigateBack({
                delta: 1,
                success: function t(a) {},
                fail: function t() {},
                complete: function t() {}
            });
        }
    },
    onLoad: function t(a) {
        exit = false;
        var e = this;
        var s = getApp();
        var r = a.cartIds;
        var i = a.amount;
        s.globalData.cartIds = r;
        s.globalData.amount = i;
        this.setData({
            cartIds: r,
            amount: i
        });
        timeout = setTimeout(function t() {
            if (!s.globalData.login) {
                exit = true;
                wx.switchTab({
                    url: "/pages/member/index/index"
                });
            } else {
                var a = s.globalData.userInfo.user_id;
                server.getJSON("/User/getAddressList/user_id/" + a, function(t) {
                    var a = t.data;
                    exit = true;
                    if (a.msg == "没有数据") {
                        wx.navigateTo({
                            url: "../../../../../../address/add/add?returnTo=1"
                        });
                    } else {
                        wx.navigateTo({
                            url: "../ordersubmit/index"
                        });
                    }
                });
            }
        }, 4e3);
        wx.getSystemInfo({
            success: function t(a) {
                e.setData({
                    height: a.windowHeight
                });
            }
        });
    },
    readCarts: function t(a) {
        var e = parseInt(a.amount);
        this.setData({
            amount: e
        });
        var s = a.cartIds;
        var r = s.split(",");
        var i = [];
        for (var n = 0; n < r.length; n++) {
            var o = new AV.Query("Cart");
            o.include("goods");
            o.get(r[n]).then(function(t) {
                i.push(t);
            }, function(t) {});
        }
        this.setData({
            carts: i
        });
    }
});