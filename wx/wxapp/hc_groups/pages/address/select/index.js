Page({
    add: function a() {
        wx.navigateTo({
            url: "../add/add"
        });
    },
    onShow: function a() {
        this.loadData();
    },
    setDefault: function a(t) {
        var e = this;
        var s = parseInt(t.currentTarget.dataset.index);
        var d = e.data.addressObjects;
        for (var r = 0; r < d.length; r++) {
            d[r].is_default = r == s;
        }
        var i = getApp().globalData.userInfo.user_id;
        var n = d[s].address_id;
        server.getJSON("/User/setDefaultAddress/user_id/" + i + "/address_id/" + n, function(a) {
            if (a.data.status == 1) {
                e.setData({
                    addressObjects: d
                });
            }
        });
    },
    edit: function a(t) {
        var e = this;
        var s = parseInt(t.currentTarget.dataset.index);
        var d = this.data.addressObjects[s].address_id;
        wx.navigateTo({
            url: "../edit/index?objectId=" + d
        });
    },
    delete: function a(t) {
        var e = this;
        var s = parseInt(t.currentTarget.dataset.index);
        var d = e.data.addressObjects[s];
        wx.showModal({
            title: "确认",
            content: "要删除这个地址吗？",
            success: function a(t) {
                if (t.confirm) {
                    server.getJSON("/User/del_address/user_id/" + user_id + "/id/" + address_id, function(a) {
                        wx.showToast({
                            title: a.data.msg,
                            icon: "success",
                            duration: 2e3
                        });
                        e.loadData();
                    });
                }
            }
        });
    },
    loadData: function a() {
        var t = this;
        var e = getApp().globalData.userInfo.user_id;
        server.getJSON("/User/getAddressList/user_id/" + e, function(a) {
            var e = a.data.result;
            t.setData({
                addressObjects: e
            });
        });
    }
});