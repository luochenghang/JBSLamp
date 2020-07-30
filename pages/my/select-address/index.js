const app = getApp()
const ApiManager = require('../../../api/ApiManage.js')
const ApiConst = require('../../../api/ApiConst.js')

Page({
  data: {
    addressList:[]
  },

  addAddess : function () {
    wx.navigateTo({
      url:"/pages/my/address-add/index"
    })
  },
  
  editAddess: function (e) {
    wx.navigateTo({
      url: "/pages/my/address-add/index?id=" + e.currentTarget.dataset.id
    })
  },
 
  
  onLoad: function () {
    
  },
  onShow : function () {
    this.initShippingAddress();
  },
  initShippingAddress: function () {
    var that = this
    let requestData = {
      url: ApiConst.getAddressList,
      data: {
      }
    }
    ApiManager.send(requestData, 'GET').then(res => {
      that.setData({
        addressList: res.data.data
      })
    })
  }

})
