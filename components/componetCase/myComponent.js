// pages/component/myComponent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      innerText:{
        type:String,
        value:"自定义组件"
      }
  },
  externalClasses:['my-class'],

  /**
   * 组件的初始数据
   */
  data: {
    someData:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    customMethod:function() {
      console.log("调用了组件的方法")
      
    }
  }
})
