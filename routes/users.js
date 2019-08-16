const Router = require('koa-router');
const router = new Router({ prefix: '/users'});
const jwt = require('koa-jwt');

const { 
    updateUser,
    getUserList,
    deleteUser: del,
    checkOwner


} = require('../controllers/users');

const { TOKEN_SECRET } = require('../config');

const auth = jwt({ secret:  TOKEN_SECRET });

//更新用户信息
router.patch('/:id',updateUser);
//获取用户列表
router.get('/getUserList',auth, getUserList);
//删除用户
router.delete('/delete', auth, checkOwner, del);

module.exports = router;
