var initData = "this is first line\nthis is second line"
var extralLine = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    text: initData,
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }]
  },
  tap: function(e) {
    console.log(e);
  },
  add: function(e) {
    extralLine.push('other line');
    this.setData({
      text: initData + '\n' + extralLine.join('\n')
    })
  },
  remove: function(e) {
    if (extralLine.length > 0) {
      extralLine.pop();
      this.setData({
        text: initData + '\n' + extralLine.join('\n')
      })
    }
  }
})