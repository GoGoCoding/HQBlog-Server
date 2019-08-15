const User = require('../models/users');
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
        if (!user) { ctx.throw(401, '用户名或密码不正确'); }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) { ctx.throw(401, '用户名或密码不正确'); }

        const { id, auth } = user;
        const token = createToken({ username: user.username, userId: id, auth: user.auth, email: user.email});

        let response = { code: 200, message: '登录成功', username:user.username, auth: user.auth, token: token };
        ctx.body = response;

    }

    //更新账户信息
    async updateUser(ctx) {
        const userID = ctx.params.id; //userId
        const { username, oldPassword, email } = ctx.request.body;
        const user = await User.findById(userID);
        let finalBody = { };
        if(oldPassword) {
            const isMatch = await comparePassword(oldPassword, user.password);
            if (!isMatch) { ctx.throw(401, '原密码不正确'); }

            const eamilResult = await UserModel.findOne({ email });
            if (eamilResult.id === user.id || !eamilResult){
                continue ;
            }else { 
                ctx.throw( 409,'邮箱已被注册' ); 
            }
            
            const userResult = await UserModel.findOne({ username });
            if (userResult.id === user.id || !userResult) { 
                continue ;
            }else {
                ctx.throw(409, '用户名已被占用');
            }
        }else {
            ctx.throw(401,'请输入原密码验证您的身份');
        }

        if(username){
            finalBody.username = username;
        }
        if(email){
            finalBody.email = email;
        }

        User.findByIdAndUpdate(userId, finalBody);
        let response = { code: 200, message: '更新账户成功' };
        ctx.body = response;
    }

    //获取用户列表
    async getUserList(ctx) {

        const { page = 1, pageSize = 10, username } = ctx.query;
        const offset = (page - 1) * pageSize;


        const data = await User.find( { username: new RegExp(ctx.query.q) }, 'username email createdAt updatedAt')
                                .sort( {id : 1} )
                                .skip(offset)
                                .limit(pageSize);

        let response = { code: 200, message: '获取用户列表成功', data: data };
        ctx.body = response;
    }

    //删除用户
    async deleteUser(ctx) {
        let { userId} = ctx.query;
        userId = parseInt(userId);

        await User.findByIdAndRemove(ctx.params.id);
        if (!user) { ctx.throw(404, '用户不存在'); }
        let response = { code: 204, message: '成功删除用户' };
        ctx.body = response;
    }

    //核验身份
    async checkOwner(ctx, next) {
        if (ctx.params.id !== ctx.state.user._id) { ctx.throw(403, '没有权限'); }
        await next();
      }

};

module.exports = new UserCtl();