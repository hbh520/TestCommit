var app = getApp();

var pageNum = 1;

Page({
    data: {
        goodsList: []
    },
    countdown: function t(a) {
        var o = this;
        var e = a || [];
        var i = new Date().getTime() / 1e3;
        i = parseInt(i);
        var n = e - i || [];
        var r = o.dateformat(n);
        var s = r.split(":");
        o.setData({
            clock: s,
            second: n
        });
        setTimeout(function() {
            n -= 1;
            o.countdown(a);
        }, 1e3);
    },
    dateformat: function t(a) {
        var o = Math.floor(a);
        var e = Math.floor(o / 3600);
        if (e < 10) {
            e = "0" + e;
        }
        var i = Math.floor(o / 60 % 60);
        if (i < 10) {
            i = "0" + i;
        }
        var n = Math.floor(o % 60);
        if (n < 10) {
            n = "0" + n;
        }
        return e + ":" + i + ":" + n + "";
    },
    onLoad: function t(a) {
        this.globalhot();
        this.gettime();
        var o = getApp().globalData.shop_name;
        wx.setNavigationBarTitle({
            title: o
        });
    },
    gettime: function t() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Jpintoimage",
            method: "post",
            dataType: "json",
            data: {
                page: pageNum
            },
            success: function t(o) {
                var e = o.data.data.timelimit.timelimittime;
                a.setData({
                    timegoods: o.data.data
                });
                a.countdown(e);
            }
        });
    },
    showDetail: function t(a) {
        var o = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../goods/detail/detail?objectId=" + o
        });
    },
    globalhot: function t() {
        var a = this;
        var o = a.data.goodsList;
        app.util.request({
            url: "entry/wxapp/globalhot",
            method: "post",
            dataType: "json",
            data: {
                page: pageNum
            },
            success: function t(e) {
                var i = e.data.data;
                for (var n in i) {
                    o.push(i[n]);
                }
                if (i.length != 0) {
                    pageNum++;
                }
                a.setData({
                    hotGoods: o
                });
            }
        });
    },
    jump: function t(a) {
        var o = a.currentTarget.dataset.types;
        var e = this.data.second;
        console.log(e);
        wx.navigateTo({
            url: "../newsGoods/index/index?types=" + o + "&second" + e
        });
    },
    onReachBottom: function t() {
        var a = this;
        a.globalhot();
    }
});