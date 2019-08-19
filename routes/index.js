const fs = require('fs');

const { 
  login, 
  register 
} = require('../controllers/users');

const { 
  getTags, 
  getArticlesByTag 
} = require('../controllers/tags');

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach( (file) => {
    if(file === 'index.js') { return; };
    const route = require(`./${file}`);

    app.use(route.routes()).use(route.allowedMethods());
  })

  const router = require('koa-router')();

  // 登录注册
  router.post('/login', login);
  router.post('/register', register);

//   // 获取所有标签以及每个标签的总数
// router.get('/tags/getList', getTags)
// //根据标签的名字获取文章
// router.get('/tags/getArticles', getArticlesByTag)


  router.get('/', async ctx => {
    ctx.body = 'hello koa2'
  });

  app.use(router.routes(), router.allowedMethods());


}