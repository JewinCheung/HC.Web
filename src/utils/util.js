
export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour < 20 ? '下午好' : '晚上好')))
}

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj (obj) {
  if (!(typeof obj === 'object')) {
    return
  }

  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key) &&
      (obj[key] == null || obj[key] === undefined || obj[key] === '')) {
      delete obj[key]
    }
  }
  return obj
}

/**
 * 时间格式化
 * @param value
 * @param fmt
 * @returns {*}
 */
export function formatDate (value, fmt) {
  const regPos = /^\d+(\.\d+)?$/
  if (regPos.test(value)) {
    // 如果是数字
    const getDate = new Date(value)
    const o = {
      'M+': getDate.getMonth() + 1,
      'd+': getDate.getDate(),
      'h+': getDate.getHours(),
      'm+': getDate.getMinutes(),
      's+': getDate.getSeconds(),
      'q+': Math.floor((getDate.getMonth() + 3) / 3),
      S: getDate.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  } else {
    // TODO
    value = value.trim()
    return value.substr(0, fmt.length)
  }
}

/**
 * 深度克隆对象、数组
 * @param obj 被克隆的对象
 * @return 克隆后的对象
 */
export function cloneObject (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 随机生成数字
 *
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 *
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
 */
export function randomNumber () {
  // 生成 最小值 到 最大值 区间的随机数
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  if (arguments.length === 1) {
    const [length] = arguments
    // 生成指定长度的随机数字，首位一定不是 0
    const nums = [...Array(length).keys()].map((i) => (i > 0 ? random(0, 9) : random(1, 9)))
    return parseInt(nums.join(''))
  } else if (arguments.length >= 2) {
    const [min, max] = arguments
    return random(min, max)
  } else {
    return Number.NaN
  }
}

/**
 * 随机生成字符串
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
export function randomString (length, chats) {
  if (!length) length = 1
  if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm'
  let str = ''
  for (let i = 0; i < length; i++) {
    const num = randomNumber(0, chats.length - 1)
    str += chats[num]
  }
  return str
}

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
export function randomUUID () {
  const chats = '0123456789abcdef'
  return randomString(32, chats)
}

/**
 * 下划线转驼峰
 * @param string
 * @returns {*}
 */
export function underLine2CamelCase (string) {
  return string.replace(/_([a-z])/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

/**
 * 如果值不存在就 push 进数组，反之不处理
 * @param array 要操作的数据
 * @param value 要添加的值
 * @param key 可空，如果比较的是对象，可能存在地址不一样但值实际上是一样的情况，可以传此字段判断对象中唯一的字段，例如 id。不传则直接比较实际值
 * @returns {boolean} 成功 push 返回 true，不处理返回 false
 */
export function pushIfNotExist (array, value, key) {
  for (const item of array) {
    if (key && (item[key] === value[key])) {
      return false
    } else if (item === value) {
      return false
    }
  }
  array.push(value)
  return true
}

/**
 * 不用正则的方式替换所有值
 * @param text 被替换的字符串
 * @param checker  替换前的内容
 * @param replacer 替换后的内容
 * @returns {String} 替换后的字符串
 */
export function replaceAll (text, checker, replacer) {
  const lastText = text
  text = text.replace(checker, replacer)
  if (lastText !== text) {
    return replaceAll(text, checker, replacer)
  }
  return text
}

/**
 * 图片压缩
 * @param {*} base64
 * @param {*} callback
 * @returns
 */
export function compressImage (base64, size, callback) {
  var targSize = 1024 * size // 60KB
  if (base64.length <= targSize) {
    callback(base64)
    // console.log("直接返回")
    return
  }
  var newImage = new Image()
  newImage.src = base64
  // console.log(base64.length)
  newImage.setAttribute('crossOrigin', 'Anonymous') // url为外域时需要
  // var imgWidth, imgHeight
  newImage.onload = function () {
    // imgWidth = this.width
    // imgHeight = this.height

    var quality = 0.95 // 压缩系数0-1之间

    // 压缩的像素大小，square越大，像素越高
    var square = 500
    var canvas = document.createElement('canvas')
    if (this.width > this.height) {
      canvas.width = Math.round(square * this.width / this.height)
      canvas.height = square
    } else {
      canvas.width = square
      canvas.height = Math.round(square * this.height / this.width)
    }
    var ctx = canvas.getContext('2d')
    // console.log(imgWidth + '-' + imgHeight + ':' + canvas.width + '-' + canvas.height + '-----' + quality)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // var imageWidth
    // var imageHeight

    // console.log(this.width)
    // console.log(this.height)
    // if (this.width > this.height) {
    //   imageWidth = Math.round(square * this.width / this.height)
    //   imageHeight = square
    // } else {
    //   imageWidth = square
    //   imageHeight = Math.round(square * this.height / this.width)
    // }
    // console.log(imageWidth)
    // console.log(imageHeight)
    ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
    var base64 = canvas.toDataURL('image/jpeg') // 压缩语句
    // 如想确保图片压缩到自己想要的尺寸,如要求在5-10kb之间，请加以下语句，quality初始值根据情况自定
    // console.log(base64.length + '循环1压缩' + (base64.length / 1024))

    while (base64.length > targSize) {
      quality -= 0.05
      // console.log(base64.length + '循环压缩' + quality)
      base64 = canvas.toDataURL('image/jpeg', quality)
    }
    callback(base64) // 必须通过回调函数返回，否则无法及时拿到该值
  }
}

/**
 * 以obj.height 为基准 压缩
 * baseImage base64 图片
 * obj { width: 900, height: 35 }
 * quality 图像质量  0 - 1   1 质量越高
 */

export function imageCompression (baseImage, obj, quality, callback) {
  var img = new Image()
  img.src = baseImage
  img.onload = function () {
    var that = this
    var w = that.width, h = that.height
    // 按照h 压缩后的base64 和 width
    var compressionResult, compressionWidth, compressionHeight
    if (h > obj.height) {
      // 生成canvas
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      // 创建属性节点
      var createw = document.createAttribute('width')
      var createh = document.createAttribute('height')
      h = obj.height
      w = (h / that.height) * w
      compressionWidth = w
      compressionHeight = h
      createw.nodeValue = w
      createh.nodeValue = h
      canvas.setAttributeNode(createw)
      canvas.setAttributeNode(createh)
      ctx.drawImage(that, 0, 0, w, h)
      var base64 = canvas.toDataURL('image/png', quality)
      compressionResult = base64
    } else {
      compressionResult = baseImage
      compressionWidth = that.width
      compressionHeight = that.height
    }
    // width > 默认width  做截取处理
    if (compressionWidth > obj.width) {
      ClippingImage(compressionResult, obj.width, compressionHeight, quality, function (base64Clipping) {
        callback(base64Clipping)
      })
    } else {
      callback(compressionResult)
    }
  }
}

/**
 * 图片截取
 * base64Codes  图片base64 码
 * 从 (0,0) 开始截取   宽高分别为 width，height
 * quality  图片质量  0 - 1 ，  1 图片质量最高
 * callback  返回的是 截取后的base64 字符串
 */
function ClippingImage (base64Codes, width, height, quality, callback) {
  var img = new Image()
  img.src = base64Codes
  // 生成canvas
  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  var createw = document.createAttribute('width')
  var createh = document.createAttribute('height')
  createw.nodeValue = width
  createh.nodeValue = height
  canvas.setAttributeNode(createh)
  canvas.setAttributeNode(createw)
  img.onload = function () {
    ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height)
    var base64Result = canvas.toDataURL('image/png', quality)
    callback(base64Result)
  }
}
