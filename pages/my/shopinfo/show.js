const app = getApp();
const ApiManager = require('../../../api/ApiManage.js')
const ApiConst = require('../../../api/ApiConst.js')
let util = require('../../../utils/util.js')
Page({
  data: {
    shopInfo:null
  },
  onLoad: function (options) {
   
  },
  onShareAppMessage() {
  },
  onShow: function () {
    var that = this
    let requestData = {
      url: ApiConst.getShopInfo,
      data: {}
    }
    ApiManager.send(requestData, 'GET').then(res => {
      that.setData({
        shopInfo: res.data.data
      })
    })
  },
  makePhoneCall: function (e) {
    let number = e.currentTarget.dataset.number
    var that = this;
    wx.makePhoneCall({
      phoneNumber: number,
      success: function (res) { },
      fail: function (res) {
        wx.showModal({
          title: '呼叫失败',
          content: '请稍后再试',
          showCancel: false,
        })
      },
      complete: function (res) { },
    })
  },
})