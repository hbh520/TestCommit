Page({
    data: {},
    detail: function n() {
        wx.navigateTo({
            url: "detail/detail"
        });
    },
    onLoad: function n(o) {},
    onReady: function n() {},
    onShow: function n() {},
    onHide: function n() {},
    onUnload: function n() {},
    onPullDownRefresh: function n() {},
    onReachBottom: function n() {},
    onShareAppMessage: function n(o) {
        if (o.from === "button") {
            console.log(o.target);
        }
        return {
            title: "自定义转发标题",
            path: "/page/user?id=123",
            success: function n(o) {},
            fail: function n(o) {}
        };
    }
});