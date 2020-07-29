const app = getApp()
const ApiManager = require('../../../api/ApiManage.js')
const ApiConst = require('../../../api/ApiConst.js')
let util = require('../../../utils/util.js')

Page({
  data: {
    goods: [],
    isLogin: false,
  },
  onLoad: function(options) {},
  onShow: function() {
    this.setData({
      isLogin: app.globalData.isLogin
    })
    
    this.goodsFavList();



    // AUTH.checkHasLogined().then(isLogined => {
    //   this.setData({
    //     wxlogin: isLogined
    //   })
    //   if (isLogined) {
    //     this.goodsFavList()
    //   }
    // })
  },
  goodsFavList() {
    if (!app.globalData.isLogin) {
      wx.navigateTo({
        url: '/pages/authorize/index',
      })
    }
    // 搜索商品
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    let requestData = {
      url: ApiConst.getPreOrderByUserId,
      data: {}
    }
    ApiManager.send(requestData, 'GET').then(res => {
      if (res.data.code == 1000) {
        that.setData({
          goods: res.data.data
        })
      }


      wx.stopPullDownRefresh()
    })
  },
  //删除收藏
  removeFav(e) {
    const id = e.currentTarget.dataset.id

    let requestData = {
      url: ApiConst.updPreOrderIsCollect,
      data: {
        "id": id,
        "isCollect": 0
      }
    }
    ApiManager.send(requestData, 'POST').then(res => {
      if (res.data.code == 1000) {
        this.goodsFavList();
        wx.showToast({
          title: '取消收藏',
          icon: 'success',
        })
      }
    })
  },
})