//logs.js
var util = require('../../../utils/util')
Page({
  data: {
    logs: []
  },
  onLoad: function (options) {
    console.log('跳转传递参数', options)
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  },
  unLoad: function(){
    console.log("log unmout");
  }
})
