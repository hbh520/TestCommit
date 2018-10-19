// pages/movable/movable.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: 0,
    y: 0
  },
  tap: function(e) {
    this.setData({
      x: 20,
      y: 0
    });
  },
  onChange: function (e) {
    console.log('this is touch change');
    console.log(e.detail);
  },
  onScale: function (e) {
    console.log('this is scale change');
    console.log(e.detail);
  }
})