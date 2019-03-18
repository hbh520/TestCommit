var area = require("../../../../area.js");

var areaInfo = [];

var provinces = [];

var citys = [];

var countys = [];

var index = [ 0, 0, 0 ];

var cellId;

var app = getApp();

var t = 0;

var show = false;

var moveY = 200;

Page({
    data: {
        show: show,
        provinces: provinces,
        citys: citys,
        countys: countys,
        value: [ 0, 0, 0 ]
    },
    bindChange: function a(t) {
        var e = t.detail.value;
        if (index[0] != e[0]) {
            e[1] = 0;
            e[2] = 0;
            getCityArr(e[0], this);
            getCountyInfo(e[0], e[1], this);
        } else {
            if (index[1] != e[1]) {
                e[2] = 0;
                getCountyInfo(e[0], e[1], this);
            }
        }
        index = e;
        console.log(index + " => " + e);
        this.setData({
            value: [ e[0], e[1], e[2] ],
            province: provinces[e[0]].name,
            city: citys[e[1]].name,
            county: countys[e[2]].name
        });
    },
    nameChange: function a(t) {
        var e = t.detail.value;
        this.setData({
            consignee: e
        });
    },
    addressChange: function a(t) {
        var e = t.detail.value;
        this.setData({
            address: e
        });
    },
    phoneChange: function a(t) {
        var e = t.detail.value;
        this.setData({
            mobile: e
        });
    },
    yzChange: function a(t) {
        var e = t.detail.value;
        this.setData({
            zipcode: e
        });
    },
    onLoad: function a(t) {
        cellId = t.cellId;
        var e = this;
        var n = new Date();
        console.log(n.getFullYear() + "年" + (n.getMonth() + 1) + "月" + n.getDate() + "日");
        area.getAreaInfo(function(a) {
            areaInfo = a;
            getProvinceData(e);
        });
    },
    formSubmit: function a() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Addaddress",
            method: "post",
            dataType: "json",
            data: {
                user_id: app.globalData.user_id,
                realname: t.data.consignee,
                mobile: t.data.mobile,
                province: t.data.province,
                city: t.data.city,
                area: t.data.county,
                address: t.data.address,
                zipcode: t.data.zipcode
            },
            success: function a(t) {
                wx.showToast({
                    title: t.data.message,
                    icon: "success"
                });
                wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    onReady: function a() {
        this.animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 0,
            timingFunction: "ease",
            delay: 0
        });
        this.animation.translateY(200 + "vh").step();
        this.setData({
            animation: this.animation.export(),
            show: show
        });
    },
    translate: function a(e) {
        if (t == 0) {
            moveY = 0;
            show = false;
            t = 1;
        } else {
            moveY = 200;
            show = true;
            t = 0;
        }
        animationEvents(this, moveY, show);
    },
    hiddenFloatView: function a(e) {
        console.log(e);
        moveY = 200;
        show = true;
        t = 0;
        animationEvents(this, moveY, show);
    },
    onReachBottom: function a() {},
    tiaozhuan: function a() {
        wx.navigateTo({
            url: "../../pages/modelTest/modelTest"
        });
    }
});

function animationEvents(a, t, e) {
    console.log("moveY:" + t + "\nshow:" + e);
    a.animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 400,
        timingFunction: "ease",
        delay: 0
    });
    a.animation.translateY(t + "vh").step();
    a.setData({
        animation: a.animation.export(),
        show: e
    });
}

function getProvinceData(a) {
    var t;
    provinces = [];
    var e = 0;
    for (var n = 0; n < areaInfo.length; n++) {
        t = areaInfo[n];
        if (t.di == "00" && t.xian == "00") {
            provinces[e] = t;
            e++;
        }
    }
    a.setData({
        provinces: provinces
    });
    getCityArr(0, a);
    getCountyInfo(0, 0, a);
    a.setData({
        province: "北京市",
        city: "市辖区",
        county: "东城区"
    });
}

function getCityArr(a, t) {
    var e;
    citys = [];
    var n = 0;
    for (var i = 0; i < areaInfo.length; i++) {
        e = areaInfo[i];
        if (e.xian == "00" && e.sheng == provinces[a].sheng && e.di != "00") {
            citys[n] = e;
            n++;
        }
    }
    if (citys.length == 0) {
        citys[0] = {
            name: ""
        };
    }
    t.setData({
        city: "",
        citys: citys,
        value: [ a, 0, 0 ]
    });
}

function getCountyInfo(a, t, e) {
    var n;
    countys = [];
    var i = 0;
    for (var o = 0; o < areaInfo.length; o++) {
        n = areaInfo[o];
        if (n.xian != "00" && n.sheng == provinces[a].sheng && n.di == citys[t].di) {
            countys[i] = n;
            i++;
        }
    }
    if (countys.length == 0) {
        countys[0] = {
            name: ""
        };
    }
    e.setData({
        county: "",
        countys: countys,
        value: [ a, t, 0 ]
    });
}