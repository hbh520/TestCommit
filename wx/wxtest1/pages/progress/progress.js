// pages/progress/progress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    percentValue: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let timer;
    timer = () => {
      setTimeout(() => {
        const value = this.data.percentValue;
        this.setData({
          percentValue: value < 100 ? value+10 : value
        });
        timer();
      }, 2000);
    }
    timer();
  }
})