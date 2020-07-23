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
    bannerList: [{ "id": 3, "objId": 0, "type": 1, "typeDesc": "首页banner轮播图！", "status": 0, "sort": 3, "url": "https://luoch.cn/sources/2020-07-09/7c81949cb7cc4381b079b48881b12601.jpg", "createDate": "2020-07-09 00:14:19" }, { "id": 4, "objId": 0, "type": 1, "typeDesc": "首页banner轮播图！", "status": 1, "sort": 3, "url": "https://luoch.cn/sources/2020-07-09/95a6586ca55844e58dfabadd6ecfaca4.jpg", "createDate": "2020-07-09 00:14:46" }, { "id": 5, "objId": 0, "type": 1, "typeDesc": "首页banner轮播图！", "status": 1, "sort": 1, "url": "https://luoch.cn/sources/2020-07-09/766cf3b73f0b4ba08aa46b06eeb98ba1.jpg", "createDate": "2020-07-09 00:22:31" }, { "id": 6, "objId": 0, "type": 1, "typeDesc": "首页banner轮播图！", "status": 1, "sort": 3, "url": "https://luoch.cn/sources/2020-07-09/10d2428377e34c2d9a56e247d46f1e87.jpg", "createDate": "2020-07-09 00:23:52" }],
    totalPage: 0,
    curretnPage: 0
  },

  
  toDetailsTap: function(e) {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  },
  tapBanner: function(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url
      })
    }
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
    wx.navigateTo({
      url: '/pages/goods/list?name=' + this.data.inputVal,
    })
  },
  goSearch(){
    wx.navigateTo({
      url: '/pages/goods/list?name=' + this.data.inputVal,
    })
  }
})