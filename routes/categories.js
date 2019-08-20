Router = require('koa-router');
router =  new Router({ prefix: '/categories'});

const jwt = require('koa-jwt');

const {
    create,
    getCategories
} = require('../controllers/categories');

const { TOKEN_SECRET } = require('../config');
const auth = jwt({ secret: TOKEN_SECRET });

router.post('/create',auth, create);
router.get('/getCategories', getCategories);

module.exports = router;