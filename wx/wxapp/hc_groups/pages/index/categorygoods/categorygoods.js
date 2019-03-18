var app = getApp();

Page({
    data: {
        goodsList: [],
        pageNum: 1
    },
    onLoad: function t(a) {
        this.setData({
            theme: a.theme
        });
        var e = getApp().globalData.shop_name;
        wx.setNavigationBarTitle({
            title: e
        });
        this.getCategory(a.theme);
    },
    showDetail: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../goods/detail/detail?objectId=" + e
        });
    },
    getCategory: function t(a) {
        var e = this.data.pageNum;
        var o = this;
        var s = o.data.goodsList;
        app.util.request({
            url: "entry/wxapp/Getthemegoods",
            method: "post",
            dataType: "json",
            data: {
                theme: a,
                page: e
            },
            success: function t(a) {
                var i = a.data.data;
                for (var g in i) {
                    s.push(i[g]);
                }
                if (i.length != 0) {
                    e++;
                }
                o.setData({
                    goodsList: s,
                    pageNum: e
                });
            }
        });
    },
    onReachBottom: function t() {
        var a = this.data.theme;
        this.getCategory(a);
    }
});