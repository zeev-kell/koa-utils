module.exports = function ({serviceCode, IS_DEVELOP}) {
  /**
   * 处理异常
   * @param error
   * @param ctx
   * @returns {{status: number, message: *|string, code: string, name, stack: boolean}}
   */
  return function (err, traceId) {
    // 判断是否是接口返回的异常
    if (err.response && err.response.data) {
      err = err.response.data;
    }
    /** @namespace body */
    return {
      status: (typeof err.status === 'number') ? err.status : 500,
      message: err.message || err.toString(),
      code: err.code || serviceCode,
      name: err.name,
      stack: IS_DEVELOP ? (Array.isArray(err.stack) ? err.stack : err.stack.split('\n')) : undefined,
      id: traceId
    }
  }
}
