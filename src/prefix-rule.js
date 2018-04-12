const errors = require('http-errors')

class PrefixRule {

  /**
   * 校验 参数 startTime，endTime 是否合法
   * @param ctx
   * @param next
   * @returns {Promise.<void>}
   * @constructor
   */
  static async TimeValidation(ctx, next) {
    errors.ifInvalid(ctx.query.startTime, 'startTimeValidationError')
    errors.ifInvalid(ctx.query.endTime, 'endTimeValidationError')
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
    errors.ifInvalid(currentPage > 0, 'currentPageValidationError')
    errors.ifInvalid(pageSize > 0, 'pageSizeValidationError')
    ctx.query.currentPage = currentPage
    ctx.query.pageSize = pageSize
    await next()
  }
}

module.exports = PrefixRule
