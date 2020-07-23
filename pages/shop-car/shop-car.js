//const TOOLS = require('../../utils/tools.js')

const app = getApp()

Page({
  data: {
    goodsList: {
      saveHidden: true,
      totalPrice: 0,
      totalScoreToPay: 0,
      allSelect: true,
      noSelect: false,
      list: []
    },
    delBtnWidth: 120, //删除按钮宽度单位（rpx）
  },

  //获取元素自适应后的实际宽度
  getEleWidth: function(w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);  /*//以宽度750px设计稿做宽度的自适应*/
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function() {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  onLoad: function() {
    this.initEleWidth();
    this.onShow();
  },
  onShow: function() {
    var shopList = [
      {
        "goodsId": 235853,
        "pic": "https://dcdn.it120.cc/2019/12/06/ebf49ac6-4521-4bcc-92fd-8bbbd4131167.jpg",
        "name": "3分钟沙漏「儿童刷牙计时器」",
        "propertyChildIds": "",
        "label": "",
        "price": 9.9,
        "score": 0,
        "left": "margin-left:0px",
        "active": true,
        "number": 1,
        "logisticsType": 386,
        "logistics": {
          "isFree": true,
          "feeType": 0,
          "feeTypeStr": "按件数",
          "details": [
            {
              "addAmount": 0,
              "addNumber": 1,
              "firstAmount": 8,
              "firstNumber": 100,
              "type": 0,
              "userId": 951
            }
          ]
        },
        "weight": 0
      },
      {
        "goodsId": 6745,
        "pic": "https://cdn.it120.cc/apifactory/2019/07/11/e9fb59ae-7e66-427d-8d47-642c3b733a0b.jpg",
        "name": "幼儿园园服韩版男女童装春秋季班服英伦学院风白色衬衫小学生校服",
        "propertyChildIds": "",
        "label": "",
        "price": 236,
        "score": 0,
        "left": "",
        "active": true,
        "number": 1,
        "logisticsType": 386,
        "logistics": {
          "isFree": true,
          "feeType": 0,
          "feeTypeStr": "按件数",
          "details": [
            {
              "addAmount": 0,
              "addNumber": 1,
              "firstAmount": 8,
              "firstNumber": 100,
              "type": 0,
              "userId": 951
            }
          ]
        },
        "weight": 0
      }
    ];
    // 获取购物车数据
    
    this.data.goodsList.list = shopList;
    this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), shopList);
  },
  toIndexPage: function() {
    wx.switchTab({
      url: "/pages/index/index"
    });
  },

  touchS: function(e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function(e) {
    var index = e.currentTarget.dataset.index;

    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var left = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，container位置不变
        left = "margin-left:0px";
      } else if (disX > 0) { //移动距离大于0，container left值等于手指移动距离
        left = "margin-left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          left = "left:-" + delBtnWidth + "px";
        }
      }
      var list = this.data.goodsList.list;
      if (index != "" && index != null) {
        list[parseInt(index)].left = left;
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
      }
    }
  },

  touchE: function(e) {
    var index = e.currentTarget.dataset.index;
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
      var list = this.data.goodsList.list;
      if (index !== "" && index != null) {
        list[parseInt(index)].left = left;
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);

      }
    }
  },
  delItem: function(e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList.list;
    list.splice(index, 1);
    this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
  },
  selectTap: function(e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList.list;
    if (index !== "" && index != null) {
      list[parseInt(index)].active = !list[parseInt(index)].active;
      this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    }
  },
  totalPrice: function() {
    var list = this.data.goodsList.list;
    var total = 0;
    let totalScoreToPay = 0;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      if (curItem.active) {
        total += parseFloat(curItem.price) * curItem.number;
        totalScoreToPay += curItem.score * curItem.number;
      }
    }
    this.data.goodsList.totalScoreToPay = totalScoreToPay;
    total = parseFloat(total.toFixed(2)); //js浮点计算bug，取两位小数精度
    return total;
  },
  allSelect: function() {
    var list = this.data.goodsList.list;
    var allSelect = false;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      if (curItem.active) {
        allSelect = true;
      } else {
        allSelect = false;
        break;
      }
    }
    return allSelect;
  },
  noSelect: function() {
    var list = this.data.goodsList.list;
    var noSelect = 0;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      if (!curItem.active) {
        noSelect++;
      }
    }
    if (noSelect == list.length) {
      return true;
    } else {
      return false;
    }
  },
  setGoodsList: function(saveHidden, total, allSelect, noSelect, list) {
    this.setData({
      goodsList: {
        saveHidden: saveHidden,
        totalPrice: total,
        allSelect: allSelect,
        noSelect: noSelect,
        list: list,
        totalScoreToPay: this.data.goodsList.totalScoreToPay
      }
    });
    var shopCarInfo = {};
    var tempNumber = 0;
    shopCarInfo.shopList = list;
    for (var i = 0; i < list.length; i++) {
      tempNumber = tempNumber + list[i].number
    }
    shopCarInfo.shopNum = tempNumber;
    wx.setStorage({
      key: "shopCarInfo",
      data: shopCarInfo,
      success: function(res) {
        // 获取购物车数据，显示TabBarBadge
        TOOLS.showTabBarBadge();
      }
    })
  },
  bindAllSelect: function() {
    var currentAllSelect = this.data.goodsList.allSelect;
    var list = this.data.goodsList.list;
    if (currentAllSelect) {
      for (var i = 0; i < list.length; i++) {
        var curItem = list[i];
        curItem.active = false;
      }
    } else {
      for (var i = 0; i < list.length; i++) {
        var curItem = list[i];
        curItem.active = true;
      }
    }

    this.setGoodsList(this.getSaveHide(), this.totalPrice(), !currentAllSelect, this.noSelect(), list);
  },
  jiaBtnTap: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    var list = that.data.goodsList.list;
    if (index !== "" && index != null) {
      // 添加判断当前商品购买数量是否超过当前商品可购买库存
      var carShopBean = list[parseInt(index)];
      var carShopBeanStores = 0;

    }
  },
  jianBtnTap: function(e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList.list;
    if (index !== "" && index != null) {
      if (list[parseInt(index)].number > 1) {
        list[parseInt(index)].number--;
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
      }
    }
  },
  editTap: function() {
    var list = this.data.goodsList.list;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      curItem.active = false;
    }
    this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
  },
  saveTap: function() {
    var list = this.data.goodsList.list;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      curItem.active = true;
    }
    this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
  },
  getSaveHide: function() {
    var saveHidden = this.data.goodsList.saveHidden;
    return saveHidden;
  },
  deleteSelected: function() {
    var list = this.data.goodsList.list;
   
    list = list.filter(function(curGoods) {
      return !curGoods.active;
    });
    this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
  },
  toPayOrder: function() {
    wx.showLoading();

    wx.hideLoading();


  },
  navigateToPayOrder: function() {
    wx.hideLoading();
    wx.navigateTo({
      url: "/pages/to-pay-order/index"
    })
  }



})