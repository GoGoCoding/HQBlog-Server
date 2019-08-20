const Tag = require('../models/tags');
class TagCtl {

  async create(ctx){
    ctx.verifyParams({
      name: {type: 'string', required: true}
    });

    const { name } = ctx.request.body;
    const data = await Tag({
      name: name
    }).save();
    ctx.body = { code: 200, message: '成功创建tag' };
  }
    
  // 获取tags
  async getTags(ctx) {
    const data = await Tag.find();
      ctx.body = { code: 200, message: '获取tags成功',data: data };
  }

}

module.exports = new TagCtl();