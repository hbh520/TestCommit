var app = getApp();

var pageNum = 1;

Page({
    data: {
        userInfo: {},
        device: null,
        homeurl: "",
        config: null,
        goods: [],
        photos: [],
        height: [ "height", "", "", "", "", "", "", "", "", "", "", "" ],
        tab: [ "首页", "男装", "女装", "水果", "电器", "手机", "装饰" ]
    },
    click: function t(a) {
        var e = a.currentTarget.dataset.index;
        var o = [];
        o[e] = "height";
        this.setData({
            height: o
        });
    },
    onLoad: function t(a) {
        var e = this;
        e.getHome();
        e.getgoods();
        app.getUserInfo(function() {
            app.register();
        });
    },
    getHome: function t() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/getheader",
            method: "post",
            dataType: "json",
            success: function t(e) {
                console.log(e);
                a.setData({
                    banner: e.data.data.banner,
                    nav: e.data.data.nav
                });
            }
        });
    },
    allgoods: function t(a) {
        var e = a.currentTarget.dataset.theme;
        wx.navigateTo({
            url: "../index/categorygoods/categorygoods?theme=" + e
        });
    },
    getgoods: function t() {
        var a = this;
        var e = a.data.goods;
        app.util.request({
            url: "entry/wxapp/getindexgoods",
            method: "post",
            dataType: "json",
            data: {
                page: pageNum
            },
            success: function t(o) {
                var n = o.data.data;
                for (var s in n) {
                    e.push(n[s]);
                }
                if (n.length != 0) {
                    pageNum++;
                }
                a.setData({
                    hotgoods: e
                });
            }
        });
    },
    onReachBottom: function t() {
        var a = this;
        a.getgoods();
    },
    showDetail: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../goods/detail/detail?objectId=" + e
        });
    },
    onShareAppMessage: function t(a) {
        var e = this;
        if (a.from === "button") {
            console.log(a.target);
        }
        return {
            title: e.data.config.share,
            path: "/page/user?id=123",
            success: function t(a) {},
            fail: function t(a) {}
        };
    }
});