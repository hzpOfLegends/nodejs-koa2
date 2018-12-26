const userModel = require('../lib/mysql1.js');
exports.test = async ctx => {
    let {
        name,
        pass,
        moment
    } = ctx.request.body
    if (name && pass && moment) {
        await userModel.TestShiWu()
            .then(async (result) => {
                // if (result) {
                //     await userModel.InserNewUser({
                //             name,
                //             pass,
                //             moment
                //         }).then( result => {
                //            if(result){
                //                 ctx.body = {
                //                     code: 200,
                //                     message: `创建成功`
                //                 } 
                //             }else{
                //                 ctx.body = {
                //                     code: 400,
                //                     message: `创建失败`
                //                 } 
                //             }
                //         })
                // } else {
                //     ctx.body = {
                //         code: 400,
                //         message: `用户名已经存在`
                //     }
                // }

            })
    }
}