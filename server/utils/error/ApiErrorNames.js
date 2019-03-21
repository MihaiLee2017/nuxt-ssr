var ApiErrorNames = {}

ApiErrorNames.UNKNOW_ERROR = { name: 'unknowError', status: { code: -1, message: '未知错误' } }
ApiErrorNames.USER_NOT_EXIST = { name: 'userNotExist', status: { code: 101, message: '用户不存在' } }
ApiErrorNames.USER_EXIST = { name: 'userExit', status: { code: 101, message: '用户已存在' } }
ApiErrorNames.USER_ADD_ERROR = { name: 'userAddError', status: { code: 101, message: '用户添加失败' } }
ApiErrorNames.USER_UPDATE_ERROR = { name: 'userUpdateError', status: { code: 101, message: '用户修改失败' } }
ApiErrorNames.REGISTER_ERROR = { name: 'registerError', status: { code: 101, message: '注册失败' } }
ApiErrorNames.LOGIN_ERROR = { name: 'loginError', status: { code: 101, message: '登录失败' } }
ApiErrorNames.CODE_ERROR = { name: 'codeError', status: { code: 201, message: '验证码错误' } }
ApiErrorNames.CODE_EXPIRE = { name: 'codeExpire', status: { code: 201, message: '验证码过期' } }
ApiErrorNames.CODE_NO_EXIT = { name: 'codeNOExit', status: { code: 201, message: '请填写验证码' } }
ApiErrorNames.CODE_IS_SENT = { name: 'codeIsSent', status: { code: 201, message: '验证码已发送' } }

const error_map = new Map()
for (let key in ApiErrorNames) {
  let { name, status } = ApiErrorNames[key]
  error_map.set(name, status)
}
ApiErrorNames.getErrorInfo = (error_name) => {
  var error_info = error_info ? error_info : ApiErrorNames.UNKNOW_ERROR
  // if (error_name) {
  //   error_info = error_map.get(error_name)
  // } else {
  //   error_name =ApiErrorNames.UNKNOW_ERROR
  //   error_info = error_map.get(error_name)
  // }
  error_info = error_map.get(error_name)
  return error_info
}
export default ApiErrorNames
/**
 * API错误名称
 */
// var ApiErrorNames = {}

// ApiErrorNames.UNKNOW_ERROR = "unknowError"
// ApiErrorNames.USER_NOT_EXIST = "userNotExist"
// ApiErrorNames.USER_ADD = "userAdd"
// ApiErrorNames.USER_UPDATE_ERROR = 'userUpdateError'
// /**
//  * API错误名称对应的错误信息
//  */
// const error_map = new Map()

// error_map.set(ApiErrorNames.UNKNOW_ERROR, { code: -1, message: '未知错误' })
// error_map.set(ApiErrorNames.USER_NOT_EXIST, { code: 101, message: '用户不存在' })
// error_map.set(ApiErrorNames.USER_ADD, { code: 101, message: '用户添加失败' })
// error_map.set(ApiErrorNames.USER_UPDATE_ERROR, { code: 101, message: '用户修改失败' })

// //根据错误名称获取错误信息
// ApiErrorNames.getErrorInfo = (error_name) => {
//   var error_info
//   if (error_name) {
//     error_info = error_map.get(error_name)
//   }

//   //如果没有对应的错误信息，默认'未知错误'
//   if (!error_info) {
//     error_name = UNKNOW_ERROR
//     error_info = error_map.get(error_name)
//   }

//   return error_info
// }

// module.exports = ApiErrorNames
