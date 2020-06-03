## 分包配置`app.json`
```
"pages": [
    "pages/welcome/welcome",
    "pages/index/index",
    "pages/movies/movies",
    "pages/switchcity/switchcity",
    "pages/weather/weather",
    "pages/news/news",
    "pages/movies/movie-detail/movie-detail",
    "pages/movies/more-movie/more-movie",
    "pages/map/map",
    "pages/logs/logs",
    "pages/more/more"
  ],
  "subpackages":[
    {
      "root":"packageA",
      "name":"pack1",
      "pages": [
        "pages/logs/logs"
      ]
    },{
      "root":"packageB",
      "name":"pack2",
      "pages": [
        "pages/share/share/share",
        "pages/share/index/index"
      ] 
    }
  ]
```

## 引用第三方组件库vant
```
npm init
```
生成一个 `package.json`
```
{
  "name": "miniprogram-demo",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
      "@vant/weapp": "^1.3.0"
  },
  "devDependencies": {}
}
```
```
npm install
```


- 开发者工具中->工具->构建npm
显示正在构建， 稍等片刻提示 构建 完成
## 引用 组件

```
"usingComponents": {
    "van-button": "@vant/weapp/button/index",
    "van-field": "@vant/weapp/field/index",
    "van-cell": "@vant/weapp/cell/index",
    "van-cell-group": "@vant/weapp/cell-group/index"
  }
```

```

 <navigator url="/pages/b/b?id=1&tu='a.jpg' " hover-class="none">
跳转到b
<navigator>


//b.js 页面接收参数
 onLoad: function (options) {       //options用于接收上个页面传递过来的参数
 var that = this;
that.setData({                             
  //this.setData的方法用于把传递过来的id转化成小程序模板语言
  b_id: options.id,   
  //id是a页面传递过来的名称，a_id是保存在本页面的全局变量   
  //{{b_id}}方法使用
})
}
```
## 小程序全局`project.config.json`的作用
```
{
    "description": "项目配置文件",  //描述
    "packOptions": {  //用以配置打包时对符合指定规则的文件或文件夹进行忽略
        "ignore": []
    },
    "setting": {  //项目设置
        "urlCheck": false,  //不检查安全域名和 TLS 版本
        "es6": true,  //启用 es6 转 es5
        "postcss": true,  //上传代码时样式自动补全
        "minified": true,  //上传代码时自动压缩
        "newFeature": true  //新特征，文档中未描述
    },
    "compileType": "miniprogram",  //编译类型，miniprogram为普通小程序项目
    "libVersion": "2.3.0",  //基础库版本
    "appid": "touristappid",  //AppID
    "projectname": "%E6%B5%85%E8%93%9D%E5%95%86%E5%9F%8EPRO",  //项目名字，只在新建项目时读取,urlDecode解码(路径解码)
    "debugOptions": {
        "hidedInDevtools": []  //配置调试时于调试器 Sources 面板隐藏源代码的hidedInDevtools 的配置规则和 packOptions.ignore 是一致的。
    },
    "scripts": {},  //自定义预处理的命令 beforeCompile编译前预处理命令、beforePreview预览前预处理命令、beforeUpload上传前预处理命令
    "condition": {  //编译模式，增加编译模式时，会添加到下面的对应数组
        "search": {   
            "current": -1,
            "list": []
        },
        "conversation": {
            "current": -1,
            "list": []
        },
        "plugin": {  //插件
            "current": -1,
            "list": []
        },
        "game": {  //小游戏
            "list": []
        },
        "miniprogram": {  //小程序
            "current": -1,
            "list": []
        }
    }
}
```
四.写在最后</br>
1.推荐几个小程序开发的资料</br>
（1）微信小程序---分包操作</br>
https://blog.csdn.net/wangzai888/article/details/88852116?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-3.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-3.nonecase
(2) Vant 轻量、可靠的移动端 组件库 https://youzan.github.io/vant/1.x/#/zh-CN/intro
（3）百度地图微信小程序JavaScript API  http://lbsyun.baidu.com/index.php?title=wxjsapi/guide/key
（4）知乎一篇小程序的资料：</br>
https://www.zhihu.com/question/50907897  </br>
（5）小程序社区</br>
http://www.wxapp-union.com/portal.php  </br>
（6）极乐小程序商店</br>
http://store.dreawer.com/  </br>

## 目录结构
components 组件
assets 公共样式和方法库
lib 第三方库
utils 自己帮助库 工具包
packageA 子包 a
packageA 子包 b


 

