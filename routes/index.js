const fs = require('fs');

const { 
  login, 
  register 
} = require('../controllers/users');

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


  router.get('/', async ctx => {
    ctx.body = 'hello koa2'
  });

  app.use(router.routes(), router.allowedMethods());


}