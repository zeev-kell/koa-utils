module.exports = function ({serviceCode, IS_DEVELOP}) {
  /**
   * 处理异常
   * @param error
   * @param ctx
   * @returns {{status: number, message: *|string, code: string, name, stack: boolean}}
   */
  return function (err, ctx, i18n = require('./i18n')) {
    // 判断是否是接口返回的异常
    if (err.response && err.response.data) {
      err = err.response.data;
    }
    /** @namespace body */
    let body = {
      status: (typeof err.status === 'number') ? err.status : 500,
      msg: err.msg,
      message: err.message || err.toString(),
      name: err.name,
      request_id: ctx['X-B3-TraceId'] && ctx['X-B3-TraceId'].traceId,
      request_code: err.request_code || serviceCode,
      server_time: new Date()
    }
    // 没有翻译，默认调用 i18n 翻译
    if (!body.msg) {
      body.msg = i18n(ctx.get('Accept-Language'), err.message, err.formatting)
    }
    // 开发环境
    if (IS_DEVELOP) {
      body.stack = (Array.isArray(err.stack) ? err.stack : err.stack.split('\n'));
    }
    return body
  }
}
