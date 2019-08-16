// const { Tag, Article } = require('../models');
const Tag = require('../models/tags');
const Article = require('../models/articles');
const Category = require('../models/Category');
class TagCtl {
    
  // 获取tags
  async getTags(ctx) {
    const data = await Tag.find();
      ctx.body = { code: 200, message: '获取tags成功',data: data };
  }

  //根据tag获取Articles
  async getArticlesByTag(ctx) {
    let { page = 1, pageSize = 15, name } = ctx.query;
    const offset = (page - 1) * pageSize;

    const data = await Article.find({}, 'id title createdAt')
                                .sort( { id:1 } )
                                .skip(offset)
                                .limit(pageSize);
    
    ctx.body = { code: 200, message: '根据tag获取Articles成功', data:data};
  }
}

module.exports = new TagCtl();