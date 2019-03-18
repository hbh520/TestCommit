var WxParse = require("../../../../wxParse/wxParse.js");

var app = getApp();

Page({
    data: {
        goods: {},
        current: 0,
        tabStates: [ true, false, false ],
        tabClasss: [ "text-select", "text-normal", "text-normal" ],
        tab: 0,
        goods_num: 1,
        textStates: [ "view-btns-text-normal", "view-btns-text-select" ],
        show: true,
        show1: true
    },
    propClick: function t(a) {
        var e = a.currentTarget.dataset.pos;
        var s = a.currentTarget.dataset.index;
        var i = this.data.goods;
        for (var r = 0; r < i.spec[s].item.length; r++) {
            if (r == e) {
                i.spec[s].item[e].isClick = 1;
            } else {
                i.spec[s].item[r].isClick = 0;
            }
        }
        this.setData({
            goods: i
        });
        this.checkPrice();
    },
    countdown: function t(a, e) {
        var s = this;
        for (var i in a) {
            for (var r in a[i]) {
                var o = a[i][r].endtime || [];
                var n = new Date().getTime() / 1e3;
                n = parseInt(n);
                var d = o - n || [];
                a[i][r]["clock"] = s.dateformat(d);
            }
        }
        if (e == undefined) {
            return false;
        }
        for (var i in e) {
            var o = e[i].endtime || [];
            var n = new Date().getTime() / 1e3;
            n = parseInt(n);
            var d = o - n || [];
            e[i]["clock"] = s.dateformat(d);
        }
        s.setData({
            group: a,
            grouplist: e
        });
        if (d <= 0) {
            s.setData({
                clock: "已经截止"
            });
        }
        setTimeout(function() {
            d -= 1;
            s.countdown(a, e);
        }, 1e3);
    },
    dateformat: function t(a) {
        var e = Math.floor(a);
        var s = Math.floor(e / 3600);
        if (s < 10) {
            s = "0" + s;
        }
        var i = Math.floor(e / 60 % 60);
        if (i < 10) {
            i = "0" + i;
        }
        var r = Math.floor(e % 60);
        if (r < 10) {
            r = "0" + r;
        }
        return s + ":" + i + ":" + r + "";
    },
    bindMinus: function t(a) {
        var e = this.data.goods_num;
        if (e > 1) {
            e--;
        }
        this.setData({
            goods_num: e
        });
    },
    bindManual: function t(a) {
        var e = parseInt(a.currentTarget.dataset.index);
        var s = a.detail.value;
        this.setData({
            goods_num: s
        });
    },
    bindPlus: function t(a) {
        var e = this.data.goods_num;
        e++;
        this.setData({
            goods_num: e
        });
    },
    onLoad: function t(a) {
        var e = a.objectId;
        var s = a.groupid;
        if (s == undefined) {
            s = "";
        }
        app.getUserInfo(function() {
            app.register();
        });
        this.getGoodsById(e);
        this.setData({
            groupid: s,
            galleryHeight: getApp().globalData.screenWidth
        });
    },
    tabClick: function t(a) {
        var e = a.currentTarget.dataset.index;
        var s = [ "text-normal", "text-normal", "text-normal" ];
        s[e] = "text-select";
        this.setData({
            tabClasss: s,
            tab: e
        });
    },
    Allcomment: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../comment/comment?id=" + e
        });
    },
    getGoodsById: function t(a) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/getgoodsdetail",
            method: "get",
            dataType: "json",
            data: {
                goods_id: a
            },
            success: function t(a) {
                var s = a.data.data.content;
                WxParse.wxParse("article", "html", s, e, 5);
                var i = a.data.data;
                var r = a.data.data.is_luck;
                var o = e.data.show;
                var n = e.data.show1;
                if (r == 1) {
                    o = false, n = true;
                } else {
                    o = true, n = false;
                }
                var d = parseInt(i.sales_num) + parseInt(i.void_num);
                console.log("goods");
                console.log(i);
                e.setData({
                    show: o,
                    show1: n,
                    seal: d,
                    goods: i,
                    group: i.group,
                    grouplist: i.grouplist
                });
                e.checkPrice();
                console.log(i.grouplist);
                e.countdown(i.group, i.grouplist);
            }
        });
    },
    checkPrice: function t() {
        var a = this.data.goods;
        var e = "";
        if (a.spec != null) {
            for (var s = 0; s < a.spec.length; s++) {
                for (var i = 0; i < a.spec[s].item.length; i++) {
                    if (a.spec[s].item[i].isClick == 1) {
                        if (e == "") {
                            e = a.spec[s].item[i].item_id;
                            this.setData({
                                pic: a.spec[s].item[i].item_thumb
                            });
                        } else {
                            e = e + "_" + a.spec[s].item[i].item_id;
                        }
                    }
                }
            }
            if (a.spec_item != null) {
                var r = a.spec_item[e];
                this.setData({
                    price: r,
                    spec: a.spec_item[e]
                });
            }
        }
    },
    addCart: function t(a) {
        var e = this.data.goods;
        var s = {};
        s["title"] = e.title;
        s["singleprice"] = e.singleprice;
        s["groupprice"] = e.groupprice;
        s["goods_id"] = e.goods_id;
        if (this.data.spec != undefined) {
            s["pic"] = this.data.pic;
        } else {
            s["pic"] = this.data.goods.thumbs[0];
        }
        var s = JSON.stringify(s);
        if (this.data.spec != undefined) {
            var i = JSON.stringify(this.data.spec);
        }
        var r = this.data.types;
        var o = getApp();
        var n = this;
        var d = n.data.goods_num;
        var u = n.data.groupid;
        if (u == undefined) {
            u = "";
        }
        wx.navigateTo({
            url: "../../order/ordersubmit/index?goods=" + s + "&spec=" + i + "&goods_num=" + d + "&types=" + r + "&groupid=" + u
        });
    },
    previewImage: function t(a) {
        var e = a.currentTarget.dataset.index;
        var s = this;
        var i = [];
        for (var r = 0; r < s.data.goods.thumbs.length; r++) {
            i.push(s.data.goods.thumbs[r]);
        }
        wx.previewImage({
            current: s.data.goods.thumbs[e],
            urls: i
        });
    },
    home: function t(a) {
        wx.switchTab({
            url: "../../index/index",
            success: function t(a) {},
            fail: function t(a) {},
            complete: function t(a) {}
        });
    },
    goCart: function t() {
        wx.switchTab({
            url: "../../cart/cart"
        });
    },
    setModalStatus: function t(a) {
        var e = a.currentTarget.dataset.types;
        var s = a.currentTarget.dataset.groupid;
        this.setData({
            groupid: s
        });
        var i = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = i;
        i.translateY(300).step();
        this.setData({
            animationData: i.export(),
            types: e
        });
        if (a.currentTarget.dataset.status == 1) {
            this.setData({
                showModalStatus: true,
                pintuan: false
            });
        }
        setTimeout(function() {
            i.translateY(0).step();
            this.setData({
                animationData: i
            });
            if (a.currentTarget.dataset.status == 0) {
                this.setData({
                    showModalStatus: false
                });
            }
        }.bind(this), 200);
    },
    pintuan: function t(a) {
        var e = a.currentTarget.dataset.types;
        var s = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = s;
        s.translateY(300).step();
        this.setData({
            animationData: s.export(),
            types: e
        });
        if (a.currentTarget.dataset.status == 1) {
            this.setData({
                pintuan: true
            });
        }
        setTimeout(function() {
            s.translateY(0).step();
            this.setData({
                animationData: s
            });
            if (a.currentTarget.dataset.status == 0) {
                this.setData({
                    pintuan: false
                });
            }
        }.bind(this), 200);
    },
    onShareAppMessage: function t() {
        var a = this;
        var e = a.data.goods.goods_id;
        var s = getApp().globalData.share_title;
        console.log(s);
        return {
            title: s,
            desc: "商品详情",
            path: "/hc_groups/pages/goods/detail/detail?objectId=" + e
        };
    }
});