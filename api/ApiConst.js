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

export const getPreOrderByUserId = baseUrl + "lampApp/v1/getPreOrderByUserId"//查询用户收藏商品
export const addPreOrder = baseUrl + "lampApp/v1/addPreOrder"//添加收藏商品
export const updPreOrderIsCollect = baseUrl + "lampApp/v1/updPreOrderIsCollect"//更新收藏商品的状态 删除已收藏的 


export const getAllOrderByUserId = baseUrl + "lampApp/v1/getAllOrderByUserId"//获取订单根据状态
export const getOrderById = baseUrl + "lampApp/v1/getOrderById"//获取订单

export const getShopInfo = baseUrl + "lampApp/v1/getShopInfo"//获取商铺信息

// export const decipherPhone = baseUrl + "lampApp/v1/decipherPhone"//绑定手机号
getAddressList
export const getAddressList = baseUrl + "lampApp/v1/getAddressList"//查询用户的所有地址列表
export const getAddressById = baseUrl + "lampApp/v1/getAddressById"//查询用户的地址根据id
export const addAddress = baseUrl + "lampApp/v1/addAddress"//添加或者修改用户的地址
export const deleteAddess = baseUrl + "lampApp/v1/delAddress"//删除用户的地址记录
