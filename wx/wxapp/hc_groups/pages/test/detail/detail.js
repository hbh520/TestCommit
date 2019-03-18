var a = 1;

Page({
    data: {
        btn: true,
        autoplay: true,
        controls: true,
        videos: [ {
            src: "https://we10.66bbn.com/ceshi.mp4",
            id: "1",
            status: "ture"
        } ],
        canIUse: wx.canIUse("viedo.show-center-play-btn")
    },
    onReady: function t(e) {
        this.videoContext = wx.createVideoContext("myVideo");
    },
    onLoad: function t(e) {
        var a = this;
        wx.getStorage({
            key: "passwd_sys",
            success: function t(e) {
                a.setData({
                    width: e.data.width,
                    height: e.data.height
                });
            }
        });
    },
    play: function t(e) {
        var a = Date.parse(new Date());
        var s = e.currentTarget.dataset.id;
        var n = wx.createVideoContext(s);
        this.setData({
            nowTime: a,
            videoContext: n
        });
    },
    pregress: function t(e) {
        var a = e.currentTarget.dataset.id;
        var s = this.data.videoContext;
        var n = parseInt(e.detail.currentTime);
        var o = Date.parse(new Date());
        var i = this.data.nowTime;
        var r = parseInt(e.detail.duration);
        var d = parseInt((o - i) / 1e3);
        this.setData({
            currentTime: n,
            timeDiff: d
        });
        if (n - d > 0) {
            s.seek(d);
        }
        if (d == r) {
            this.setData({
                autoplay: false,
                loop: false
            });
        }
    },
    jump: function t() {
        console.log(111);
    },
    end: function t(e) {
        console.log(e);
        a++;
        console.log(a);
    }
});