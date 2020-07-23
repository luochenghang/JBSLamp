const ApiManager = require('../../api/ApiManage.js')
const ApiConst = require('../../api/ApiConst.js')
let util = require('../../utils/util.js')
const app = getApp();
Page({
  data: {
    wxlogin: true,

    goodsDetail: {},
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

})
