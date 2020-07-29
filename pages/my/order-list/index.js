const app = getApp()
const ApiManager = require('../../../api/ApiManage.js')
const ApiConst = require('../../../api/ApiConst.js')
let util = require('../../../utils/util.js')

Page({
  data: {
    statusType: [{
        status: null,
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
    status: null,
    orderList: [],
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
  },
  onReady: function() {
    // 生命周期函数--监听页面初次渲染完成

  },

  onShow: function() {

    if (!app.globalData.isLogin) {
      wx.navigateTo({
        url: '/pages/authorize/index',
      })
    }
    this.doneShow();
  },
  doneShow() {
    // 获取订单列表
    // 搜索商品
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    var status = {
    };
    if (this.data.status != null){
      status = {
        'status': this.data.status
      }
    }

    let requestData = {
      url: ApiConst.getAllOrderByUserId,
      data: status
    }
    ApiManager.send(requestData, 'GET').then(res => {
      if (res.data.code == 1000) {
        that.setData({
          orderList: res.data.data
        })
      }
      wx.stopPullDownRefresh()
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