//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindNext:function(){
    //这里用navigateTo 会报错 超过限制的数量导致的，navigationTo会保留当前页，当保留页数超过上线了就会报错，跳转页数多时不防尝试redirectTo
    wx.reLaunch({
      url: '../../../../pages/welcome/welcome.js  '
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShareAppMessage: function(){
    return {
      title: 'Hello World',
      desc: '小程序分享',
      path: '/pages/share/share?id=123'
    }
  },
  scanqr: function(e){
    wx.scanCode({
      success: function(res){
        // success
        console.log(res)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})
