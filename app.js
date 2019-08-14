const Koa = require('koa');
const cors = require('koa2-cors');
const error = require('koa-json-error');
const parameter =require('koa-parameter');
const mongoose = require('mongoose');
const path = require('path');
const koaBody = require('koa-body');
const logger = require('koa-logger');

const routing = require('./routes');
const { connectionStr } = require('./config');

mongoose.connect(connectionStr, { useNewUrlParser: true }, () => console.log('MongoDB 连接成功了！'));
mongoose.connection.on('error', console.error);

const app = new Koa();
app
  .use(cors())
  .use(error({
    postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
  }))
  .use(logger())
  .use(koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '/public/uploads'),
      keepExtensions: true,
    }
  }));

app.use(parameter(app));
routing(app);

module.exports = app
