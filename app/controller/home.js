'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.service.home.data.getData();    
    this.ctx.body = data
  }
  async handle() {
    const { ctx } = this;
    const data = await ctx.service.home.data.handleData();    
    this.ctx.body = data
  }
}

module.exports = HomeController;
