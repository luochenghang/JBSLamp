const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
let util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listType: 1, // 1为1个商品一行，2为2个商品一行    
    name: '', // 搜索关键词
    orderBy: '', // 排序规则
<<<<<<< HEAD
    goodsList: [],
=======
    goodsList: [{ "id": 1, "title": "这是我的第一个商品", "goodsTypeId": 63, "typeDesc": "客厅灯", "coverImg": "https://luoch.cn/sources/2020-07-09/7c81949cb7cc4381b079b48881b12601.jpg", "status": 1, "costPrice": 300.0, "sellPrice": 400.0, "sellCount": 0, "detailImg": [], "bannerImg": [], "updateDate": "2020-07-23 17:16:00" }, { "id": 1, "title": "这是我的第一个商品", "goodsTypeId": 63, "typeDesc": "客厅灯", "coverImg": "https://luoch.cn/sources/2020-07-09/7c81949cb7cc4381b079b48881b12601.jpg", "status": 1, "costPrice": 300.0, "sellPrice": 400.0, "sellCount": 0, "detailImg": [], "bannerImg": [], "updateDate": "2020-07-23 17:16:00" }, { "id": 1, "title": "这是我的第ddd是我的第dddddd是我的第dddddddddd一个商品", "goodsTypeId": 63, "typeDesc": "客厅灯", "coverImg": "https://luoch.cn/sources/2020-07-09/7c81949cb7cc4381b079b48881b12601.jpg", "status": 1, "costPrice": 300.0, "sellPrice": 400.0, "sellCount": 0, "detailImg": [], "bannerImg": [], "updateDate": "2020-07-23 17:16:00" }],
>>>>>>> 85530990742952d07eff28d86bc58b8b1385a49e
    goodsParams: {
      status: 1, // 已上架
      queryStr: '',
      orderBy: '',
      pageNum: 1,
      pageSize: 20
    },
    scrollTop: 0,
    loadingMoreHidden: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
<<<<<<< HEAD

    this.setData({
      name:options.name,
      'goodsParams.queryStr': options.name
    })
    this.search()
=======
    this.setData({
      'goodsParams.queryStr': options.name
    })
   // this.search()
>>>>>>> 85530990742952d07eff28d86bc58b8b1385a49e
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  search(){
    // 搜索商品
    wx.showLoading({
      title: '加载中',
    })
    //赋值给参数
    this.setData({
<<<<<<< HEAD
      'goodsParams.orderBy':this.data.orderBy,
      'goodsParams.queryStr': this.data.name
=======
      'goodsParams.orderBy':this.data.orderBy
>>>>>>> 85530990742952d07eff28d86bc58b8b1385a49e
    })

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
<<<<<<< HEAD
        
        wx.stopPullDownRefresh()
      }
     

=======
        wx.stopPullDownRefresh()
      }
>>>>>>> 85530990742952d07eff28d86bc58b8b1385a49e
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
  
  changeShowType(){
    if (this.data.listType == 1) {
      this.setData({
        listType: 2
      })
    } else {
      this.setData({
        listType: 1
      })
    }
  },
  bindinput(e){
    this.setData({
      name: e.detail.value
    })
  },
  bindconfirm(e){
    this.setData({
      name: e.detail.value
    })
    this.search()
  },
  filter(e){
    this.setData({
      orderBy: e.currentTarget.dataset.val
    })
    this.search()
  },
 
})