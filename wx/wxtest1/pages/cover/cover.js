// pages/cover/cover.js
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoCtx = wx.createVideoContext('myVideo');
  },
  play() {
    this.videoCtx.play();
  },
  pause() {
    this.videoCtx.pause();
  }
})