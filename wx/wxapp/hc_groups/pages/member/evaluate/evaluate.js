var app = getApp();

var siteinfo = require("../../../../siteinfo.js");

Page({
    data: {
        select: [ true, false, false ],
        noname: [ true ],
        logo: [],
        num: 1,
        photos: [],
        upphotos: [],
        show: false
    },
    upLoadimg: function e() {
        var a = this.data.logo;
        var s = [];
        var t = this;
        var i = t.data.logo;
        for (var r in i) {
            wx.uploadFile({
                url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&t=" + siteinfo.multiid + "&v=" + siteinfo.version + "&from=wxapp&c=entry&a=wxapp&do=Uploadimg&&m=hc_groups",
                filePath: i[r],
                name: "image",
                header: {
                    "Content-Type": "application/json"
                },
                success: function e(a) {
                    var i = JSON.parse(a.data);
                    s.push(i.data);
                    t.globalData.pics = s;
                    t.setData({
                        pics: s
                    });
                },
                fail: function e(a) {}
            });
        }
    },
    longtap: function e(a) {
        var s = a.currentTarget.dataset.index;
        var t = this.data.logo;
        var i = this;
        wx.showModal({
            title: "提示",
            showCancel: true,
            content: "确定删除？",
            success: function e(a) {
                if (a.confirm) {
                    t.splice(s, 1);
                    i.setData({
                        logo: t
                    });
                }
            }
        });
    },
    click: function e(a) {
        var s = a.currentTarget.dataset.index;
        var t = this.data.select;
        for (var i in t) {
            t[i] = false;
        }
        t[s] = true;
        this.setData({
            select: t,
            num: s
        });
    },
    noname: function e(a) {
        var s = a.currentTarget.dataset.index;
        var e = this.data.noname;
        if (e[s] == true) {
            e[s] = false;
        } else {
            e[s] = true;
        }
        this.setData({
            noname: e
        });
    },
    blur: function e(a) {
        var s = a.detail.value;
        this.setData({
            content: s
        });
    },
    formSubmit: function e(a) {
        this.upLoadimg();
        wx.showToast({
            title: "提交中...",
            icon: "success"
        });
        var s = this;
        setTimeout(function() {
            var e = s.data.content;
            if (e == undefined) {
                wx.showToast({
                    title: "请填写评论内容！",
                    icon: "success"
                });
                return false;
            }
            var a = s.data.order_id;
            var t = s.data.kfValue;
            var i = s.data.shipperValue;
            var r = s.data.descValue;
            var o = s.data.num;
            var n = s.data.noname[0];
            if (n == false) {
                n = 1;
            } else {
                n = 0;
            }
            var c = s.globalData.pics;
            app.util.request({
                url: "entry/wxapp/addcomment",
                method: "post",
                dataType: "json",
                data: {
                    content: e,
                    order_id: a,
                    serve_score: t,
                    express_score: i,
                    desc_score: r,
                    level: o,
                    hide_name: n,
                    images: c
                },
                success: function e(a) {
                    wx.showToast({
                        title: a.data.message,
                        icon: "success",
                        duration: 2e3
                    });
                    setTimeout(function e() {
                        wx.navigateBack({
                            delta: 1,
                            success: function e(a) {},
                            fail: function e() {},
                            complete: function e() {}
                        });
                    }, 2e3);
                }
            });
        }, 2e3);
    },
    chooseImageTap: function e() {
        var a = this;
        wx.showActionSheet({
            itemList: [ "从相册中选择", "拍照" ],
            itemColor: "#f7982a",
            success: function e(s) {
                if (!s.cancel) {
                    if (s.tapIndex == 0) {
                        a.chooseWxImage("album");
                    } else if (s.tapIndex == 1) {
                        a.chooseWxImage("camera");
                    }
                }
            }
        });
    },
    globalData: {
        pics: null
    },
    chooseWxImage: function e(a) {
        var s = this;
        var t = this.data.logo;
        var i = this.data.photos;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ a ],
            success: function e(a) {
                for (var i in a.tempFilePaths) {
                    t.push(a.tempFilePaths[i]);
                }
                wx.showToast({
                    title: "长按可删除图片",
                    icon: "success"
                });
                s.setData({
                    logo: t,
                    length: a.tempFilePaths
                });
            }
        });
    },
    onLoad: function e(a) {
        var s = a.goods_name;
        var t = a.goods_id;
        var i = a.orderid;
        var r = a.pic;
        var o = a.image;
        var n = a.spec;
        var c = this.data.select;
        var u = this.data.noname;
        this.setData({
            goods_name: s,
            pic: r,
            noname: u,
            image: o,
            spec: n,
            select: c,
            goods_id: t,
            order_id: i,
            starsDescIMG: "../../../resource/images/stars1.gif",
            hah: "henhao",
            descValue: 1,
            starsKFIMG: "../../../resource/images/stars1.gif",
            kfValue: 1,
            starsShipperIMG: "../../../resource/images/stars1.gif",
            shipperValue: 1
        });
        var f = this;
        wx.getSystemInfo({
            success: function e(a) {
                f.setData({
                    width: a.windowWidth
                });
            }
        });
    },
    onReady: function e() {},
    onShow: function e() {},
    onHide: function e() {},
    onUnload: function e() {},
    starsDesc: function e(a) {
        var s = a.currentTarget.dataset;
        var t = this.data.width;
        var i = t / 750 * 360;
        var r = a.detail.x - a.currentTarget.offsetLeft;
        var o = 0;
        var e = "../../../resource/images/stars1.gif";
        if (i / 5 > r) {
            o = 0;
            e = "../../../resource/images/stars1.gif";
            this.setData({
                hah: "henhao"
            });
        } else if (i / 5 * 2 > r) {
            o = 1;
            e = "../../../resource/images/stars2.gif";
            this.setData({
                hah: "henha"
            });
        } else if (i / 5 * 3 > r) {
            o = 2;
            e = "../../../resource/images/stars3.gif";
        } else if (i / 5 * 4 > r) {
            o = 3;
            e = "../../../resource/images/stars4.gif";
        } else if (i / 5 * 5 > r) {
            o = 4;
            e = "../../../resource/images/stars5.gif";
        }
        this.setData({
            descValue: ++o,
            starsDescIMG: e
        });
    },
    starsKF: function e(a) {
        var s = a.currentTarget.dataset;
        var t = this.data.width;
        var i = t / 750 * 360;
        var r = a.detail.x - a.currentTarget.offsetLeft;
        var o = 0;
        var n = "../../../resource/images/stars1.gif";
        if (i / 5 > r) {
            o = 0;
            n = "../../../resource/images/stars1.gif";
        } else if (i / 5 * 2 > r) {
            o = 1;
            n = "../../../resource/images/stars2.gif";
        } else if (i / 5 * 3 > r) {
            o = 2;
            n = "../../../resource/images/stars3.gif";
        } else if (i / 5 * 4 > r) {
            o = 3;
            n = "../../../resource/images/stars4.gif";
        } else if (i / 5 * 5 > r) {
            o = 4;
            n = "../../../resource/images/stars5.gif";
        }
        this.setData({
            kfValue: ++o,
            starsKFIMG: n
        });
    },
    starsShipper: function e(a) {
        var s = a.currentTarget.dataset;
        var t = this.data.width;
        var i = t / 750 * 360;
        var r = a.detail.x - a.currentTarget.offsetLeft;
        var o = 0;
        var n = "../../../resource/images/stars1.gif";
        if (i / 5 > r) {
            o = 0;
            n = "../../../resource/images/stars1.gif";
        } else if (i / 5 * 2 > r) {
            o = 1;
            n = "../../../resource/images/stars2.gif";
        } else if (i / 5 * 3 > r) {
            o = 2;
            n = "../../../resource/images/stars3.gif";
        } else if (i / 5 * 4 > r) {
            o = 3;
            n = "../../../resource/images/stars4.gif";
        } else if (i / 5 * 5 > r) {
            o = 4;
            n = "../../../resource/images/stars5.gif";
        }
        this.setData({
            shipperValue: ++o,
            starsShipperIMG: n
        });
    }
});