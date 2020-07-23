const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
let util = require('../../utils/util.js')
const app = getApp();
Page({
  data: {
    wxlogin: true,

    goodsDetail: {},
    goodsId: 0,
    hasMoreSelect: false,
    selectSize: null,
    selectSizePrice: 0,
    selectSizeOPrice: 0,
    totalScoreToPay: 0,
    shopNum: 0,
    hideShopPopup: true,
    buyNumber: 0,
    buyNumMin: 1,
    buyNumMax: 0,

    propertyChildIds: "",
    propertyChildNames: "",
    canSubmit: false, //  选中规格尺寸时候是否允许加入购物车
    shopType: "addShopCar", //购物类型，加入购物车或立即购买，默认为加入购物车
  },
  onLoad: function (options) {
    this.setData({
      goodsId: options.id
    })
    this.getGoodsDetail()
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
  // 图片点击放大 
  previewImg: function (e) {
    var src = e.currentTarget.dataset.src;//获取data-src  循环单个图片链接
    var imgList = e.currentTarget.dataset.effect_pic;//获取data-effect_pic   图片列表
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
})
