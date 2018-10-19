Page({
  data: {
    index: 0,
    rightIcon:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1665233428,1561513961&fm=26&gp=0.jpg',
    t:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539670037785&di=1c19414415e72e03eea415b3412c5f7a&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F89%2F48%2F7456ed8fe3a17fb.jpg',
    tabs: [
      {
        text: '全部',
      },
      {
        text: '待发货',
      },
      {
        text: '已发货',
      },
      {
        text: '已送达',
      },
    ],
    datas:[
      {
        status:"已发货",
        orderNum:"11111111",
        shipAddress:'苏州高新区',
        receiverAddress:'常州新北区',
        date:'2018-10-09 11:03',
        cargoName:'粮食',
        cargoNum:'1.5吨',
        percent:50
      },
      {
        status: "待发货",
        orderNum: "22222222",
        shipAddress: '镇江丹徒区',
        receiverAddress: '常州新北区',
        date: '2018-10-02 13:03',
        cargoName: '油',
        cargoNum: '2.5吨',
        percent: 0
      },
      {
        status: "已送达",
        orderNum: "333333333",
        shipAddress: '徐州市区',
        receiverAddress: '无锡新吴区',
        date: '2018-10-15 08:03',
        cargoName: '汽车',
        cargoNum: '20辆',
        percent: 100
      }
    ],
    datas1: [
      {
        status: "已发货",
        orderNum: "11111111",
        shipAddress: '苏州高新区',
        receiverAddress: '常州新北区',
        date: '2018-10-09 11:03',
        cargoName: '粮食',
        cargoNum: '1.5吨',
        percent: 50
      },
      {
        status: "待发货",
        orderNum: "22222222",
        shipAddress: '镇江丹徒区',
        receiverAddress: '常州新北区',
        date: '2018-10-02 13:03',
        cargoName: '油',
        cargoNum: '2.5吨',
        percent: 0
      },
      {
        status: "已送达",
        orderNum: "333333333",
        shipAddress: '徐州市区',
        receiverAddress: '无锡新吴区',
        date: '2018-10-15 08:03',
        cargoName: '汽车',
        cargoNum: '20辆',
        percent: 100
      }
    ],
    datas2: [
      {
        status: "待发货",
        orderNum: "22222222",
        shipAddress: '镇江丹徒区',
        receiverAddress: '常州新北区',
        date: '2018-10-02 13:03',
        cargoName: '油',
        cargoNum: '2.5吨',
        percent: 0
      }
    ],
    datas3: [
      {
        status: "已发货",
        orderNum: "11111111",
        shipAddress: '苏州高新区',
        receiverAddress: '常州新北区',
        date: '2018-10-09 11:03',
        cargoName: '粮食',
        cargoNum: '1.5吨',
        percent: 50
      }
    ],
    datas4: [
      {
        status: "已送达",
        orderNum: "333333333",
        shipAddress: '徐州市区',
        receiverAddress: '无锡新吴区',
        date: '2018-10-15 08:03',
        cargoName: '汽车',
        cargoNum: '20辆',
        percent: 100
      }
    ]
  },
  jump: function (e) {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },

  onTabsItemTap: function (event) {
    var num = event.currentTarget.dataset.order
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 1200
    })
    setTimeout(function () {
      wx.navigateTo({
        url: "../data/data",
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
  handleChange(e) {
    const index = e.detail.index;
    var m=index+1;
    console.log(e);
    console.log(datas);
  },
  handleSelected(a) {
    this.setData({
      index: a,
    });
  },
  handleClick(e) {
    const { index, title } = e.detail;
    console.log('点击了tab:' + index, title);
  },
  onDisabled(e) {
    const { index, title } = e.detail;
    console.log('点击了禁用的:' + index, title);
  },
});