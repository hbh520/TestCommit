var app = getApp();

Page({
    data: {
        show: true
    },
    bindChange: function t(a) {
        var e = a.detail.value;
        this.setData({
            keywords: e
        });
    },
    onLoad: function t(a) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/getkeywords",
            method: "post",
            dataType: "json",
            success: function t(a) {
                e.setData({
                    getkeywords: a.data.data
                });
            }
        });
    },
    showDetail: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../goods/detail/detail?objectId=" + e
        });
    },
    search: function t(a) {
        var e = this;
        var s = this.data.keywords;
        app.util.request({
            url: "entry/wxapp/searchgoods",
            method: "post",
            dataType: "json",
            data: {
                keywords: s
            },
            success: function t(a) {
                console.log(a);
                e.setData({
                    goodsList: a.data.data,
                    show: false
                });
            }
        });
    },
    search1: function t(a) {
        var e = a.currentTarget.dataset.index;
        var s = this.data.getkeywords[e].title;
        var o = this;
        app.util.request({
            url: "entry/wxapp/searchgoods",
            method: "post",
            dataType: "json",
            data: {
                keywords: s
            },
            success: function t(a) {
                console.log(a);
                o.setData({
                    goodsList: a.data.data,
                    keywords: s,
                    show: false
                });
            }
        });
    },
    click: function t(a) {
        var e = a.currentTarget.dataset.word;
        wx.navigateTo({
            url: "../../../../goods/list/list?keywords=" + e
        });
    }
});