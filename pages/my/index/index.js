const app = getApp()

Page({
  data: {
    balance: 0,
    freeze: 0,
    score: 0,
    score_sign_continuous: 0,
    iconSize: 45,
    iconColor: '#999999'
  },
  onPullDownRefresh: function () {
    
  },
  onLoad() {

    var userInfo = app.globalData.vipInfo
    console.log(app.globalData.vipInfo);
    
    if (userInfo) {
      that.setData({
        userInfo: userInfo,
      })
    }
  },
  goLogin(){
    wx.navigateTo({
      url: '/pages/authorize/index',
    })
  },
  onShow() {

    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      that.setData({
        userInfo: userInfo,
      })
    }

  },
  aboutUs: function () {
    var that = this
    wx.showModal({
      title: '家贝斯照明',
      content: '本产品只供给用户查询进行选购,具体支付方式在线下体验,如有任何问题,请联系我们,祝大家使用愉快!',
      showCancel: false
    })
  },
  makePhoneCall: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: '18818569663',
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
  onShareAppMessage() {
    let _data = {
      title: '家贝斯照明',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})