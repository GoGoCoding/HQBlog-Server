const Router = require('koa-router');
const router = new Router( { prefix: '/articles'});
const jwt = require('koa-jwt');

const {
    create,
    update,
    getArticleById,
    getArticleList,
    deleteArticle: del
} = require('../controllers/articles');

const { secret } = require('../config');
const auth = jwt({ secret });

router.post('/create',auth, create);
router.patch('/update', auth, update);
router.get('/get/:id',getArticleById);
router.get('/getList', getArticleList);
router.delete('/delete', del);


module.exports = router;