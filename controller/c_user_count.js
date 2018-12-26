const userModel = require('../lib/mysql1.js');
exports.user_count = async ctx => {
    let count ;
    await userModel.userNameHaveP()
    .then(result => {
        // ctx.body = {
        //     count:result[0]['count(*)']
        // }
        // console.log(result)
        ctx.body = {
            count:result.count,
            name:result.name
        }
    })
}