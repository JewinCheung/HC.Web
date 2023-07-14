import Vue from 'vue'
export default {

  // 拼接图片缩略图url
  getImgUrl (url) {
    if (url) {
      // 编辑图片不拼接
      if (url.indexOf('data:image') >= 0) {
        return url
      }
      return Vue.prototype.$baseURL + url
    } else {
      return ''
    }
  },
  // 单据类型转换
  billTypeConvert (billType) {
    let name = ''
    if (billType === 'HA') {
      name = '授信单'
    } else if (billType === 'HB') {
      name = '订货单'
    } else if (billType === 'HC') {
      name = '账户调整单'
    } else if (billType === 'HD') {
      name = '订货调整单'
    } else if (billType === 'HE') {
      name = '申请发货单'
    } else if (billType === 'HF') {
      name = '账户临时调整'
    } else if (billType === '01') {
      name = '销售发票'
    } else if (billType === '02') {
      name = '应收单'
    } else if (billType === '03') {
      name = '收款单'
    } else if (billType === '04') {
      name = '销售订单'
    }
    return name
  }
}
