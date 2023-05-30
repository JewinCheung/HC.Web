
export const requiredNull = (v) => {
  // console.info(v)
  if (!v & v !== 0) {
    return ''
  }
  return null
}

export const requiredTest = (v) => {
  // console.info(v)
  if (!v & v !== 0) {
    return '不可以为空'
  }
  return null
}

export const emailTest = (v) => {
  let t = null
  const p = /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/
  if (v && !p.test(v)) {
    t = '邮箱格式错误'
  }
  return t
}

export const phoneTest = (v) => {
  let t = null
  const p = /^1[3-9]\d{9}$/
  if (v && !p.test(v)) {
    t = '手机号码格式错误'
  }
  return t
}

export const numberTest = (v) => {
  let t = null
  const p = /^-?\d*\.?\d+$/
  if (v && !p.test(v)) {
    t = '必须为数字'
  }
  return t
}

export const letterTest = (v) => {
  let t = null
  const p = /^[a-zA-Z]*$/
  if (v && !p.test(v)) {
    t = '必须为字母'
  }
  return t
}

export const hcodeTest = (v) => {
  let t = null
  const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  if (v && !p.test(v)) {
    t = '身份证号码格式错误'
  }
  return t
}

export const carNumberTest = (v) => {
  let t = null
  const p = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
  if (v && !p.test(v)) {
    t = '车牌格式错误'
  }
  return t
}

export const confirmPassword = (pwd) => (v) => v === pwd || '两次密码输入不一致'

export default { requiredTest, requiredNull, hcodeTest, phoneTest, carNumberTest }
