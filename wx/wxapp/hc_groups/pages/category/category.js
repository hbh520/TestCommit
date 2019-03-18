var app = getApp();

Page({
    data: {
        subCategories: [],
        highlight: [ "highlight", "", "", "", "", "", "", "", "", "", "", "" ],
        banner: "",
        scrollTop: 0
    },
    onLoad: function t() {
        this.getTopCategory();
        var a = app.globalData.screenHeight - 56;
        console.log(a);
        this.setData({
            screenHeight: a
        });
    },
    clickBanner: function t(a) {
        var e = a.currentTarget.dataset.goodsId;
        wx.navigateTo({
            url: "../goods/detail/detail?objectId=" + e
        });
    },
    categoods: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../category/categorygoods/categorygoods?parentid=" + e
        });
    },
    search: function t(a) {
        wx.navigateTo({
            url: "../search/index"
        });
    },
    allgoods: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../category/allgoods/allgoods?parentid=" + e
        });
    },
    tapTopCategory: function t(a) {
        var e = a.currentTarget.dataset.id;
        var r = a.currentTarget.dataset.banner;
        var o = parseInt(a.currentTarget.dataset.index);
        this.setHighlight(o);
        this.setData({
            ID: e
        });
    },
    getTopCategory: function t(a) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/getcategory",
            method: "post",
            dataType: "json",
            success: function t(a) {
                var r = a.data.data;
                e.setData({
                    topCategories: r
                });
            }
        });
    },
    setHighlight: function t(a) {
        var e = [];
        for (var r = 0; r < this.data.topCategories; r++) {
            e[r] = "";
        }
        e[a] = "highlight";
        this.setData({
            highlight: e
        });
    },
    showDetail: function t(a) {
        var e = a.currentTarget.dataset.objectId;
        wx.navigateTo({
            url: "../goods/detail/detail?objectId=" + e
        });
    },
    avatarTap: function t(a) {
        var e = a.currentTarget.dataset.objectId;
        wx.navigateTo({
            url: "../../../../goods/detail/detail?objectId=" + e
        });
    }
});