// pages/data/data.js
var timer;
var l = 0.2;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    topShow:true,
    pixelRatio:1,
    address:'江苏省镇江市京口区丁卯街道潘宗路21号',
    address1:'上海黄浦区',
    address2:'大连中山区',
    startTime:'10-17 11:11',
    carNum:'苏LML880',
    carType:'厢车',
    carLength:'13米',
    orderNum:'01810170001',
    x:0,
    y:0,
    percent:0,
    radio:0.95
  },

  /**
   * 
   * @param {*} context canvas上下文
   * @param {*} x1 起点x
   * @param {*} y1 起点y
   * @param {*} x2 终点x
   * @param {*} y2 终点y
   * @param {*} dashLen 虚线每段的长度 
   */
  drawDashLine: function (context, x1, y1, x2, y2, dashLen) {
    // const getBeveling = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));
    dashLen = dashLen === undefined ? 5 : dashLen;
    //得到斜边的总长度  
    var beveling = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    //计算有多少个线段  
    var num = Math.floor(beveling / dashLen);

    for (var i = 0; i < num; i++) {
      context[i % 2 == 0 ? 'moveTo' : 'lineTo'](x1 + (x2 - x1) / num * i, y1 + (y2 - y1) / num * i);
    }
    context.stroke();
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var radio=1
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        radio = res.pixelRatio
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
      }
    })
    
    // this.setData({
    //   pixelRatio: 1/radio
    // })
    this.setData({
      pixelRatio: 1 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.log(res.model)
    //     console.log(res.pixelRatio)
    //     this.data.pixelRatio = res.pixelRatio
    //     console.log(res.windowWidth)
    //     console.log(res.windowHeight)
    //     console.log(res.language)
    //     console.log(res.version)
    //     console.log(res.platform)
    //   }
    // })

    var x1 = this.berLine(l, 65, 400, 220)
    console.log(x1)
    this.setData({
          x: x1
        })
    this.countdown()
  
  },

  drawCanvs:function(m,n){
    var radio = 1
    var context = wx.createCanvasContext('canvas1')
    context.setFillStyle('#5F6FEE')//文字颜色：默认黑色
    context.setFontSize(17)//设置字体大小，默认10
    context.fillText(this.data.address1, 30 * radio, 75 * radio)//绘制文本
    context.stroke()
    context.setFontSize(14)//设置字体大小，默认10
    context.fillText(this.data.startTime, 30 * radio, 95 * radio)//绘制文本
    context.stroke()

    //终点地址
    context.setFillStyle('#fff')
    context.setFontSize(17)
    context.fillText(this.data.address2, 185 * radio, (440 - 40) * radio)
    context.stroke()
    //圆起
    context.beginPath()
    context.arc(65 * radio, 35 * radio, 15, 0, Math.PI * 2, false);
    context.fillStyle = "#4B56AF";//内部色
    context.fill();
    context.strokeStyle = "#4B56AF";//边
    context.stroke();
    //字起
    context.setFillStyle('#283060')
    context.setFontSize(17)
    context.fillText("起", 57 * radio, 41 * radio)
    context.stroke()
    //圆终
    context.beginPath()
    context.arc(220 * radio, (400 - 40) * radio, 15, 0, Math.PI * 2, false);
    context.fillStyle = "#F9AB41";
    context.fill();
    context.strokeStyle = "#F9AB41";
    context.stroke();
    //字终
    context.setFillStyle('#283060')
    context.setFontSize(17)
    context.fillText("终", 213 * radio, (405 - 40) * radio)
    context.stroke()

    context.beginPath()
    context.setStrokeStyle("#4B56AF")
    context.setLineWidth(2)
    context.moveTo(65 * radio, 35 * radio)
    context.lineTo(m * radio, n * radio)
    context.stroke()

    context.beginPath()
    context.setStrokeStyle("#2DA1F4")
    context.setLineWidth(2)
    this.drawDashLine(context, m * radio, n * radio, 220 * radio, (400 - 40) * radio, 5)
    context.stroke()

    // context.beginPath()
    // context.moveTo(65, 35)
    // context.quadraticCurveTo(200, 10, 220, 360)
    // context.setStrokeStyle('black')
    // context.stroke()
    context.draw()
  },
  
  // 倒计时
  countdown:function() {
    var that=this
    var percent = this.data.percent

    console.log(percent)
    if (percent > this.data.radio) {

      return;
    }
    var x1 = that.berLine(percent, 65, 100, 220)
    var y1 = that.berLine(percent, 35, 10, 360)

    that.drawCanvs(x1,y1)

    this.setData({
      percent: percent + 0.05,
      x: x1 - 90,
      y: y1 + 10
    })

    setTimeout(function () {
      that.countdown();
    }, 100)
  },

  berLine: function (t, x1, x2, x3) {
    var a = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * x2 + t * t * x3
    return a;
  },

  orderDetail:function(e){

    var num = e.currentTarget.dataset.order
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 1200
    })
    setTimeout(function () {
      wx.navigateTo({
        url: "../orderdetail/index",
        success: function () {
          console.log("success")
        },
        fail: function () {
          console.log("fail")
        },
        complete: function () {
          console.log("complete")
        }
      })
    }, 1000);
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