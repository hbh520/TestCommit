var app = getApp();

var siteinfo = require("../../../../siteinfo.js");

Page({
    data: {
        array: [ "我要退款", "我要退货" ],
        array1: [ "点击选择退款原因", "多拍、错拍、不想要", "不喜欢、效果不好", "货物与描述不符", "质量问题", "收件商品少件、破损、污渍等", "空包裹", "卖家发错货", "假冒品牌", "其他" ],
        index: 0,
        index1: 0,
        logo: [],
        photos: [],
        upphotos: [],
        show: false
    },
    upLoadimg: function a() {
        var e = this.data.logo;
        var t = [];
        var o = this;
        var s = o.data.logo;
        console.log(s);
        for (var i in s) {
            wx.uploadFile({
                url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&t=" + siteinfo.multiid + "&v=" + siteinfo.version + "&from=wxapp&c=entry&a=wxapp&do=Uploadimg&&m=hc_groups",
                filePath: s[i],
                name: "image",
                header: {
                    "Content-Type": "application/json"
                },
                success: function a(e) {
                    var s = JSON.parse(e.data);
                    t.push(s.data);
                    console.log(t);
                    o.globalData.pics = t;
                    o.setData({
                        pics: t
                    });
                },
                fail: function a(e) {
                    console.log(e);
                }
            });
        }
    },
    longtap: function a(e) {
        var t = e.currentTarget.dataset.index;
        var o = this.data.logo;
        var s = this;
        wx.showModal({
            title: "提示",
            showCancel: true,
            content: "确定删除？",
            success: function a(e) {
                if (e.confirm) {
                    o.splice(t, 1);
                    s.setData({
                        logo: o
                    });
                }
            }
        });
    },
    chooseImageTap: function a() {
        var e = this;
        wx.showActionSheet({
            itemList: [ "从相册中选择", "拍照" ],
            itemColor: "#f7982a",
            success: function a(t) {
                if (!t.cancel) {
                    if (t.tapIndex == 0) {
                        e.chooseWxImage("album");
                    } else if (t.tapIndex == 1) {
                        e.chooseWxImage("camera");
                    }
                }
            }
        });
    },
    chooseWxImage: function a(e) {
        var t = this;
        var o = this.data.logo;
        var s = this.data.photos;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ e ],
            success: function a(e) {
                console.log(e);
                for (var s in e.tempFilePaths) {
                    o.push(e.tempFilePaths[s]);
                }
                console.log(e.tempFilePaths);
                wx.showToast({
                    title: "长按可删除图片",
                    icon: "success"
                });
                t.setData({
                    logo: o,
                    length: e.tempFilePaths
                });
            }
        });
    },
    globalData: {
        pics: null
    },
    submit: function a() {
        this.upLoadimg();
        wx.showToast({
            title: "提交中...",
            icon: "success"
        });
        var e = this;
        setTimeout(function() {
            var a = e.data.typeM;
            if (a == undefined) {
                a = e.data.array[0];
            } else {
                a = e.data.typeM;
            }
            var t = e.data.typeM1;
            if (t == undefined) {
                wx.showToast({
                    title: "请选择退款原因",
                    icon: "success"
                });
                return false;
            } else {
                t = e.data.typeM1;
            }
            var o = e.data.content;
            if (o == undefined) {
                wx.showToast({
                    title: "请填写退款说明",
                    icon: "success"
                });
                return false;
            } else {
                o = e.data.content;
            }
            var s = e.data.order_id;
            var i = e.data.money;
            var n = e.globalData.pics;
            var r = getApp().globalData.user_id;
            var l = e.data.phone;
            var c = e.data.status;
            app.util.request({
                url: "entry/wxapp/refund",
                method: "post",
                dataType: "json",
                data: {
                    refundtype: a,
                    user_id: r,
                    shipstatus: c,
                    mobile: l,
                    content: o,
                    reason: t,
                    order_id: s,
                    applyprice: i,
                    images: n
                },
                success: function a(e) {
                    wx.showToast({
                        title: "提交成功"
                    });
                    setTimeout(function() {
                        wx.redirectTo({
                            url: "../../member/refund/refund"
                        });
                    }, 2e3);
                }
            });
        }, 2e3);
    },
    onLoad: function a(e) {
        this.setData({
            order_id: e.order_id,
            phone: e.phone,
            money: e.money,
            status: e.status
        });
    },
    textare: function a(e) {
        console.log(e.detail.value);
        this.setData({
            content: e.detail.value
        });
    },
    bindPickerChange: function a(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        var t = this.data.array;
        this.setData({
            index: e.detail.value,
            typeM: t[e.detail.value]
        });
    },
    bindPickerChange1: function a(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        var t = this.data.array1;
        this.setData({
            index1: e.detail.value,
            typeM1: t[e.detail.value]
        });
    }
});