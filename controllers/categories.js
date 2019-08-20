const Category = require('../models/category');

class CategoryCtl {

    async create (ctx) {
        ctx.verifyParams({
            name: { type: 'string', required: true }
        });
        const name = ctx.request.body.name;
        const data = await Category({
            name: name
          }).save();
          
        ctx.body = { code: 200, message: '成功创建分类' };
    }

    async getCategories (ctx) {

        const data = await Category.find();
        ctx.body = { code: 200, message: '获取分类成功',data : data };
    }
}

module.exports = new CategoryCtl();