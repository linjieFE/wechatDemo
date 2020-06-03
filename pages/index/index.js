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
      { name: "电动车租赁" },
      { name: "劳保用品" },
      { name: "保险购买" },
      { name: "消费借款" }
    ],
    location: '',
    county: '',
    sliderList: [
      { selected: true, imageSource: 'http://up.enterdesk.com/edpic/7d/35/13/7d3513ecabdf1f7eb4f1407f0e82f23c.jpg' },
      { selected: false, imageSource: 'http://pic1.win4000.com/wallpaper/9/538544be6ae36.jpg' },
      { selected: false, imageSource: 'http://pic1.win4000.com/wallpaper/9/538544be6ae36.jpg' },
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

  onLoad: function (options) {
    //更新当前日期
    app.globalData.day = util.formatTime(new Date()).split(' ')[0];
    this.setData({
      today: app.globalData.day
    });
    //定位当前城市
    this.getLocation();
    //获取豆瓣电影正在热映信息 已下架
    // var inTheatersUrl = app.globalData.doubanBase +
    //   "/v2/movie/in_theaters" + "?start=0&count=6";
    // this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");

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
        // wx.request({
        //   url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${app.globalData.tencentMapKey}`,
        //   success: res => {
        //     app.globalData.defaultCity = app.globalData.defaultCity ? app.globalData.defaultCity:res.data.result.ad_info.city;
        //     app.globalData.defaultCounty = app.globalData.defaultCounty ? app.globalData.defaultCounty :res.data.result.ad_info.district;
        //     that.setData({
        //       location: app.globalData.defaultCity,
        //       county: app.globalData.defaultCounty
        //     });
        //     that.getWeather();
        //     that.getAir();
        //   }
        // })
        api.gets( `${app.globalData.apiMap}/ws/geocoder/v1/?location=${latitude},${longitude}&key=${app.globalData.tencentMapKey}`, {}).then(res=>{
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