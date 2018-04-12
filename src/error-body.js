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
      name: err.name,
      message: err.message || err.toString(),
      msg: err.msg,
      request_id: traceId,
      request_code: err.request_code || serviceCode,
      server_time: new Date(),
      stack: IS_DEVELOP ? (Array.isArray(err.stack) ? err.stack : err.stack.split('\n')) : undefined
    }
  }
}
