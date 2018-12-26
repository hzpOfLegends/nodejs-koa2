const userModel = require('../lib/mysql1.js');
exports.postLogin = async ctx => {
    let {name,pass} = ctx.request.body
    await userModel.login(name,pass)
    .then(res =>{
        ctx.body = res
        
    })
    .catch(err =>{
        console.log("login",err)
    })
    // .then(result => {
        // if(result.length && result[0].name === name && result[0].pass == pass){
        //     ctx.body = {
        //         code:200,
        //         message:"登陆成功"
        //     }
        // }else{
        //     ctx.body = {
        //         code:300,
        //         message:"登陆失败"
        //     }
        // }
    // })
}