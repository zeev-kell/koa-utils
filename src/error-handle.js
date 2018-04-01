/**
 * 处理异常
 * @param error
 * @param ctx
 * @returns {{status: number, message: *|string, code: string, name, stack: boolean}}
 */
class ErrorHandle {
  constructor(config) {
    this.config = config;
  }

  getBody(err, traceId) {
    let {serviceCode, IS_DEVELOP} = this.config;
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

  static create(config) {
    return new ErrorHandle(config);
  }

  /** @namespace ctx.app */
  setCtx(err, ctx, body) {
    let {IS_DEVELOP} = this.config;
    if (IS_DEVELOP) {
      ctx.app.emit('error', err, ctx)
    }
    ctx.status = body.status;
    ctx.type = 'application/json';
    ctx.body = body;
  }
}

module.exports = ErrorHandle;
