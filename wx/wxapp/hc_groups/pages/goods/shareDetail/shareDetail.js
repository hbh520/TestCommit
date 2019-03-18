var WxParse = require("../../../../wxParse/wxParse.js");

var app = getApp();

Page({
    data: {
        goods: {},
        current: 0,
        tabStates: [ true, false, false ],
        tabClasss: [ "text-select", "text-normal", "text-normal" ],
        galleryHeight: getApp().screenWidth,
        tab: 0,
        goods_num: 1,
        textStates: [ "view-btns-text-normal", "view-btns-text-select" ]
    },
    propClick: function t(a) {
        var e = a.currentTarget.dataset.pos;
        var s = a.currentTarget.dataset.index;
        var i = this.data.goods;
        for (var o = 0; o < i.spec[s].item.length; o++) {
            if (o == e) {
                i.spec[s].item[e].isClick = 1;
            } else {
                i.spec[s].item[o].isClick = 0;
            }
        }
        this.setData({
            goods: i
        });
        this.checkPrice();
    },
    countdown: function t(a, e) {
        var s = this;
        var i = e || [];
        console.log(i);
        var o = new Date().getTime() / 1e3;
        o = parseInt(o);
        var r = i - o || [];
        a["clock"] = s.dateformat(r);
        s.setData({
            group: a
        });
        if (r <= 0) {
            a["clock"] = "已经截止";
            s.setData({
                group: a
            });
        }
        setTimeout(function() {
            r -= 1;
            s.countdown(a, e);
        }, 1e3);
    },
    dateformat: function t(a) {
        var e = Math.floor(a);
        var s = Math.floor(e / 3600);
        var i = Math.floor(e / 60 % 60);
        var o = Math.floor(e % 60);
        return s + ":" + i + ":" + o + "";
    },
    addCollect: function t(a) {
        var e = a.currentTarget.dataset.id;
        console.log(e);
        var s = getApp().globalData.userInfo.user_id;
        var i = 0;
        server.getJSON("/Goods/collectGoods/user_id/" + s + "/goods_id/" + e + "/type/" + i, function(t) {
            wx.showToast({
                title: t.data.msg,
                icon: "success",
                duration: 2e3
            });
        });
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
        var i = a.pic;
        if (s == undefined) {
            s = "";
        }
        console.log(s);
        this.getGoodsById(e);
        this.setData({
            groupid: s,
            pic: i
        });
        this.getgroup(s);
        this.getTitle();
    },
    getTitle: function t() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/config",
            method: "post",
            dataType: "json",
            success: function t(a) {
                wx.setNavigationBarTitle({
                    title: a.data.data.shop_name
                });
            }
        });
    },
    getgroup: function t(a) {
        var e = app.globalData.user_id;
        var s = this;
        app.util.request({
            url: "entry/wxapp/Sharegroup",
            method: "post",
            dataType: "json",
            data: {
                groupid: a
            },
            success: function t(a) {
                console.log(a);
                var i = a.data.data;
                s.setData({
                    group: i,
                    user_id: e
                });
                s.countdown(i, i.endtime);
            }
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
    getGoodsById: function t(a) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/getgoodsdetail",
            method: "post",
            dataType: "json",
            data: {
                goods_id: a
            },
            success: function t(a) {
                console.log(a);
                var s = a.data.data.content;
                WxParse.wxParse("article", "html", s, e, 5);
                var i = a.data.data;
                e.setData({
                    goods: i,
                    group: i.group,
                    grouplist: i.grouplist
                });
                e.checkPrice();
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
            var o = a.spec_item[e];
            console.log(a.spec_item[e]);
            this.setData({
                price: o,
                spec: a.spec_item[e]
            });
        }
    },
    addCart: function t() {
        var a = this.data.goods;
        var e = {};
        e["title"] = a.title;
        e["singleprice"] = a.singleprice;
        e["groupprice"] = a.groupprice;
        e["goods_id"] = a.goods_id;
        if (this.data.spec != undefined) {
            e["pic"] = this.data.pic;
        } else {
            e["pic"] = this.data.goods.thumb[0];
            console.log(this.data.goods.thumb[0]);
        }
        console.log(e);
        var e = JSON.stringify(e);
        if (this.data.spec != undefined) {
            var s = JSON.stringify(this.data.spec);
        }
        var i = this.data.types;
        var o = getApp();
        var r = this;
        var n = r.data.goods_num;
        var d = r.data.groupid;
        wx.navigateTo({
            url: "../../order/ordersubmit/index?goods=" + e + "&spec=" + s + "&goods_num=" + n + "&types=" + "group" + "&groupid=" + d
        });
    },
    previewImage: function t(a) {
        var e = a.currentTarget.dataset.index;
        var s = this;
        var i = [];
        for (var o = 0; o < s.data.goods.gallery.length; o++) {
            i.push(s.data.goods.gallery[o].image_url);
        }
        wx.previewImage({
            current: s.data.goods.gallery[e].image_url,
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
                showModalStatus: true,
                pintuan: false
            });
        }
        setTimeout(function() {
            s.translateY(0).step();
            this.setData({
                animationData: s
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
    showDetail: function t(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../goods/detail/detail?objectId=" + e
        });
    },
    onShareAppMessage: function t() {
        var a = this;
        var e = a.data.goods.goods_id;
        var s = a.data.groupid;
        var i = getApp().globalData.share_title;
        console.log(i);
        return {
            title: i,
            desc: "商品详情",
            path: "/hc_groups/pages/goods/shareDetails/shareDetails?objectId=" + e + "&groupid=" + s
        };
    }
});