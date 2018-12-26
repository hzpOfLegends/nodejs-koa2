const userModel = require('../lib/mysql1.js');
exports.postSignup = async ctx => {
    let {
        name,
        pass,
        moment
    } = ctx.request.body;
    var chars = ['0','1','2','3','4','5','6','7','8','9',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
    ];
    function generateMixed(n) {
        global.res = "";
        for(var i = 0; i < n ; i ++) {
            let id = Math.ceil(Math.random()*61);
            res += chars[id];
        }
        return global.res;
    }
    let id = generateMixed(12);
    if (name && pass && moment) {
        await userModel.registerNewUser(name, {
                id:id,
                pass: pass,
                moment: moment
            })
            .then(async (result) => {
                if (result) {
                    ctx.body = {
                        code: 200,
                        message: "注册成功"
                    }
                } else {
                    ctx.body = {
                        code: 400,
                        message: "该用户以存在"
                    }
                }
            }).catch(err =>{
                ctx.body = err
            })
    } else {
        ctx.body = {
            code: 401,
            message: "传正确参数"
        }
    }

}