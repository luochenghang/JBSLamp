//app.js
// const request = require("./utils/request.js")



App({
  // onLaunch: function() {
  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // console.log(res)
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //       this.globalData.code = res.code
  //     }
  //   })
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             let {
  //               userInfo,
  //               errMsg,
  //               rawData,
  //               ...loginData
  //             } = res
  //             this.globalData.userInfo = userInfo
  //             this.globalData.loginData = loginData
  //             this.login().then(res => this.getVipInfo())

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },

  globalData: {
    userInfo: null,
    vipInfo: null,
    // 登录所需要的数据
    loginData: null,
    code: '', // login code
    M_token: null, // 定位token
    token: '', // token
    phone: null,
    cid: '', // 城市id
    // city: '', // 城市
    locationCity: '', // 定位城市
    currentCity: '', // 当前选择的城市
    remainCity: '', // 截取后剩余的
    currentRemainCity: '' // 当前选择的截取剩余
  },
  
  // statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],// 手机状态栏的高度，单位px
  // screenWidth: wx.getSystemInfoSync()['screenWidth'], // 屏幕宽度
  // menuButton: wx.getMenuButtonBoundingClientRect(), // 获取胶囊信息
  // // 导航栏高度
  // navBarHeight: (() => {
  //   const sysInfo = wx.getSystemInfoSync()
  //   const isIOS = /^iOS/.test(sysInfo.system)
  //   const statusBarHeight = sysInfo['statusBarHeight']
  //   const menuButton = wx.getMenuButtonBoundingClientRect()
  //   let gap = menuButton.top - statusBarHeight
  //   if (isIOS) {
  //     return 3 * gap + menuButton.height
  //   }
  //   return 2 * gap + menuButton.height
  // })(),

  // parseRes(data, callback) {
  //   if (data.code === 1000) {
  //     if (callback) callback()
  //   } else if (data.code === 2000) {
  //     wx.showModal({
  //       title: '提示',
  //       content: data.msg,
  //       showCancel: false,
  //       confirmColor: '#F85110'
  //     })
  //   } else if (data.code === 3000) {
  //     wx.navigateTo({
  //       url: '/pages/authorization/authorization',
  //     })
  //   }
  //   wx.hideLoading()
  // },
  // // 登录
  // login(back = false) {
  //   return new Promise((resolve, reject) => {
  //     let params = this.globalData.loginData
  //     params.code = this.globalData.code
  //     params.nickName = this.globalData.userInfo.nickName
  //     params.portrait = this.globalData.userInfo.avatarUrl
  //     params.sex = this.globalData.userInfo.gender
  //     params.portrait = this.globalData.userInfo.avatarUrl
  //     params.sign = this.globalData.loginData.signature
  //     wx.request({
  //       url: env.base + api.login,
  //       method: 'post',
  //       header: {
  //         'content-type': 'application/x-www-form-urlencoded'
  //       },
  //       data: params,
  //       success: res => {
  //         let { data } = res.data
  //         this.parseRes(res.data, () => {
  //           this.globalData.token = data.token
  //           data.phone ? this.globalData.phone = data.phone : null
  //           if (back) {
  //             wx.navigateBack({
  //               delta: 1
  //             })
  //           }
  //           resolve()
  //         })
  //       },
  //       fail: err => {
  //         reject(err)
  //       }
  //     })
  //   })
  // },

  // getVipInfo() {
  //   return new Promise((resolve, reject) => {
  //     wx.request({
  //       url: env.base + api.getVipInfo,
  //       method: 'get',
  //       header: {
  //         'token': this.globalData.token
  //       },
  //       success: res => {
  //         let { data } = res.data
  //         this.parseRes(res.data, () => {
  //           this.globalData.vipInfo = data
  //           if (this.vipInfoReadyCallback) {
  //             this.vipInfoReadyCallback(data)
  //           }
  //           resolve()
  //         })
  //       }
  //     })
  //   })
  // }
})