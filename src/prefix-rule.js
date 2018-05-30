const errors = require('http-errors')

class PrefixRule {

  /**
   * @param next
   * @param ctx
   */
  static async TokenServer(ctx, next) {
    let authorization = ctx.header.authorization || ''
    let userId = ctx.header['x-access-id']
    errors.ok(authorization.startsWith('Bearer '), undefined, 'UnauthorizedError')
    errors.ok(userId, undefined, 'UnauthorizedError')
    ctx.$token = {
      userId,
      accessToken: authorization.substring(7)
    }
    if (next) {
      await next()
    }
  }

  /**
   * 校验 参数 startTime，endTime 是否合法
   * @param ctx
   * @param next
   * @returns {Promise.<void>}
   * @constructor
   */
  static async TimeValidation(ctx, next) {
    errors.expectValid(ctx.query.startTime, 'invalid_key_parameter', 'startTime')
    errors.expectValid(ctx.query.endTime, 'invalid_key_parameter', 'endTime')
    await next()
  }

  /**
   * 校验 参数 pageSize currentPage 是否合法
   * @param ctx
   * @param next
   * @returns {Promise.<void>}
   * @constructor
   */
  static async PageValidation(ctx, next) {
    let currentPage = parseInt(ctx.query.currentPage)
    let pageSize = parseInt(ctx.query.pageSize)
    errors.expectValid(currentPage > 0, 'invalid_key_parameter', 'currentPage')
    errors.expectValid(pageSize > 0, 'invalid_key_parameter', 'pageSize')
    ctx.query.currentPage = currentPage
    ctx.query.pageSize = pageSize
    await next()
  }

  /**
   * 初始化 from & to 参数为数字
   * @param ctx
   * @param next
   * @return {Promise<void>}
   * @constructor
   */
  static async InitRang(ctx, next) {
    let {from, to} = ctx.query;
    if (from && to) {
      ctx.query.from = parseInt(from);
      ctx.query.to = parseInt(to);
    }
    await next()
  }

  /**
   * 初始化 currentPage & pageSize 参数为数字
   * @param ctx
   * @param next
   * @return {Promise<void>}
   * @constructor
   */
  static async InitPage(ctx, next) {
    let {currentPage, pageSize} = ctx.query;
    if (currentPage && pageSize) {
      ctx.query.currentPage = parseInt(currentPage);
      ctx.query.pageSize = parseInt(pageSize);
    }
    await next()
  }
}

module.exports = PrefixRule
