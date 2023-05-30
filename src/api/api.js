import { getAction, getKeyAction, postAction, putAction, deleteAction, deleteKeysAction } from './manage'

// 权限管理
const addPermission = (params) => postAction('/api/permission/add', params)
const editPermission = (params) => putAction('/api/permission/edit', params)
const deletePermission = (params) => deleteAction('/api/Permission/delete', params)
const getPermissionTree = (params) => getAction('/api/permission/getPermissionTree', params)
const saveRolePermission = (params) => postAction('/api/permission/saveRolePermission', params)
const getPermissionIdsByRoleId = (params) => getAction('/api/permission/getPermissionIdsByRoleId', params)
const queryPermissionsByUser = (params) => getAction('/api/permission/getUserPermission', params)
// 角色管理
const addRole = (params) => postAction('/api/role/add', params)
const editRole = (params) => putAction('/api/role/edit', params)

// 客户注册
const register = (params) => postAction('/register/submit', params)
// 客户注册图片上传
const registerUpload = (params) => postAction('/register/upload', params)

// 修改密码
const updatePwd = (params) => putAction(`system/user/profile/updatePwd?oldPassword=${params.oldPassword}&newPassword=${params.newPassword}`)

// 商品
const getTreeList = (params) => getAction('/order/materialClass/treeselect', params) // 商品分类树
const oneLevel = (params) => getAction('/order/materialClass/oneLevel', params) // 订货商城，显示一级商品分类
const getListByParentId = (params) => getAction('/order/materialClass/getListByParentId', params) // 根据父节点获取下属层级的商品分类清单
const getMateriallist = (params) => getAction('/order/material/list', params) // 商品列表
const getMaterDetail = (key) => getKeyAction('/order/material', key) // 商品明细

// 订单 /order/sale/
const addOrderSale = (params) => postAction('/order/sale', params) // 新增订货单
const putOrderSale = (params) => putAction('/order/sale', params) // 修改订货单
const deleteOrderSale = (keys) => deleteKeysAction('/order/sale', keys) // 删除订货单

const getOrderSaleList = (params) => getAction('order/sale/list', params) // 查询订货清单
const getOrderSaleInfo = (key) => getKeyAction('order/sale', key) // 查询订货清单明细

const submitOrderSale = (params) => postAction('/order/sale/submit', params) // 提交订货单
const backOrderSale = (params) => postAction('/order/sale/back', params) // 撤回订货单
const submitOrderSaleAdjust = (params) => postAction('/order/sale/adjust', params) // 提交订货单调整

const passOrderSale = (params) => postAction('/order/sale/pass', params) // 订单通过
const failOrderSale = (params) => postAction('/order/sale/fail', params) // 订单不通过

const getAdjustList = (params) => getAction('/order/adjust/list', params) // 查询订单调整清单
const getAdjustInfo = (key) => getKeyAction('/order/adjust', key) // 查询订单调整清单明细

const addDelivery = (params) => postAction('/order/delivery', params) // 新增发货单

const getDeliveryList = (params) => getAction('/order/delivery/list', params) // 查询发货清单
const getDeliveryInfo = (key) => getKeyAction('/order/delivery', key) // 查询发货清单明细

const getByUser = () => getAction('/order/account/getByUser')
const getCustomerInfo = (key) => getKeyAction('/order/customer', key)
const getOrgList = (params) => getAction('/order/org/list', params)
const getOrgs = (params) => getAction('/order/materialClass/getOrgs', params)

const getOrderCarAndShipList = (params) => getAction('/order/carAndShip/list', params) // 查询车船档案
const addOrderCarAndShipInfo = (params) => postAction('/order/carAndShip', params) // 新增车船档案
const putOrderCarAndShipInfo = (params) => putAction('/order/carAndShip', params) // 修改车船档案
const deleteOrderCarAndShipInfo = (keys) => deleteKeysAction('/order/carAndShip', keys) // 删除车船档案

const getDicts = (key) => getKeyAction('/system/dict/data/type/', key) // 根据字典类型查询字典数据信息

export {
  addPermission,
  editPermission,
  deletePermission,
  getPermissionTree,
  saveRolePermission,
  getPermissionIdsByRoleId,
  addRole,
  editRole,
  queryPermissionsByUser,

  register,
  registerUpload,
  updatePwd,
  getTreeList,
  oneLevel,
  getListByParentId,
  getMateriallist,
  getMaterDetail,

  addOrderSale,
  putOrderSale,
  getOrderSaleList,
  getOrderSaleInfo,
  submitOrderSale,
  submitOrderSaleAdjust,
  deleteOrderSale,
  passOrderSale,
  failOrderSale,
  getAdjustList,
  getAdjustInfo,
  backOrderSale,
  addDelivery,
  getDeliveryList,
  getDeliveryInfo,
  getCustomerInfo,
  getOrgList,
  getByUser,
  getOrderCarAndShipList,
  addOrderCarAndShipInfo,
  putOrderCarAndShipInfo,
  deleteOrderCarAndShipInfo,
  getOrgs,
  getDicts

}
