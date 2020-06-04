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
  },

   ////触摸事件，判断单击还是双击
   mytap: function(e){
    var curTime = e.timeStamp;
    var lastTime = this.data.lastTapDiffTime;
    if(lastTime > 0){
      //如果两次单击间隔小于300毫秒，认为是双击
      if(curTime - lastTime < 300){
        console.log(e.timeStamp + '- db tap')
      }else{
        console.log(e.timeStamp + '- tap')
      }
    }else{
      console.log(e.timeStamp + '- first tap')
    }
    this.setData({lastTapDiffTime: curTime});
  },
  //识别长按
  mylongtap: function(e){
    console.log(e.timeStamp + '- long tap 识别长按')
  },
  //触摸开始
  mytouchstart: function(e){
    console.log(e.timeStamp + '- touch start 触摸开始')
    console.log(e.touches.length);
    this.setData({startPoint: [e.touches[0].pageX, e.touches[0].pageY]});
  },
  //触摸点移动
  mytouchmove: function(e){
    //当前触摸点坐标
    var curPoint = [e.touches[0].pageX,e.touches[0].pageY];
    var startPoint = this.data.startPoint;
    if(curPoint[0] <= this.data.startPoint[0]){
      if(Math.abs(curPoint[0]-startPoint[0])>= Math.abs(curPoint[1]-startPoint[1])){
        console.log(e.timeStamp + '- touch left move 触摸点移动')
      }else{
        if(curPoint[1]>= startPoint[1]){
          this.setData({btnWidth: this.data.btnWidth-1})
          console.log(e.timeStamp + '- touch down move 向下移动')
        }else{
          this.setData({btnWidth: this.data.btnWidth+1})
          console.log(e.timeStamp + '- touch up move 向上移动')
        }
      }
    }else{
      if(Math.abs(curPoint[0]-startPoint[0])>= Math.abs(curPoint[1]-startPoint[1])){
        console.log(e.timeStamp + '- touch right move 向右移动')
      }else{
        if(curPoint[1]>= startPoint[1]){
          this.setData({btnWidth: this.data.btnWidth-1})
          console.log(e.timeStamp + '- touch down move')
        }else{
          this.setData({btnWidth: this.data.btnWidth+1})
          console.log(e.timeStamp + '- touch up move')
        }
      }
    }
  },
  //触摸被中断
  mytouchcacel: function(e){
    console.log(e.timeStamp + '- touch cancel 触摸被中断')
    
  },
  //触摸结束
  mytouchend: function(e){
    console.log(e.timeStamp + '- touch end 触摸结束')
    
  }
})