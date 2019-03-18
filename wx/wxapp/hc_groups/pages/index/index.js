var app = getApp();

Page({
    data: {
        userInfo: {},
        device: null,
        homeurl: "",
        config: null,
        goods: [],
        photos: [],
        getcategoryList: [],
        height: [ "height", "", "", "", "", "", "", "", "", "", "", "" ],
        tab: [ "首页", "男装", "女装", "水果", "电器", "手机", "装饰" ],
        pageNum: 1,
        show: false,
        canIUse: wx.canIUse("scroll-view.scroll-with-animation")
    },
    click: function t(a) {
        var e = a.currentTarget.dataset.index;
        var o = a.currentTarget.dataset.id;
        var s = this.data.category;
        var r = this.data.getcategoryList;
        var n = e / s.length * 375;
        if (e >= 2) {
            this.setData({
                moveleft: n
            });
        } else {
            this.setData({
                moveleft: 0
            });
        }
        if (e == 0) {
            this.setData({
                show: false
            });
        } else {
            this.setData({
                show: true
            });
        }
        var i = [];
        i[e] = "height";
        this.setData({
            height: i,
            getcategoryList: [],
            navcategory: s[e],
            id: s[e].id,
            pageNum: 1
        });
        this.getcategorys(o);
    },
    navgoods: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../index/navGoods/navGoods?parentid=" + e
        });
    },
    allcategoods: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../category/allgoods/allgoods?parentid=" + e
        });
    },
    categoods: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../category/categorygoods/categorygoods?parentid=" + e
        });
    },
    onLoad: function t(a) {
        var e = this;
        var o = app.globalData.screenWidth;
        console.log(o);
        e.setData({
            windowWidth: o / 5
        });
        app.getUserInfo(function() {
            app.register();
        });
        e.getHome();
        e.getcategory();
        e.getTitle();
        e.getgoods();
    },
    scroll: function t(a) {
        var e = a.detail.scrollLeft;
        if (e >= 40) {
            e = 40;
        } else {
            e = 0;
        }
        this.setData({
            moveWidth: e
        });
    },
    getcategory: function t() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Getindexcategory",
            method: "post",
            dataType: "json",
            success: function t(e) {
                a.setData({
                    category: e.data.data
                });
            }
        });
    },
    getTitle: function t() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/config",
            method: "post",
            dataType: "json",
            success: function t(a) {
                console.log(a);
                wx.setNavigationBarTitle({
                    title: a.data.data.shop_name
                });
                getApp().globalData.shop_name = a.data.data.shop_name;
                getApp().globalData.share_title = a.data.data.share_title;
            }
        });
    },
    getHome: function t() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/getheader",
            method: "post",
            dataType: "json",
            success: function t(e) {
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
    getcategorys: function t(a) {
        var e = this.data.pageNum;
        var o = this;
        var s = o.data.getcategoryList;
        app.util.request({
            url: "entry/wxapp/Getindexcategorygoods",
            method: "get",
            dataType: "json",
            data: {
                parentid: a,
                page: e
            },
            success: function t(a) {
                var r = a.data.data;
                for (var n in r) {
                    s.push(r[n]);
                }
                if (s.length != 0) {
                    e++;
                }
                o.setData({
                    categorygoods: s,
                    pageNum: e
                });
            }
        });
    },
    getgoods: function t() {
        var a = this.data.pageNum;
        var e = this;
        var o = e.data.goods;
        app.util.request({
            url: "entry/wxapp/getindexgoods",
            method: "post",
            dataType: "json",
            data: {
                page: a
            },
            success: function t(s) {
                var r = s.data.data;
                for (var n in r) {
                    o.push(r[n]);
                }
                if (r.length != 0) {
                    a++;
                }
                e.setData({
                    hotgoods: o,
                    pageNum: a
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
        var e = getApp().globalData.share_title;
        console.log(e);
        return {
            title: e,
            path: "/hc_groups/pages/index/index"
        };
    }
});