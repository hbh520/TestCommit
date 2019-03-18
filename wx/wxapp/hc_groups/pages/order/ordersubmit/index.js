var tp;

var pay_points;

var app = getApp();

var points_rate;

Page({
    data: {
        use_money: 0,
        use_point: 0,
        check: [ "true", "" ],
        coupon: [],
        cv: "请选择优惠劵",
        cpos: -1,
        couponCode: "",
        date: "请选择日期",
        time: "请选择时间"
    },
    onLoad: function a(t) {
        var s = this;
        var e = JSON.parse(t.goods);
        var o = t.groupid;
        console.log("groupid=" + o);
        if (t.spec != "undefined") {
            var d = JSON.parse(t.spec);
        }
        console.log(d);
        s.setData({
            goods: e,
            spec: d,
            groupid: o,
            goods_num: t.goods_num,
            types: t.types
        });
        this.total();
    },
    getAddress: function a() {
        var t = this;
        var s = getApp().globalData.user_id;
        app.util.request({
            url: "entry/wxapp/Addresslist",
            method: "post",
            dataType: "json",
            data: {
                user_id: s,
                isdefault: 1
            },
            success: function a(s) {
                console.log(s);
                t.setData({
                    address: s.data.data
                });
            }
        });
    },
    addressSelect: function a() {
        wx.navigateTo({
            url: "../../address/list/list"
        });
    },
    bindMinus: function a(t) {
        var s = this.data.goods_num;
        if (s > 1) {
            s--;
        }
        this.setData({
            goods_num: s
        });
        this.total();
    },
    bindManual: function a(t) {
        var s = parseInt(t.currentTarget.dataset.index);
        var e = t.detail.value;
        this.setData({
            goods_num: e
        });
        this.total();
    },
    bindPlus: function a(t) {
        var s = this.data.goods_num;
        s++;
        this.setData({
            goods_num: s
        });
        this.total();
    },
    total: function a() {
        var t = this.data.goods_num;
        var s = "";
        var a = "";
        if (this.data.spec == undefined) {
            if (this.data.types == "single") {
                s = this.data.goods.singleprice;
            } else {
                s = this.data.goods.groupprice;
            }
        } else {
            if (this.data.types == "single") {
                s = this.data.spec.option_productprice;
            } else {
                s = this.data.spec.option_marketprice;
            }
        }
        a = (t * s).toFixed(2);
        this.setData({
            total: a
        });
    },
    globalData: {
        total_fee: null
    },
    onShow: function a() {
        this.getAddress();
    },
    formSubmit: function a() {
        var t = this;
        var s = getApp().globalData.user_id;
        var e = t.data.groupid;
        console.log(t.data.spec);
        if (t.data.spec != undefined) {
            var o = t.data.spec.id;
        } else {
            o = "";
        }
        var d = "";
        if (t.data.types == "group") {
            d = 1;
        }
        if (t.data.types == "single") {
            d = 0;
        }
        if (t.data.address.length == 0) {
            wx.showToast({
                title: "请添加收货地址",
                icon: "success"
            });
            return false;
        }
        app.util.request({
            url: "entry/wxapp/addorder",
            method: "post",
            dataType: "json",
            data: {
                user_id: s,
                goods_id: t.data.goods.goods_id,
                addressid: t.data.address[0].id,
                num: t.data.goods_num,
                isgroup: d,
                groupid: e,
                spec_id: o
            },
            success: function a(s) {
                console.log(s);
                t.setData({
                    payData: s.data.data,
                    groupid: s.data.data.groupid
                });
                t.pay();
            }
        });
    },
    pay: function a() {
        var t = this;
        var s = t.data.groupid;
        var e = this.data.payData;
        var o = t.data.goods.goods_id;
        var d = t.data.goods.pic;
        wx.requestPayment({
            timeStamp: "" + e.timeStamp,
            nonceStr: e.nonceStr,
            package: e.package,
            signType: "MD5",
            paySign: e.sign,
            success: function a(t) {
                wx.redirectTo({
                    url: "../../goods/shareDetail/shareDetail?groupid=" + s + "&objectId=" + o + "&pic=" + d
                });
            },
            fail: function a(t) {
                console.log(t);
                wx.redirectTo({
                    url: "../list/list"
                });
            }
        });
    }
});