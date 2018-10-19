
Page({
  /**
   * 页面的初始数据
   */
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },

  setDisabled: function(e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },

  setPlain: function(e) {
    this.setData({
      plain: !this.data.plain
    })
  },

  setLoading: function(e) {
    this.setData({
      loading: !this.data.loading
    })
  },

  getPhoneNumber: function(info) {
    console.log(info);
  },

  getInfo(e) {
    console.log(e);
  },

  getontactInfo(e) {
    console.log(e);
  }
})