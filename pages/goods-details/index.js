const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
let util = require('../../utils/util.js')
const app = getApp();
Page({
  data: {
    goodsDetail: {},
    goodsId: 0,
    hideShopPopup: true,
    isLogin: app.globalData.isLogin,
  },
  onLoad: function (options) {
    this.setData({
      goodsId: options.id
    })
    this.getGoodsDetail()
  },

  onShow:function(){
    this.setData({
      isLogin: app.globalData.isLogin
    })
  },

  getGoodsDetail() {
   
    wx.showLoading({
      title: '加载中',
    })
    
    let that = this
    let requestData = {
      url: ApiConst.getGoodsById,
      data: { "id": that.data.goodsId}
    }
    ApiManager.send(requestData, 'GET').then(res => {
      if (res.data.code == 1000) {
        that.setData({
          goodsDetail: res.data.data
        })
        wx.stopPullDownRefresh()
      }
    })
  },

//联系店家
  makePhoneCall: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: '15827150785',
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
  // 图片点击放大 
  previewImg: function (e) {
    var src = e.currentTarget.dataset.src;//获取data-src  循环单个图片链接
    var detailImgs = this.data.goodsDetail.detailImg;//   图片列表
    var imgs = [];

    for (var i = 0; i < detailImgs.length; i++){
      imgs.push(detailImgs[i].url);
    }
    console.log(imgs)
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },

  addPreOrder:function(e) {
    var that = this
    var isCollect = e.currentTarget.dataset.iscollect;
    //添加收藏
    if(isCollect == 1){
      //判断是否登录
      if (!app.globalData.isLogin){
        wx.navigateTo({
          url: '/pages/authorize/index',
        })
      }else{
        let requestData = {
          url: ApiConst.addPreOrder,
          data: {
            "goodsId": that.data.goodsId,
          }
        }
        ApiManager.send(requestData, 'POST').then(res => {
          if (res.data.code == 1000) {
            this.getGoodsDetail();
            wx.showToast({
              title: '操作成功',
              icon: 'none',
              duration: 1000
            })
          }
        })
      }
     

    }else{
    //删除收藏
      let requestData = {
        url: ApiConst.updPreOrderIsCollect,
        data: { 
          "id": that.data.goodsId,
          "isCollect": isCollect
         }
      }
      ApiManager.send(requestData, 'POST').then(res => {
        if (res.data.code == 1000) {
          this.getGoodsDetail();
          wx.showToast({
            title: '操作成功',
            icon: 'none',
            duration: 1000
          })
          
        }
       
      })
    }
    
    
  },
})
