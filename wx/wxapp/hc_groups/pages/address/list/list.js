var app = getApp();

Page({
    add: function a() {
        wx.navigateTo({
            url: "../add/add"
        });
    },
    onShow: function a() {
        this.loadData();
    },
    jump: function a() {},
    setDefault: function a(t) {
        var e = this;
        var s = parseInt(t.currentTarget.dataset.index);
        var d = e.data.addresslist;
        for (var r = 0; r < d.length; r++) {
            d[r].is_default = r == s;
        }
        var i = getApp().globalData.user_id;
        var n = d[s].id;
        app.util.request({
            url: "entry/wxapp/Setdefaultaddress",
            method: "post",
            dataType: "json",
            data: {
                address_id: n
            },
            success: function a(t) {
                if (t.data.errno == 0) {
                    for (var r in d) {
                        d[r].isdefault = 0;
                    }
                    d[s].isdefault = 1;
                    e.setData({
                        addresslist: d
                    });
                }
                wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    edit: function a(t) {
        var e = this;
        var s = parseInt(t.currentTarget.dataset.index);
        var d = this.data.addresslist[s].id;
        wx.navigateTo({
            url: "../edit/index?objectId=" + d
        });
    },
    delete: function a(t) {
        var e = this;
        var s = parseInt(t.currentTarget.dataset.index);
        var d = e.data.addresslist[s];
        var r = getApp().globalData.user_id;
        var i = d.id;
        wx.showModal({
            title: "确认",
            content: "要删除这个地址吗？",
            success: function a(t) {
                if (t.confirm) {
                    app.util.request({
                        url: "entry/wxapp/Deladdress",
                        method: "post",
                        dataType: "json",
                        data: {
                            address_id: i,
                            user_id: r
                        },
                        success: function a(t) {
                            wx.showToast({
                                title: t.data.message,
                                icon: "success",
                                duration: 2e3
                            });
                            e.loadData();
                        }
                    });
                }
            }
        });
    },
    loadData: function a() {
        var t = this;
        var e = getApp().globalData.user_id;
        app.util.request({
            url: "entry/wxapp/Addresslist",
            method: "post",
            dataType: "json",
            data: {
                user_id: e
            },
            success: function a(e) {
                console.log(e);
                t.setData({
                    addresslist: e.data.data
                });
            }
        });
    }
});