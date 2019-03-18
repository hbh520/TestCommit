var _Page;

function _defineProperty(e, t, a) {
    if (t in e) {
        Object.defineProperty(e, t, {
            value: a,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        e[t] = a;
    }
    return e;
}

var app = getApp();

var maxTime = 60;

var interval = null;

var currentTime = -1;

Page((_Page = {
    data: {
        login: false,
        time: "获取验证码"
    },
    onLoad: function e(t) {
        var a = this;
        wx.getSystemInfo({
            success: function e(t) {
                a.setData({
                    height: t.windowHeight
                });
            }
        });
    },
    refund: function e() {
        wx.navigateTo({
            url: "../refund/refund"
        });
    },
    getNum: function e() {
        var t = app.globalData.user_id;
        var a = this;
        app.util.request({
            url: "entry/wxapp/Getorderstatusnum",
            method: "post",
            dataType: "json",
            data: {
                user_id: t
            },
            success: function e(t) {
                a.setData({
                    orderNum: t.data.data
                });
            }
        });
    },
    onShow: function e() {
        var t = this;
        var a = app.globalData.login;
        this.setData({
            login: a
        });
        wx.getUserInfo({
            success: function e(a) {
                var n = a.userInfo;
                t.setData({
                    userInfo: n
                });
            },
            fail: function e(t) {}
        });
        t.getNum();
    },
    openSetting: function e() {
        var t = this;
        if (wx.openSetting) {
            wx.openSetting({
                success: function e(t) {}
            });
        } else {
            wx.showModal({
                title: "授权提示",
                content: "小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮"
            });
        }
    },
    call: function e(t) {
        var a = "13923422626";
        wx.makePhoneCall({
            phoneNumber: a,
            success: function e(t) {}
        });
    },
    navigateToCoupon: function e() {
        wx.navigateTo({
            url: "../coupon/index"
        });
    },
    navigateToEvaluate: function e() {
        wx.navigateTo({
            url: "../evaluate/evaluate"
        });
    },
    navigateToPoint: function e() {
        wx.navigateTo({
            url: "../point/point"
        });
    },
    song: function e() {
        wx.navigateTo({
            url: "../songka/songka"
        });
    },
    navigateToCollect: function e() {
        wx.navigateTo({
            url: "../collect/collect"
        });
    }
}, _defineProperty(_Page, "navigateToEvaluate", function e() {
    wx.navigateTo({
        url: "../evaluate/evaluate"
    });
}), _defineProperty(_Page, "navigateToMoney", function e() {
    wx.navigateTo({
        url: "../money/money"
    });
}), _defineProperty(_Page, "navigateToOrder", function e(t) {
    var a = t.currentTarget.dataset.cid;
    wx.navigateTo({
        url: "../../order/list/list?cid=" + a
    });
}), _defineProperty(_Page, "navigateToAddress", function e() {
    wx.navigateTo({
        url: "../../address/list/list"
    });
}), _defineProperty(_Page, "navigateToAddressAboutus", function e() {
    wx.navigateTo({
        url: "/pages/member/aboutus/aboutus"
    });
}), _Page));