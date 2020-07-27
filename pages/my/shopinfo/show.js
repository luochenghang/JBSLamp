const app = getApp();

Page({
  data: {
  
  },
  onLoad: function (options) {
   
  },
  onShareAppMessage() {
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