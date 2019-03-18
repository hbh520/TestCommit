var _Page;

function _defineProperty(e, t, n) {
    if (t in e) {
        Object.defineProperty(e, t, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        e[t] = n;
    }
    return e;
}

var app = getApp();

var pageNum = 1;

Page((_Page = {
    data: {
        comments: []
    },
    onLoad: function e(t) {
        var n = t.id;
        this.getComment(n);
    },
    getComment: function e(t) {
        var n = this;
        var a = n.data.comments;
        app.util.request({
            url: "entry/wxapp/Getcomment",
            method: "get",
            dataType: "json",
            data: {
                goods_id: t,
                page: pageNum
            },
            success: function e(t) {
                console.log(t.data.data);
                var o = t.data.data;
                for (var r in o) {
                    a.push(o[r]);
                }
                if (a.length != 0) {
                    pageNum++;
                }
                n.setData({
                    comment: a
                });
            }
        });
    },
    onReachBottom: function e() {
        var t = this;
        t.getComment();
    },
    onReady: function e() {},
    onShow: function e() {},
    onHide: function e() {},
    onUnload: function e() {},
    onPullDownRefresh: function e() {}
}, _defineProperty(_Page, "onReachBottom", function e() {}), _defineProperty(_Page, "onShareAppMessage", function e() {}), 
_Page));