const app = getApp()
const ApiManager = require('../../../api/ApiManage.js')
const ApiConst = require('../../../api/ApiConst.js')
Page({
  data: {
    savePrice: 0.00,
    favCount: 0,
    orderCount: 0,
    iconSize: 45,
    iconColor: '#999999',
    userInfo: null
  },
  onPullDownRefresh: function() {

  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
        })
      }
    }
  },
  goLogin() {
    wx.navigateTo({
      url: '/pages/authorize/index',
    })
  },
  onShow() {
    //特殊方法 需要刷新数据
    var token = app.globalData.token
    if (token != '') {
      wx.request({
        url: ApiConst.getUser,
        method: 'get',
        header: {
          'token': app.globalData.token
        },
        success: res => {
          app.globalData.vipInfo = res.data.data
          var userInfo = res.data.data
          this.setData({
            userInfo: userInfo,
            savePrice: userInfo.userBase.savePrice,
            favCount: userInfo.userBase.favCount,
            orderCount: userInfo.userBase.orderCount
          })
        }
      })
    }

  },
  aboutUs: function() {
    var that = this
    wx.showModal({
      title: '家贝斯照明',
      content: '本产品只供给用户查询进行选购,具体支付方式在线下体验,如有任何问题,请联系我们,祝大家使用愉快!',
      showCancel: false
    })
  },
  skipFav: function() {
    if (!app.globalData.isLogin) {
      wx.navigateTo({
        url: '/pages/authorize/index',
      })
    } else {
      wx.navigateTo({
        url: '/pages/my/fav/fav',
      })
    }
  },
  skipOrder: function() {
    if (!app.globalData.isLogin) {
      wx.navigateTo({
        url: '/pages/authorize/index',
      })
    } else {
      wx.navigateTo({
        url: '/pages/my/order-list/index',
      })
    }
  },
  makePhoneCall: function() {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: '15827150785',
      success: function(res) {},
      fail: function(res) {
        wx.showModal({
          title: '呼叫失败',
          content: '请稍后再试',
          showCancel: false,
        })
      },
      complete: function(res) {},
    })
  },
  onShareAppMessage() {
    let _data = {
      title: '家贝斯照明',
      path: '/pages/index/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})