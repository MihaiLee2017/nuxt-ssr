import ApiErrorName from './ApiErrorNames'
// bable 6 以上处理 instanceof
function ExtendableBuiltin(cls) {
  function ExtendableBuiltin() {
    cls.apply(this, arguments);
  }
  ExtendableBuiltin.prototype = Object.create(cls.prototype);
  Object.setPrototypeOf(ExtendableBuiltin, cls);

  return ExtendableBuiltin;
}
class ApiError extends ExtendableBuiltin(Error) {
  constructor(error_name) {
    super()
    var error_info = ApiErrorName.getErrorInfo(error_name)
    this.name = error_name
    this.code = error_info.code
    this.message = error_info.message
  }
}
export default ApiError
// const ApiErrorName = require('./ApiErrorNames')
// class ApiError extends Error {
//   constructor(error_name) {
//     super()
//     var error_info = ApiErrorName.getErrorInfo(error_name)
//     this.name = error_name
//     this.code = error_info.code
//     this.message = error_info.message
//   }
// }

// module.exports = ApiError

