const ApiManager = require('../../../api/ApiManage.js')
const ApiConst = require('../../../api/ApiConst.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    id:null
  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  bindSave: function (e) {
    console.log(e)
    var that = this;
    var linkMan = e.detail.value.linkMan;
    var address = e.detail.value.address;
    var mobile = e.detail.value.mobile;

    if (linkMan == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (mobile == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return
    }
    if (address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    }
    var params = {
      'linkMan': linkMan,
      'address': address,
      'mobile': mobile
    }

    if (that.data.id != null){
      params = {
        'id': that.data.id,
        'linkMan': linkMan,
        'address': address,
        'mobile': mobile
      }
    }
    let requestData = {
      url: ApiConst.addAddress,
      data: params
    }
    console.log(params)
    ApiManager.send(requestData, 'POST').then(res => {
      wx.showToast({
        title: '操作成功',
        icon: 'success',
        duration: 1000
      })
      setTimeout(function () { wx.navigateBack({}); }, 1000);
    })
  },
  onLoad: function (e) {
    var that = this;
    var id = e.id;
    if (id) {
      // 初始化原数据
      that.setData({
        id: id
      })
      wx.showLoading();
      let requestData = {
        url: ApiConst.getAddressById,
        data: {
          "id":id
        }
      }

     
      ApiManager.send(requestData, 'GET').then(res => {
        that.setData({
          address: res.data.data
        })
      })
    }
  },
  deleteAddess: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除该收货地址吗？',
      success: function (res) {
        if (res.confirm) {

          var id = that.data.id;
          let requestData = {
            url: ApiConst.deleteAddess,
            data: {
              "id": id
            }
          }
          ApiManager.send(requestData, 'POST').then(res => {
            
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () { wx.navigateBack({}); }, 1000);
          })
        }
      }
    })


  },
})
