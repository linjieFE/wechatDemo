// pages/component/myComponent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      innerText:{
        type:String,
        value:"自定义组件"
      },
      innerList:{
        type:Array,
        value:[]
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
    customMethod:function(e) {
      //子传你
      /**
       * 1.绑定事件
       * 2.获取索引
       * 3.触发你组件的自定义事件，是时传数据给父
       * this.triggerEvent('父组件自定义事件名称','要传递的参数')
       */
      console.log("调用了组件的方法",e)
      let {index} = e.currentTarget.dataset
      //获取data中的数组 properties
      let {innerList} = this.data
      //[].forEach遍历数组的时候修改了v,也会修改原数组
      innerList.forEach((v,i)=>i===index?v.active=true:v.active=false)
      this.setData({
        innerList
      })
      this.triggerEvent('itemChange',{index})
    }
  }
})
