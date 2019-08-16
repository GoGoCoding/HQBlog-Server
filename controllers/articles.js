const Articles = require('../models/articles');

class ArticlesCtl {

    // 创建文章
  async create(ctx) {
      ctx.verifyParams({
          title: { type: 'string', required: true }
      })
    const { title, content, categories, tags } = ctx.request.body;

    ctx.body = { code: 200, message: '成功创建文章' };
  }

  // 修改文章
  async update(ctx) {
    ctx.body = { code: 200, message: '文章修改成功' };
  }

  // 获取文章详情
  async getArticleById(ctx) {
    ctx.body = { code: 200, message: '获取文章详情成功' };
  }

  /**
   * 查询文章列表
   *
   * @param {Number} offset - 当前页码 默认1
   * @param {Number} limit - 限制查询数量 默认 10
   * ...
   */
  async getArticleList(ctx) {
    ctx.body = { code: 200, message: '查询文章列表成功' };

  }

  // 删除文章
  async deleteArticle(ctx) {
    ctx.body = { code: 200, message: '删除文章成功' };
  }
}

module.exports = new ArticlesCtl();

