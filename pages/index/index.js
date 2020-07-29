const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
let util = require('../../utils/util.js')

const APP = getApp()
// // fixed首次打开不显示标题的bug
// APP.configLoadOK = () => {
//   wx.setNavigationBarTitle({
//     title: '家贝斯'
//   })
// }

Page({
  data: {
    inputVal: "", // 搜索框内容


    loadingHidden: false, // loading
    selectCurrent: 0,
   // goodsList: [],
    goodsList: [],
    goodsParams: {
      status: 1, // 已上架
      queryStr: '',
      pageNum: 1,
      pageSize: 10
    },
    scrollTop: 0,
    loadingMoreHidden: true,

    swiperCurrent: 0, // 当前滑块的index
    hiddenContactPop: true,
    bannerList: [],
    totalPage: 0,
    curretnPage: 0
  },

  
  toDetailsTap: function(e) {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  },
 

  onLoad: function(e) {
    wx.showShareMenu({
      withShareTicket: true
    })    
    this.initBanners();
    this.goodsDynamic();
   this.getGoodsList();
  },

   initBanners(){
     let that = this
     let requestData = {
       url: ApiConst.getBanner,
       data: {}
     }
    // 读取头部轮播图
     ApiManager.send(requestData, 'GET').then(res => {
      if(res.data.code == 1000){
        that.setData({
          bannerList: res.data.data
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '后台暂时还没有添加banner图！',
          showCancel: false
        })
      }
    })
  },
  onShow: function(e){
    this.initBanners();
    this.goodsDynamic();
    this.getGoodsList();
  },

   goodsDynamic(){
     let requestData = {
       url: ApiConst.getTop5GoodsDynamic,
       data: {}
     }
     ApiManager.send(requestData, 'GET').then(res => {
       if (res.data.code == 1000) {
        this.setData({
          goodsDynamic: res.data.data
        })
      }
    })
  },
 
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
  },
   getGoodsList() {
    
     let that = this
     let requestData = {
       url: ApiConst.getPageAllGoods,
       data: this.data.goodsParams 
       }
     ApiManager.send(requestData, 'GET').then(res => {
       if (res.data.code == 1000) {
         if (that.data.goodsParams.pageNum == 1) {
           that.setData({
             goodsList: res.data.data.list
           })
         } else {
           if (that.data.goodsList.length < res.data.data.totalCount) {
             let list = that.data.goodsList
             list = list.concat(res.data.data.list)
             that.setData({
               goodsList: list,
               loadingMoreHidden: true
             })
           } else {
             this.setData({
               loadingMoreHidden: false
             })
           }
         }
         if (res.data.data.list.length == 0) {
           this.setData({
             goodsList: []
           });
         }
         wx.stopPullDownRefresh()
       }
     })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({ goodsList: [] })
    this.setData({
      'goodsParams.pageNum': 1
    })
    this.getGoodsList()
  },
  // 上拉加载
  onReachBottom(ev) {
    if (this.data.totalPage > this.data.curretnPage) {
      this.setData({
        'goodsParams.pageNum': this.data.goodsParams.pageNum + 1
      })
      this.getGoodsList();
      wx.stopPullDownRefresh();
    }
  },
  


  bindinput(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  bindconfirm(e) {
    this.setData({
      inputVal: e.detail.value
    })
    console.log(this.data.inputVal)
    wx.navigateTo({
      url: '/pages/goods/list?name=' + this.data.inputVal,
    })
  },
  goSearch(){
    console.log(this.data.inputVal)
    wx.navigateTo({
      url: '/pages/goods/list?name=' + this.data.inputVal,
    })
  }
})