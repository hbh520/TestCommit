// pages/orderdetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus:false,
    modelList: {
      type: '总路线信息',
      status: 1,
      list: [
        {
          name: '发货地址',
          important: true,
          content: '江苏无锡滨湖区太湖新城清舒道88号',
          normal: 0,
        },
        {
          name: '送货地址',
          important: true,
          content: '江苏镇江京口区智慧大道470号',
          normal: 0,
        },
        {
          name: '中转地址',
          important: false,
          content: '江苏无锡市区',
          normal: 1,
        },
        {
          name: '发货时间',
          important: true,
          content: '2018-10-18 16:00:00',
          normal: 0,
        },
        {
          name: '到货时间',
          important: true,
          content: '2018-10-19 17:00:00',
          normal: 0,
        },
        {
          name: '里程数',
          important: false,
          content: '103公里',
          normal: 0,
        },
        {
          name: '货物类别',
          important: true,
          content: '配件',
          normal: 0,
        },
        {
          name: '货物名称',
          important: true,
          content: '拖1304B变速箱的外壳+总成',
          normal: 0,
        },
        {
          name: '吨位范围',
          important: true,
          content: '其他',
          normal: 0,
        },
        {
          name: '货物数量',
          important: true,
          content: '6台',
          normal: 0,
        },
        {
          name: '货物数量2',
          important: false,
          content: '3台',
          normal: 0,
        }
        
      ]
    },
    datas:{
      typeList: [
        {
          type: '承运商车辆信息',
          status: 0,
          list: [
            {
              name: '车牌号',
              important: true,
              content: '苏LML880',
              normal: 0,
            },
            {
              name: '车型',
              important: true,
              content: '厢车',
              normal: 0,
            },
            {
              name: '车长',
              important: true,
              content: '13米',
              normal: 0,
            }
          ]
        },
        {
          type: '基本信息',
          status: 0,
          list: [
            {
              name: '订单编号',
              important: true,
              content: '01810170002',
              normal: 0,
            },
            {
              name: '销售编号',
              important: false,
              content: '20181017',
              normal: 2,
            },
            {
              name: '下单时间',
              important: true,
              content: '2018-10-17 10:26:39',
              normal: 0,
            },
            {
              name: '紧急程度',
              important: true,
              content: '3小时内回复',
              normal: 0,
            },
            {
              name: '客户单位',
              important: true,
              content: '货准达测试账户',
              normal: 0,
            },
            {
              name: '发货计划人',
              important: true,
              content: '朱云程',
              normal: 0,
            },
            {
              name: '发货人电话',
              important: true,
              content: '18652736030',
              normal: 0,
            },
            {
              name: '发货内容',
              important: false,
              content: 'FHNR',
              normal: 1,
            }
          ]
        },
        {
          type: '总路线',
          status: 1,
          list: [
            {
              name: '发货地址',
              important: true,
              content: '江苏无锡滨湖区太湖新城清舒道88号',
              normal: 0,
            },
            {
              name: '送货地址',
              important: true,
              content: '江苏镇江京口区智慧大道470号',
              normal: 0,
            },
            {
              name: '货物类别',
              important: true,
              content: '配件',
              normal: 0,
            },
            {
              name: '货物名称',
              important: true,
              content: '拖1304B变速箱的外壳+总成',
              normal: 0,
            },
            {
              name: '货物数量',
              important: true,
              content: '3台',
              normal: 0,
            }
          ]
        },
        {
          type: '子线路1',
          status: 1,
          list: [
            {
              name: '发货地址',
              important: true,
              content: '江苏无锡滨湖区太湖新城清舒道88号',
              normal: 0,
            },
            {
              name: '送货地址',
              important: true,
              content: '江苏镇江京口区智慧大道470号',
              normal: 0,
            },
            {
              name: '货物类别',
              important: true,
              content: '配件',
              normal: 0,
            },
            {
              name: '货物名称',
              important: true,
              content: '拖1304B变速箱的外壳+总成',
              normal: 0,
            },
            {
              name: '货物数量',
              important: true,
              content: '3台',
              normal: 0,
            },
            {
              name: '收货人',
              important: false,
              content: '张世翔',
              normal: 0,
            },
            {
              name: '收货人号码',
              important: false,
              content: '18083781768',
              normal: 0,
            }
          ]
        },
        {
          type: '所需车辆信息',
          status: 0,
          list: [
            {
              name: '所需车型',
              important: false,
              content: '平板',
              normal: 0,
            },
            {
              name: '所需车长',
              important: false,
              content: '13.5米',
              normal: 0,
            },
            {
              name: '承运方式',
              important: false,
              content: '整车',
              normal: 0,
            },
            {
              name: '备注',
              important: false,
              content: 'BZ',
              normal: 1,
            }
          ]
        }
      ]
    }
  },
  hiddenAnim:function(){
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 300,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(that.data.windowHeight).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export()
      // 改变view里面的Wx：if
      
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      that.setData({
        showModalStatus: false
      })
    }, 400)
  },

  startAnim:function(){
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 300,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(that.data.windowHeight).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      showModalStatus: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
          success: function (res) {
            console.log(res.model)
            console.log(res.pixelRatio)
            console.log(res.windowWidth)
            console.log(res.windowHeight)
            that.setData({
              windowHeight: res.windowHeight
            })
            console.log(res.language)
            console.log(res.version)
            console.log(res.platform)
          }
        })
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