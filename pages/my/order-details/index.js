const app = getApp()
const ApiManager = require('../../../api/ApiManage.js')
const ApiConst = require('../../../api/ApiConst.js')
let util = require('../../../utils/util.js')

Page({
    data:{
      orderId:0,
      orderDetail:null
    },
    onLoad:function(e){
      var orderId = e.id;
      this.data.orderId = orderId;
      this.setData({
        orderId: orderId
      });
    },
    onShow : function () {
      var that = this;
     
      let requestData = {
        url: ApiConst.getOrderById,
        data: {
          "id": that.data.orderId
        }
      }
      ApiManager.send(requestData, 'GET').then(res => {
        if (res.data.code == 1000) {
          that.setData({
            orderDetail: res.data.data
          });
        }
        wx.stopPullDownRefresh()
      })

        
    },
 
  
})