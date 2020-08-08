// pages/welcome/welcome.js
var app = getApp()
Page({
  data: {
    count:"0",//订餐次数
    userInfo: {},
    //
    // code: this.$route.query.conde,
    // state: this.$route.query.state,
    name: '',
    assemble: true,
    endTime: '', // 结束时间
    startTime: '',
    supplier: '', // 供应商
    supplierId: '',
    columns: [],
    timePickerStatus:false,
    supplierPicker: false,
    workplacePicker: false,
    workplace: '', // 职场
    businessBuildId: '',
    workplaceColumns: [],
    arriveTime: '',
    isLoading: false,
    list: [
      {
        groupCover:"http://img.weitoolsbox.com/head.jpeg",
        groupName:"郑老师",
        endTime:"2020-2-2 19:23:34",
        joinCount:"3",
        endTime:"19:23"
      }
    ],
    timeShow: 1,
    count: 0,
    test: {},
    showBusiness:false,//管理员：true 用户：false
    showAdd:true//管理员：true 用户：false
  },
  onLoad: function (options) {    
      if (this.user.userRole) {
        for (const value of this.user.userRole) {
          if (value.roleCode === "group") {
            this.showAdd= true
          }
        }
        this.showAdd= false;
      } else {
        this.showAdd= false;
      }
    
    if (this.user.userRole) {
      for (const value of this.user.userRole) {
        if (value.roleCode === "supplier") {
          this.showBusiness=true
        }
      }
      this.showBusiness=false
    } else {
      this.showBusiness=false
    }
   
    
    // 查询接口
    // wx.request({
    //   url: '/api/groupInfo/findGroupsForUser',
    //   data: {

    //   },
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     if (res.data.error_code == 0) {
    //       that.setData({
    //         topNews: res.data.result.data
    //       })
    //     } else {
    //       console.log('获取失败');
    //     }
    //   }
    // })
  },
 // 管理填加菜单
  onAdd:function() {
    this.setData({
      assemble:false
    })
    // findBusinessBuildsByCondition().then(({
    //   code,
    //   data
    // }) => {
    //   if (code === '000000') {
    //     this.workplaceColumns = data
    //   }
    // })
    // findSuppliersByCondition().then(({
    //   code,
    //   data
    // }) => {
    //   if (code === '000000') {
    //     this.columns = data
    //   }
    // })

  },
  toOrder:function(){
    wx.navigateTo({
      url:'../../pages/order'
    })
  },
  showSignOut:function(){
    
  },
  //获取订单列表
  handleList() {
    this.isLoading = true;
    findGroupsForUser().then(({
      code,
      data
    }) => {
      if (code === '000000') {
        this.list = data
      }
    }).finally(() => {
      this.isLoading = false;
    })
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
  
})