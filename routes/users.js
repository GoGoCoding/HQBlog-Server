const router = require('koa-router')()

const UserController = require('../controllers/users')

//更新用户信息
router.put('/:id',UserController.updateUser)
//获取用户列表
router.get('/getUserList', UserController.getUserList)
//删除用户
router.delete('delete', UserController.delete)

module.exports = router
