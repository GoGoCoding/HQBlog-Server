const Article = require('../models/articles');
const Tag = require('../models/tags');


class ArticlesCtl {

    // 创建文章
  async create(ctx) {
      ctx.verifyParams({
          title: { type: 'string', required: true }
      })
    const { title, content, categories, tags, author } = ctx.request.body;
    
    const data = await Article({
      title: title,
      content: content,
      tags:tags,
      author: author
    }).save();
    
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
    let { page = 1, pageSize = 10, title, tag, category, rangTime , fetchTop } = ctx.query;
    const offset = (page - 1) * pageSize;
    let queryParams = {};
    let order = [['createdAt', 'DESC']];

    if(fetchTop === 'true' ){
      queryParams.showOrder = 1;
      order = [['updatedAt', 'DESC']];
    }
    
    const tagFilter = tag ? { name : tag} :{};
    const categoryFilter = category ? { name : category } : {};

    pageSize = parseInt(pageSize);

    const data = await Article.find({})
    .sort( {id : 1} )
    .skip(offset)
    .limit(pageSize)
    .populate('author tags');


    ctx.body = { code: 200, message: '查询文章列表成功',data: data };

  }

  // 删除文章
  async deleteArticle(ctx) {
    ctx.body = { code: 200, message: '删除文章成功' };
  }
}

module.exports = new ArticlesCtl();

