//logs.js
var util = require('../../../utils/util')
Page({
  data: {
    logs: [],
    timer:null
  },
  onLoad: function (options) {
    console.log('跳转传递参数', options)
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
    console.log(this.data.logs)
  },
  unLoad: function(){
    console.log("log unmout");
  },
  clearStorageSync(){
    wx.setStorageSync('logs', [])
    console.log("已清除本地日志")
    this.setData({//用于将数据从逻辑层发送到视图层（异步）
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      wx.reLaunch({
        url: '../../../pages/index/index',
      })
    }, 2000);
  }
})
