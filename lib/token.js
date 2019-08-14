const { TOKEN_SECRET, TOKEN_EXPIRESIN } = require('../config');
const jwt = require('jsonwebtoken');

exports.createToken = info => {
  const token = jsonwebtoken.sign(info, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRESIN });
  console.log('generated token', token);
  return token;
}
