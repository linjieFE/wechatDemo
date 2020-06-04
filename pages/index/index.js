var app = getApp();
var util = require('../../utils/util');
var api = require('../../assets/js/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //components 数据
    items:[
      { name: "电动车租赁",active:true},
      { name: "劳保用品", active:false},
      { name: "保险购买", active:false},
      { name: "消费借款", active:false }
    ],
    location: '',
    county: '',
    sliderList: [
      { selected: true, imageSource: 'https://zxr.gdjr.gd.gov.cn/newsimages/f38566acc57d4edf94ef7ee183a276dc.jpg' },
      { selected: false, imageSource: 'https://zxr.gdjr.gd.gov.cn/newsimages/671275fd59b64a9a9f9cd4b4b020e554.png' },
      { selected: false, imageSource: 'https://zxr.gdjr.gd.gov.cn/newsimages/03e2efbbafb94ccc9bcaec6b3bf15f18.jpg' },
    ],
    today: "",
    inTheaters: {
      stars:[
        { score:'0'},
        { score:'0'}
      ],
      score:'0'
    },
    containerShow: true,
    weatherData: '',
    air: '',
    dress: ''
  },
  //子组件自定义事件
  hanlerItemChange(e){
    console.log('父组件收到的数据',e)
    let {index} = e.detail
    let {items} = this.data
    items.forEach((v,i)=>i===index?v.active=true:v.active=false)
  },
  onLoad: function (options) {
   
    //更新当前日期
    app.globalData.day = util.formatTime(new Date()).split(' ')[0];
    this.setData({
      today: app.globalData.day
    });
    //定位当前城市
     /**
     * 缓存
     * 一定时间内不用重新请求
     */
    const Cates = wx.getStorageSync("cates")
    if(!Cates){
      //不存在重新请求
      this.getLocation()
      //到getLocation方法体中保存
    }else{
      //有储存判断时间定义10s
      if(Date.now()-Cates.time>1000*30){
        console.log("缓存数据超时30S")
        this.getLocation()
      }else{
        console.log("我是缓存数据")
        app.globalData.defaultCity = Cates.data.ad_info.city;
        app.globalData.defaultCounty = Cates.data.ad_info.district;
        this.setData({
          location: app.globalData.defaultCity,
          county: app.globalData.defaultCounty
        });
        this.getWeather();
        this.getAir();
      }
    }

    //获取用户信息
    wx.getUserInfo({
      success: function (res) {
        var log = Date.now();
        res.userInfo.logtime = util.formatTime(new Date(log));
        var userInfos = wx.getStorageSync('userInfos') || [];
        userInfos.unshift(res.userInfo);
        wx.setStorageSync('userInfos', userInfos);
      }
    })

  },


  //定位当前城市
  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //当前的经度和纬度
        let latitude = res.latitude
        let longitude = res.longitude

        api.gets(`${app.globalData.apiMap}/ws/geocoder/v1/?location=${latitude},${longitude}&key=${app.globalData.tencentMapKey}`, {}).then(res=>{
            //不存在类型转换 存什么类型获取时候什么类型不必序列化
            wx.setStorageSync('cates', {time:Date.now(), data:res.result})
            console.log("已经缓存数据")
            app.globalData.defaultCity = app.globalData.defaultCity ? app.globalData.defaultCity:res.result.ad_info.city;
            app.globalData.defaultCounty = app.globalData.defaultCounty ? app.globalData.defaultCounty :res.result.ad_info.district;
            that.setData({
              location: app.globalData.defaultCity,
              county: app.globalData.defaultCounty
            });
            
            that.getWeather();
            that.getAir();
        }).catch(err=>{
          console.log("出现错误")
        })
      }
    })
  },


  //获取天气
  getWeather: function (e) {
    var length = this.data.location.length;
    var city = this.data.location.slice(0, length-1); //分割字符串
    console.log(city);
    var that = this;
    var param = {
      key: app.globalData.heWeatherKey,
      location: city
    };
    //发出请求
    wx.request({
      url: app.globalData.heWeatherBase + "/s6/weather",
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        app.globalData.weatherData = res.data.HeWeather6[0].status == "unknown city" ? "" : res.data.HeWeather6[0];
        var weatherData = app.globalData.weatherData ? app.globalData.weatherData.now : "暂无该城市天气信息";
        var dress = app.globalData.weatherData ? res.data.HeWeather6[0].lifestyle[1] : { txt: "暂无该城市天气信息"};
        that.setData({
          weatherData: weatherData, //今天天气情况数组 
          dress: dress //生活指数
        });
      }
    })
  },
  //获取当前空气质量情况
  getAir: function (e) {
    var length = this.data.location.length;
    var city = this.data.location.slice(0, length - 1);
    var that = this;
    var param = {
      key: app.globalData.heWeatherKey,
      location: city
    };
    wx.request({
      url: app.globalData.heWeatherBase + "/s6/air/now",
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        app.globalData.air = res.data.HeWeather6[0].status == "unknown city" ? "" : res.data.HeWeather6[0].air_now_city;
        that.setData({
          air: app.globalData.air
        });
      }
    })
  },

  //点击更改定位切换到城市页面
  jump: function () {
    //关闭本页去切换城市，返回时就可以重新初始化定位信息 
    /**
     * reLaunch 设置页面只能重新定向到欢迎页面
     */
    wx.reLaunch({
      url: '../switchcity/switchcity'
    });
  },

  //点击天气跳转到天气页面
  gotoWeather: function () {
    wx.navigateTo({
      url: '../weather/weather'
    });
  },

  //轮播图绑定change事件，修改图标的属性是否被选中
  switchTab: function (e) {
    var sliderList = this.data.sliderList;
    var i, item;
    for (i = 0; item = sliderList[i]; ++i) {
      item.selected = e.detail.current == i;
    }
    this.setData({
      sliderList: sliderList
    });
  },

  // 用户点击右上角分享
  onShareAppMessage: function () {
    return {
      title: 'e 生活',
      desc: '分享个小程序，希望你喜欢☺️~',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: "分享成功",
          duration: 1000,
          icon: "success"
        })
      }
    }
  }
})