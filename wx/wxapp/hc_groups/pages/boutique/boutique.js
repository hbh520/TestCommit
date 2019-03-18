var app = getApp();

var pageNum = 1;

Page({
    data: {
        getnewList: []
    },
    onLoad: function t(a) {
        this.gettimegoods();
        this.getnewgoods();
        var e = getApp().globalData.shop_name;
        wx.setNavigationBarTitle({
            title: e
        });
    },
    gettimegoods: function t() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/gettimegoods",
            method: "post",
            dataType: "json",
            success: function t(e) {
                a.setData({
                    gettimegoods: e.data.data
                });
            }
        });
    },
    getnewgoods: function t() {
        var a = this;
        var e = a.data.getnewList;
        app.util.request({
            url: "entry/wxapp/getnewgoods",
            method: "post",
            dataType: "json",
            data: {
                page: pageNum
            },
            success: function t(o) {
                var s = o.data.data;
                for (var g in s) {
                    e.push(s[g]);
                }
                if (s.length != 0) {
                    pageNum++;
                }
                a.setData({
                    getnewgoods: e
                });
            }
        });
    },
    onReachBottom: function t() {
        var a = this;
        a.getnewgoods();
    },
    showDetail: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../goods/detail/detail?objectId=" + e
        });
    }
});