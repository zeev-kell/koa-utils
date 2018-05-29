class BaseContextClass {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.service = ctx.service;
  }
}

module.exports = BaseContextClass;
