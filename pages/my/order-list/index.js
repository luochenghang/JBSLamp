const app = getApp()
const ApiManager = require('../../../api/ApiManage.js')
const ApiConst = require('../../../api/ApiConst.js')
let util = require('../../../utils/util.js')

Page({
  data: {
    statusType: [
      {
        status: 9999,
        label: '全部'
      },
      {
        status: 0,
        label: '未完成'
      },
      {
        status: 1,
        label: '已完成'
      }
    ],
    status: 9999,
    orderList:[],
    badges: [0, 0, 0, 0, 0]
  },
  statusTap: function(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      status
    });
    this.onShow();
  },
  
  onLoad: function(options) {
    this.onShow();
  },
  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成

  },
  
  onShow: function() {
    // AUTH.checkHasLogined().then(isLogined => {
    //   if (isLogined) {
    //     this.doneShow();
    //   } else {
    //     wx.showModal({
    //       title: '提示',
    //       content: '本次操作需要您的登录授权',
    //       cancelText: '暂不登录',
    //       confirmText: '前往登录',
    //       success(res) {
    //         if (res.confirm) {
    //           wx.switchTab({
    //             url: "/pages/my/index"
    //           })
    //         } else {
    //           wx.navigateBack()
    //         }
    //       }
    //     })
    //   }
    // })
  },
  doneShow() {
    // 获取订单列表
    var that = this;
    var postData = {
      token: wx.getStorageSync('token')
    };
    if (this.data.hasRefund) {
      postData.hasRefund = true
    }
    if (!postData.hasRefund) {
      postData.status = that.data.status;
    }
    if (postData.status == 9999) {
      postData.status = ''
    }
    this.getOrderStatistics();
    WXAPI.orderList(postData).then(function(res) {
      if (res.code == 0) {
        that.setData({
          orderList: res.data.orderList,
          logisticsMap: res.data.logisticsMap,
          goodsMap: res.data.goodsMap
        });
      } else {
        that.setData({
          orderList: null,
          logisticsMap: {},
          goodsMap: {}
        });
      }
    })
  },
  onHide: function() {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数

  }
})