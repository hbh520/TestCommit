var time = 1;

Page({
    data: {
        videos: [ {
            src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
            id: "1",
            status: "ture"
        }, {
            src: "http://pic.ibaotu.com/00/50/60/354888piCmr2.mp4",
            id: "2",
            status: "ture"
        }, {
            src: "http://pic.ibaotu.com/00/50/60/354888piCmr2.mp4",
            id: "3",
            status: "ture"
        }, {
            src: "../../resource/images/6fbb65014e2d8695e54bf177d75f1a10.mp4",
            id: "4",
            status: "ture"
        }, {
            src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
            id: "5",
            status: "ture"
        }, {
            src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
            id: "6",
            status: "ture"
        } ],
        canIUse: wx.canIUse("viedo.bindfullscreenchange"),
        show: false,
        loop: true,
        autoplay: true,
        controls: false
    },
    onLoad: function e() {},
    bindButtonTap: function e() {
        var a = this;
        wx.chooseVideo({
            sourceType: [ "album", "camera" ],
            maxDuration: 60,
            camera: "back",
            success: function e(t) {
                console.log(t);
                a.setData({
                    src: t.tempFilePath
                });
            }
        });
    },
    play: function e(a) {
        var t = a.currentTarget.dataset.id;
        var s = this.data.videos;
        for (var c in s) {
            var i = wx.createVideoContext(s[c].id);
            i.pause();
            if (s[c].id == t) {
                var d = wx.createVideoContext(t);
                d.play();
                i.seek(1);
                s[c].status = false;
            }
        }
        this.setData({
            videos: s
        });
    },
    pause: function e(a) {
        var t = a.currentTarget.dataset.index;
        var s = a.currentTarget.dataset.id;
        var c = wx.createVideoContext(s);
        var i = this.data.videos;
        if (!i[t].status) {
            c.pause();
        }
    },
    end: function e(a) {
        var t = a.currentTarget.dataset.id;
        console.log(t);
    }
});