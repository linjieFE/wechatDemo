var api = require('../../assets/js/api')
Page({
  data: {
    selsectState: [0, 0, 0, 0, 0],
    selectIndex: 0
  },

  onLoad: function (options) {

  },

  //点击词典图标
  clickDict: function () {
    this.setData({
      selsectState: [1, 0, 0, 0, 0],
      selectIndex: 1
    });
    wx.showToast({
      title: "还没空做啊🤣",
      duration: 3000,
      icon: "success"
    })
  },
  //点击快递图标
  clickExpre: function () {
    this.setData({
      selsectState: [0, 1, 0, 0, 0],
      selectIndex: 2
    });
    wx.showToast({
      title: "还没空做啊🤣",
      duration: 3000,
      icon: "success"
    })
  },
  //点击更多图标
  clickMore: function () {
    this.setData({
      selsectState: [0, 0, 1, 0, 0],
      selectIndex: 3
    });
    wx.showActionSheet({
      itemList: [
        "给你个小彩蛋~"
      ],
      itemColor: "#405f80",
      success: function (res) {
        wx.navigateTo({
          url: '../welcome/welcome'
        });
      }
    })
  },

  //点击github
  clickGithub: function () {
    this.setData({
      selsectState: [0, 0, 0, 1, 0],
      selectIndex: 4
    });
  },
  //点击博客园
  clickBlog: function () {
    this.setData({
      selsectState: [0, 0, 0, 0, 1],
      selectIndex: 5
    });
  },
  onReady:function(){
    var context = wx.createContext()

    //缩放
    context.rect(5, 5, 30, 30)
    context.stroke()
    context.scale(2,2)
    context.stroke()
    context.scale(2,2)
    context.stroke()
    wx.drawCanvas({
      canvasId: 'canvas_scale',
      actions: context.getActions()
    })
    context.clearActions()

    //旋转
    context.rect(30, 30, 100, 100)
    context.stroke()
    context.rotate(0.15)
    context.stroke()
    wx.drawCanvas({
      canvasId: 'canvas_rotate',
      actions: context.getActions()
    })
    context.clearActions()
    
    //平移
    context.rect(30, 30, 100, 100)
    context.stroke()
    context.translate(10, 10)
    context.stroke()
     wx.drawCanvas({
      canvasId: 'canvas_translate',
      actions: context.getActions()
    })
  },
  onShareAppMessage: function () {
    return {
      title: '期待更多功能~',
      desc: '分享个小程序，希望你喜欢☺️~',
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