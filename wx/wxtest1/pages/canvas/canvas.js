// pages/canvas/canvas.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var context = wx.createCanvasContext('firstCanvas');

    // 设置绘制的图形边框颜色
    context.setStrokeStyle('#00ff00');
    // 设置绘制图形的线条宽度
    context.setLineWidth(5);
    // 设置一个高度为200px的矩形
    context.rect(0, 0, 200, 200);
    // 勾勒画出边框
    context.stroke();
    // 在重新设置即将要回值的图形边框颜色
    context.setStrokeStyle("#ff0000");
    // 童颜，重新设置绘制图形的线条宽度
    context.setLineWidth(2);
    // 将路径移动到画布中的制定点（160，100）
    context.moveTo(160, 100);
    // 在坐标点（100，100）处，顺时针画一个半径为60px的圆
    context.arc(100, 100, 60, 0, 2 * Math.PI, true);
    // 将路径移动到画布中的指定点（140,100）
    context.moveTo(140, 100);
    // 在坐标点（100，100）顺时针画一个半径为40px的半圆
    context.arc(100, 100, 40, 0, Math.PI, false);
    // 勾勒出之前的图形路径
    context.stroke();
    // 绘制
    context.draw();
  }
})