// pages/welcome/welcome.js
var app = getApp()
Page({
  data: {
    motto: 'hi!举个栗子吧！',
    userInfo: {}
  },
  bindNext:function(){
    wx.navigateTo({
      url:'../../packageA/pages/logs/logs?id=1'
    })
  },
  bindNext2:function(){
    wx.navigateTo({
      url:'../../packageB/pages/share/index/index?id=1'
    })
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('载入页面')
    var that = this
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onReady: function(){
    console.log('页面首次渲染完成')
  },
  onShow: function () {
    console.log('显示页面')
    //console.log(getApp().globalData.lastStartTime)
  },
  onHide: function () {
    console.log('隐藏页面')
  },
  onUnload: function(){
    console.log('卸载页面')
  },
  onPullDownRefreash: function(){
    console.log('页面下拉刷新')
  },
  clickLogo:function(){
    wx.reLaunch({
      url: '../index/index'
    });
  },

  onShareAppMessage: function () {
    return {
      title: 'e 生活',
      desc: '还没进去就想分享？我就喜欢你这样的老铁☺️',
      success: function (res) {
        wx.showToast({
          title: "分享成功",
          duration: 1000,
          icon: "success"
        })
      }
    }
  }
})