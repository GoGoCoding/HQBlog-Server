const Router = require('koa-router');
const router = new Router({ prefix: '/tags'} );
const jwt = require('koa-jwt');

const {
    create,
    getTags
} = require('../controllers/tags');


const { TOKEN_SECRET } = require('../config');
const auth = jwt({ secret: TOKEN_SECRET });

router.post('/create',auth, create);
router.get('/getTags', getTags);

module.exports = router;