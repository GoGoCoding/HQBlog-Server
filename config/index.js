// const isDev = process.env.NODE_ENV === 'development';
const isDev = true;

module.exports = {

  SALT_WORK_FACTOR: 10, // 生成salt的迭代次数
  TOKEN_SECRET: 'hq-blog',
  TOKEN_EXPIRESIN: '720h', // token 有效期

  connectionStr: isDev ? 'mongodb://39.107.51.59:27017/test?retryWrites=true&w=majority' : 'mongodb+srv://haoqi:tyhwanan@cluster0-gj586.mongodb.net/test?retryWrites=true&w=majority' 
//   ENABLE_EMAIL_NOTICE: false, // 是否开启邮件通知功能 
  // 邮箱的 config 
//   emailTransporterConfig: {
//     host: 'smtp.163.com',
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: isDev ? 'guodadablog@163.com' : 'gershonv@163.com', // generated ethereal user
//       pass: isDev ? '123456XXX' : '123456XXX' // generated ethereal password 授权码 而非 密码
//     }
//   },
//   WEB_HOST: isDev ? 'localhost:3000' : 'https://guodada.fun', // 主机地址（端口）
};