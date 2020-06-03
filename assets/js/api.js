const app = getApp()

const request = (url, options) => {
  var mydata = options.data || {};
  //自动添加appid
  // mydata['appId'] = app.globalData.appId;
  var requereUrl= url.includes('http')? url :`${app.globalData.host}${url}`
  console.log(requereUrl)
  return new Promise((resolve, reject) => {
    wx.request({
      ...options,
      url: requereUrl,
      method: options.method,
      data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
      header:{
        'Content-Type': 'application/json; charset=UTF-8'
        // 'x-token': 'x-token'  // 看自己是否需要
      },
      success(request) {
        // if (request.data.error_code === 0) {
          resolve(request.data)
        // } else {
        //   reject(request.data)
        // }
      },
      fail(error) {
        reject(error.data)
      },
      complete: function(data) {
        // complete
        console.log(data)
      }
    })
  })
}

const gets = (url, options = {}) => {
  return request(url, { method: 'GET', data: options })
}

const post = (url, options = {}) => {
  return request(url, { method: 'POST', data: options })
}

//HTTP 1.1 PUT方法请求里的实体头域应该被用于资源的创建或修改。
const put = (url, options) => {
  return request(url, { method: 'PUT', data: options })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
  return request(url, { method: 'DELETE', data: options })
}

module.exports = {
  gets,
  post,
  put,
  remove
}
