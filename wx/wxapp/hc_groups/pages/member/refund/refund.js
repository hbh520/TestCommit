var app = getApp();

Page({
    data: {
        goodsList: [],
        pageNum: 1
    },
    onLoad: function a(t) {
        var e = this.data.pageNum;
        this.Refundlist(e);
    },
    datail: function a(t) {
        var e = t.currentTarget.dataset.id;
        var i = t.currentTarget.dataset.status;
        wx.navigateTo({
            url: "../refund/detail/detail?id=" + e + "&status=" + i
        });
    },
    moneyGo: function a(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../refund/detail/moneyGo?id=" + e
        });
    },
    Refundlist: function a(t) {
        var e = this;
        var i = getApp().globalData.user_id;
        var n = e.data.goodsList;
        console.log(t);
        app.util.request({
            url: "entry/wxapp/Refundlist",
            data: {
                user_id: i,
                page: t
            },
            success: function a(i) {
                var s = i.data.data;
                if (s.length != 0) {
                    for (var r = 0; r < s.length; r++) {
                        n.push(s[r]);
                    }
                    t++;
                }
                console.log(t);
                e.setData({
                    refundlist: n,
                    pageNum: t
                });
            }
        });
    },
    onReachBottom: function a() {
        var t = this.data.pageNum;
        this.Refundlist(t);
    }
});