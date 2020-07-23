
//获取应用实例
var app = getApp()
Page({
  data: {
    provinces: [],
    citys: [],
    defaultProvinceCode: 2,
    defaultCityCode: 3,
    defaultCountyCode: 16,
    defaultAddressCode: '057750',
    districts: [],
    selProvince: '请选择',
    selCity: '请选择',
    selDistrict: '请选择',
    selProvinceIndex: 0,
    selCityIndex: 0,
    selDistrictIndex: 0
  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  bindSave: function (e) {
    var that = this;
    var linkMan = e.detail.value.linkMan;
    var address = e.detail.value.address;
    var mobile = e.detail.value.mobile;
    var code = e.detail.value.code;

    if (linkMan == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (mobile == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return
    }
    
  
    if (address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    }
   
    var apiAddoRuPDATE = "add";
    var apiAddid = that.data.id;
    if (apiAddid) {
      apiAddoRuPDATE = "update";
    } else {
      apiAddid = 0;
    }
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/shipping-address/' + apiAddoRuPDATE,
      data: {
        token: wx.getStorageSync('token'),
        id: apiAddid,
        
        linkMan: linkMan,
        address: address,
        mobile: mobile,
       
        isDefault: 'true'
      },
      success: function (res) {
        if (res.data.code != 0) {
          // 登录错误 
          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: res.data.msg,
            showCancel: false
          })
          return;
        }
        // 跳转到结算页面
        wx.navigateBack({})
      }
    })
  },
 
 
  onLoad: function (e) {
    var that = this;
   
    var id = e.id;
    if (id) {
      // 初始化原数据
      wx.showLoading();
      wx.request({
        url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/shipping-address/detail',
        data: {
          token: wx.getStorageSync('token'),
          id: id
        },
        success: function (res) {
          wx.hideLoading();
          if (res.data.code == 0) {
            that.setData({
              id: id,
              addressData: res.data.data,
              
            });
            that.setDBSaveAddressId(res.data.data);
            return;
          } else {
            wx.showModal({
              title: '提示',
              content: '无法获取快递地址数据',
              showCancel: false
            })
          }
        }
      })
    }
  },
  setDBSaveAddressId: function (data) {
    var retSelIdx = 0;
    for (var i = 0; i < commonCityData.cityData.length; i++) {
      if (data.provinceId == commonCityData.cityData[i].id) {
        this.data.selProvinceIndex = i;
        for (var j = 0; j < commonCityData.cityData[i].cityList.length; j++) {
          if (data.cityId == commonCityData.cityData[i].cityList[j].id) {
            this.data.selCityIndex = j;
            for (var k = 0; k < commonCityData.cityData[i].cityList[j].districtList.length; k++) {
              if (data.districtId == commonCityData.cityData[i].cityList[j].districtList[k].id) {
                this.data.selDistrictIndex = k;
              }
            }
          }
        }
      }
    }
  },
 
  deleteAddress: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该收货地址吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/shipping-address/delete',
            data: {
              token: wx.getStorageSync('token'),
              id: id
            },
            success: (res) => {
              wx.navigateBack({})
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
 
})
