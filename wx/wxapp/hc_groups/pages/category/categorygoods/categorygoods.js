var app = getApp();

Page({
    data: {
        pageNum: 1,
        goodsList: [],
        height: [ "height", "", "", "", "", "", "", "", "", "", "", "" ]
    },
    showDetail: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../goods/detail/detail?objectId=" + e
        });
    },
    click: function t(a) {
        var e = a.currentTarget.dataset.index;
        var o = a.currentTarget.dataset.id;
        var r = [];
        r[e] = "height";
        this.setData({
            height: r,
            pageNum: 1,
            goodsList: [],
            parentId: o
        });
        var g = this.data.pageNum;
        this.getCategory(o, g);
    },
    onLoad: function t(a) {
        this.getTopCategory(a.parentid);
        var e = getApp().globalData.shop_name;
        wx.setNavigationBarTitle({
            title: e
        });
    },
    getTopCategory: function t(a) {
        var e = this.data.pageNum;
        var o = this;
        app.util.request({
            url: "entry/wxapp/getcategorygoods",
            method: "get",
            dataType: "json",
            data: {
                parentid: a,
                types: "category"
            },
            success: function t(a) {
                var r = a.data.data;
                o.setData({
                    topCategories: r,
                    parentId: r[0].id
                });
                o.getCategory(r[0].id, e);
            }
        });
    },
    getCategory: function t(a, e) {
        var o = this;
        var r = o.data.goodsList;
        app.util.request({
            url: "entry/wxapp/getcategorygoods",
            method: "get",
            dataType: "json",
            data: {
                parentid: a,
                types: "goods",
                page: e
            },
            success: function t(a) {
                var g = a.data.data;
                for (var i in g) {
                    r.push(g[i]);
                }
                if (g.length != 0) {
                    e++;
                }
                o.setData({
                    goodsList: r,
                    pageNum: e
                });
            }
        });
    },
    onReachBottom: function t() {
        var a = this.data.pageNum;
        var e = this.data.parentId;
        this.getCategory(e, a);
    }
});