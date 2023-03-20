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
  }
}
