/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-01 13:25:28 
 * @Last Modified by: cnyballk[https://github.com/cnyballk]
 * @Last Modified time: 2018-09-22 11:52:58
 */
Page({
  data: {
    visible1: false,
    visible2: false,
    visible3: false,
  },
  handleClick1() {
    this.setData({ visible1: !this.data.visible1 });
  },
  handleClick2() {
    this.setData({ visible2: !this.data.visible2 });
  },
  handleClick3() {
    this.setData({ visible3: !this.data.visible3 });
  },
  handleCancel() {
    this.setData({
      visible1: false,
      visible2: false,
      visible3: false,
    });
  },
  handleSelected(date) {
    const {
      detail: { checkInDate, checkOutDate, checkTotalDay },
    } = date;
    wx.showModal({
      title: '提示',
      content: `您选择了 入住日期:${checkInDate}，离店日期:${checkOutDate},总天数:${checkTotalDay}`,
      showCancel: false,
    });
  },
});
