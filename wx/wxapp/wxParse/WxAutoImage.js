function wxAutoImageCal(e, o) {
    var t = 0, i = 0;
    var a = 0, g = 0;
    var n = {};
    wx.getSystemInfo({
        success: function l(s) {
            console.dir(s);
            t = s.windowWidth;
            i = s.windowHeight;
            console.log("windowWidth" + t);
            if (e > t) {
                a = t;
                console.log("autoWidth" + a);
                g = a * o / e;
                console.log("autoHeight" + g);
                n.imageWidth = a;
                n.imageheight = g;
            } else {
                n.imageWidth = e;
                n.imageheight = o;
            }
        }
    });
    return n;
}

module.exports = {
    wxAutoImageCal: wxAutoImageCal
};