App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
      /** onlaunch方法有三大功能，
       * 浏览器缓存进行存和取数据；
       * 用登陆成功的回调；
       * 获取用户信息。*/
      //调用API从本地缓存中获取数据
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      console.log('小程序正在启动...')
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  // globalData是定义整个项目的全局变量或者常量
  globalData: {
    userInfo:null,
    host:'https://localhost:8443/test-weappservice/api/v1',
    // server: 'https://localhost:8443/weappservice/api/v1',
    appId: 'wxf7403466434f62ee',
    lastStartTime: new Date(),
    defaultCity: '',
    defaultCounty: '',
    weatherData: '',
    air: '',
    day: '',
    // 腾讯位置服务https://lbs.qq.com/webApi/uriV1/uriGuide/uriWebMarker
    apiMap:"https://apis.map.qq.com",
    heWeatherBase: "https://free-api.heweather.com",// 和风天气API
    juhetoutiaoBase:"https://v.juhe.cn/toutiao/index",///聚合数据
    tencentMapKey: "4HYBZ-EB23D-SLC42-HQ5R3-LP3LQ-OZFU5",//腾讯地图key
    heWeatherKey: "25bfed385c0f4646ab316f10e7a2f4fc",//注册和风天气创建免费应用key
    juhetoutiaoKey:"a9f703a0200d68926f707f3f13629078"//聚合数据key
  }

})
