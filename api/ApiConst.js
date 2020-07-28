const ApiUrl = {
  develop: 'http://localhost:9001/',
  onLine: 'https://luoch.cn/'
}

let baseUrl = ApiUrl.develop
export const login = baseUrl + "lampApp/v1/login"//登录接口
export const getUser = baseUrl + "lampApp/v1/getUser"//获取登录用户的个人信息


export const getBanner = baseUrl + 'lampApp/v1/getBanner' // 获取banner图
export const getPageAllGoods = baseUrl + 'lampApp/v1/getPageAllGoods' // 获取所有的商品分页
export const getTop5GoodsDynamic = baseUrl + 'lampApp/v1/getTop5GoodsDynamic' // 获取最新的前五个订单

export const getAllGoodsType = baseUrl + "lampApp/v1/getAllGoodsType"//查询全部的商品类型

export const getGoodsById = baseUrl + "lampApp/v1/getGoodsById"//查询商品详细信息
