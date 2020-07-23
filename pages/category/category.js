
const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
let util = require('../../utils/util.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categorySelected: {
      name: '',
      id: ''
    },
    goodsParams: {
      status: 1, // 已上架
      goodsTypeId: 0,
      pageNum: 1,
      pageSize: 20
    },
    currentGoods: [],
    onLoadStatus: true,
    loadingMoreHidden: true,
    scrolltop: 0,
  },
//   /**
//    * 生命周期函数--监听页面加载
//    */
  onLoad: function(options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    this.categories();
  },
   categories() {
    wx.showLoading({
      title: '加载中',
    })
   
    wx.hideLoading()
    let categories = [];
    let categoryName = '';
    let categoryId = '';
     let requestData = {
       url: ApiConst.getAllGoodsType,
       data: {status:1}
     }
     let that = this;
     ApiManager.send(requestData, 'GET').then(res => {
    
       if (res.data.code == 1000) {
         if (res.data.data != null){
           
           if (that.data.categorySelected.id) {
             const _curCategory = res.data.find(ele => {
               return ele.id == that.data.categorySelected.id
             })
             console.log(_curCategory);
             categoryName = _curCategory.name;
             categoryId = _curCategory.id;
           }
           for (let i = 0; i < res.data.data.length; i++) {
             let item = res.data.data[i];
            
             categories.push(item);
             if (i == 0 && !that.data.categorySelected.id) {
               categoryName = item.name;
               categoryId = item.id;
             }
           }
           that.setData({
             categories: categories,
             categorySelected: {
               name: categoryName,
               id: categoryId
             }
           });
           that.getGoodsList();
         }
       }
     })
    
    
  },
   getGoodsList() {
    wx.showLoading({
      title: '加载中',
    })

    let that = this;
    this.setData({
      goodsParams: {
        status: that.data.goodsParams.status, // 已上架
        pageNum: that.data.goodsParams.pageNum,
        pageSize: that.data.goodsParams.pageSize,
        goodsTypeId: that.data.categorySelected.id
      }
    })
    
     let requestData = {
       url: ApiConst.getPageAllGoods,
       data: this.data.goodsParams
     }
     ApiManager.send(requestData, 'GET').then(res => {
       if (res.data.code == 1000) {
         if (that.data.goodsParams.pageNum == 1) {
          that.setData({
            currentGoods: res.data.data.list
          })
        } else {
           if (that.data.currentGoods.length < res.data.data.totalCount) {
             let list = that.data.currentGoods
            list = list.concat(res.data.data.list)
            that.setData({
              currentGoods: list,
              loadingMoreHidden: true
            })
          } else {
             this.setData({
               loadingMoreHidden: false
             })
          }
        }
         console.log(res.data.data.list)
         if (res.data.data.list.length==0) {
           this.setData({
             currentGoods: []
           });
         }
         wx.stopPullDownRefresh()
       }
     })

    wx.hideLoading()
   
  },
  toDetailsTap: function(e) {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  },
  onCategoryClick: function(e) {
    var that = this;
    var id = e.target.dataset.id;
    if (id === that.data.categorySelected.id) {
      that.setData({
        scrolltop: 0,
      })
    } else {
      var categoryName = '';
      for (var i = 0; i < that.data.categories.length; i++) {
        let item = that.data.categories[i];
        if (item.id == id) {
          categoryName = item.name;
          break;
        }
      }
      that.setData({
        categorySelected: {
          name: categoryName,
          id: id
        },
        scrolltop: 0
      });
      that.getGoodsList();
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
 
  onShow() {
   
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({ currentGoods: [] })
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
  
})