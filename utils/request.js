
// 封装的网络请求

const app = getApp()
const base = "http://localhost:9001/" // 开发环境
// const base = "https://luoch.cn/" // 生产环境

const env = require("../api/api_env.js")

const header = {
  POST: 'application/x-www-form-urlencoded',
  DELETE: 'application/json',
  GET: 'application/json',
  PUT: 'application/x-www-form-urlencoded'
}
function send(requestInfo, methodType) {
  if (!requestInfo) {
    return
  }
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: requestInfo.url,
      data: requestInfo.data,
      header: {
        'content-type': header[methodType], // 默认值
        'token': app.globalData.token
      },
      method: methodType,
      success(res) {
        if (res.data.code == 1000) {
          resolve(res)
        } else {
          util.loginTip(res.data.msg)
        }
      },
      fail(res) {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: data.msg,
          showCancel: false,
          confirmColor: '#F85110'
        })
      },
      complete(res) {
        wx.hideLoading()
      }
    })
  })
}
module.exports = {
  ApiUrl,
  send
};

