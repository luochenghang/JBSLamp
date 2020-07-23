let ApiManage = require("../api/ApiManage.js")
let baseUrl = ApiManage.ApiUrl.develop
export const login = baseUrl + "api/v1/login"//登录接口
export const getBanner = baseUrl + 'lampApp/v1/getBanner' // 获取banner图
export const getPageAllGoods = baseUrl + 'lampApp/v1/getPageAllGoods' // 获取所有的商品分页
export const getTop5GoodsDynamic = baseUrl + 'lampApp/v1/getTop5GoodsDynamic' // 获取最新的前五个订单

export const getAllGoodsType = baseUrl + "lampApp/v1/getAllGoodsType"//查询全部的商品类型
