App({
    onLaunch: function t() {
        var e = this;
        wx.getSystemInfo({
            success: function t(a) {
                e.globalData.screenWidth = a.windowWidth;
                e.globalData.screenHeight = a.windowHeight;
                wx.setStorageSync("passwd_sys", {
                    width: a.windowWidth,
                    height: a.windowHeight
                });
            }
        });
    },
    onError: function t(e) {},
    util: require("we7/resource/js/util.js"),
    globalData: {
        userInfo: null,
        device: {},
        shop_name: null,
        width: null,
        height: null
    },
    getUserInfo: function t(e) {
        var a = this;
        if (this.globalData.userInfo) {
            typeof e == "function" && e(this.globalData.userInfo);
        } else {
            wx.login({
                success: function t(n) {
                    wx.getUserInfo({
                        success: function t(o) {
                            var i = o.userInfo;
                            a.globalData.userInfo = i;
                            i["act"] = "autologin";
                            i["code"] = n.code;
                            a.util.request({
                                url: "entry/wxapp/getopenid",
                                method: "post",
                                dataType: "json",
                                data: i,
                                success: function t(n) {
                                    if (n.data.errno == 0) {
                                        i["openid"] = n.data.data;
                                        a.globalData.userInfo = i;
                                        typeof e == "function" && e(a.globalData.userInfo);
                                    }
                                }
                            });
                        },
                        fail: function t(e) {
                            console.log("获取失败");
                        }
                    });
                }
            });
        }
    },
    register: function t(e) {
        var a = this;
        this.getUserInfo(function() {
            var t = a.globalData.userInfo.openid;
            var e = a.globalData.userInfo;
            var n = e.country;
            var o = e.city;
            var i = e.gender;
            var s = e.nickName;
            var r = e.province;
            var u = e.avatarUrl;
            a.util.request({
                url: "entry/wxapp/getuserinfo",
                method: "post",
                dataType: "json",
                data: {
                    openid: t,
                    nickname: s,
                    gender: i,
                    country: n,
                    province: r,
                    city: o,
                    avatar: u
                },
                success: function t(e) {
                    a.globalData.user_id = e.data.data;
                }
            });
        });
    },
    siteInfo: require("siteinfo.js")
});