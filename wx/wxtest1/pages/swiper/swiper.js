// pages/swiper/swiper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    autoplay:false,
    vertical: false,
    interval: 2000,
    duration: 300
  },

  changeIndicatorDots: function (e) {
    console.log("切换指示点开关");
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay: function(e) {
    console.log("切换自动播放开关");
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange: function(e) {
    console.log(`调整自动播放间隔市场为：${e.detail.value}ms`);
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange: function(e) {
    console.log(`调整幻灯片切换时长为：${e.detail.value}ms`);
    this.setData({
      duration: e.detail.value
    })
  },

  animationfinish: function(e) {
    console.log(e);
  },

  change: function(e) {
    console.log(e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})