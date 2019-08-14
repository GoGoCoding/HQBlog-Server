const { User: UserModel  } = require('../models/users_model');
const { encrypt, comparePassword } = require('../lib/bcrypt');
const { createToken } = require('../lib/token')

class UserCtl {
    //注册
    async register(ctx) {
        ctx.verifyParams({
            username: { type: 'string', required: true},
            password: { type: 'string', required: true},
            email:{type: 'string', required: true},
        });
        const { username, password, email } = ctx.request.body;

        let response; 
        const result = await UserModel.findOne({ email })
        if(result) {
            ctx.throw( 409,'邮箱已被注册' ); 
        }else {
            const user = await UserModel.findOne({ username });
            if (user) { 
                ctx.throw(409, '用户名已被占用')
            }else {
                const saltPassword = await encrypt(password);
                await UserModel({ username, password: saltPassword, email }).save();
                response = { code:200, message:"注册成功" };
            }
        }
        ctx.body = response;
     
    }

    //登录
    async login(ctx) {
        ctx.verifyParams({
            account: { type: 'string', required: true },
            password: { type: 'string', required: true},
        });
        const { account, password } = ctx.request.body;
        
        const user = await UserModel.findOne( { username: account, email: account} );
        if (!user) { ctx.throw(401, '用户名或密码不正确'); };

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) { ctx.throw(401, '用户名或密码不正确'); }

        const { id, auth } = user;
        const token = createToken({ username: user.username, userId: id, auth: user.auth, email: user.email});

        let response = { code: 200, message: '登录成功', username:user.username, auth: user.auth, token: token };
        ctx.body = response;

    }

    //更新账户信息
    async updateUser(ctx) {
        let response = { code: 200, message: '更新账户成功' };
        ctx.body = response;
    }

    //获取用户列表
    async getUserList(ctx) {
        let response = { code: 200, message: '获取用户列表成功' };
        ctx.body = response;
    }

    //删除用户
    async deleteUser(ctx) {
        let response = { code: 200, message: '删除用户成功' };
        ctx.body = response;
    }

    //核验身份
    async checkOwner(ctx, next) {
        if (ctx.params.id !== ctx.state.user._id) { ctx.throw(403, '没有权限'); }
        await next();
      }

};

module.exports = new UserCtl();