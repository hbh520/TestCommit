var app = getApp();

Page({
    data: {},
    showDetail: function t(a) {
        var o = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../goods/detail/detail?objectId=" + o
        });
    },
    onLoad: function t(a) {
        this.goods(a.types);
        var o = getApp().globalData.shop_name;
        wx.setNavigationBarTitle({
            title: o
        });
    },
    goods: function t(a) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/seaamoy",
            method: "post",
            dataType: "json",
            data: {
                types: a
            },
            success: function t(a) {
                console.log(a);
                o.setData({
                    goods: a.data.data
                });
            }
        });
    },
    onShow: function t() {}
});