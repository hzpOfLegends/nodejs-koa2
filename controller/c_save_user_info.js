const userModel = require('../lib/mysql1.js');
exports.user_count = async ctx => {
    let {
        name,
        age,
        gender
    } = ctx.request.body;
    await userModel.saveUserInfo(name,{age:age,gender:gender})
    .then(result => {
        // ctx.body = {
        //     count:result.count,
        //     name:result.name
        // }
        if(typeof result == 'boolean'){
            ctx.body = {
                code:200,
                message:'保存成功'
            }
        }else{
            if(result==1){
                ctx.body = {
                    code:200,
                    message:'修改成功'
                }
            }else{
                ctx.body = {
                    code:result.parent.errno,
                    message:result.parent.code
                }
            }
        }
    })
}