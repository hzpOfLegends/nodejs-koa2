const sql = require('../sqldb');
const crypto = require('crypto');
const moment = require('moment');
// const Article = require('../sqldb');
// 查询
exports.findDataByName = (name) => {
    return User.findOne({
        where: {
            name
        }
    }).then(function (result) {
        if (result) {
            return false
        } else {
            return true
        }
    }).catch(function (err) {
        console.log("发生错误：" + err);
    });
}
// 查找 并且 创建新用户 => 事务 TEST
exports.TestShiWu = (name, values) => {
    sql.User.findAll({
            group: [
                ['name', 'DESC']
            ]
        })
        .then(result => {
            let arr = []
            for (let item of result) {
                arr.push(item.name)
            }
            console.log(arr)
        })
    // 使用条件
    // sql.User.findAll({where:{
    //     name:{
    //         [sql.Op.like]:'%3'
    //     }
    // }}).then(result => {
    //     let array = []
    //     for(let item of result){
    //         array.push(item.dataValues.name)
    //     }
    //     console.log(array)
    // })
    // 登錄

}
// 查找 并且 创建新用户
exports.registerNewUser = (name, values) => {
    return sql.User.findById(values.id).then(project => {
        if (!project) {
            return true
        } else {
            return false
        }
    }).then(project => {
        if (project) {
            return sql.User.findOrCreate({
                    where: {
                        name: name
                    },
                    defaults: values
                })
                .spread((user, created) => {
                    if (created) {
                        return true
                    } else {
                        return false
                    }
                })
        }
    })
    // return sql.User.findOrCreate({where:{name:name,id:values.id},defaults:{pass:values.pass,moment:values.moment}})
    // .spread((user,created)=>{
    //     console.log({name:name,id:values.id})
    //     console.log("user",user)
    //     if(created){
    //         return true
    //     }else{
    //         console.log(user)
    //     }
    // })
}
// 保存用户信息
exports.saveUserInfo = (name, values) => {
    return sql.User_Info
        .findOrCreate({
            where: {
                name: name
            },
            defaults: values
        })
        .spread((user, created) => {
            if (created) {
                return true
            } else {
                return User_Info.update(values, {
                    where: {
                        name: name
                    }
                }).then(result => {
                    return result
                }).catch(err => {
                    return err
                })

            }
        })
}
// 查找数据库用户名含有P
exports.userNameHaveP = (name) => {
    return sql.User
        .findAndCountAll({
            where: {
                name: {
                    $like: 'p%'
                }
            },
            offset: 0
        })
        .then(result => {
            let Arrays = []
            for (let i = 0; i < result.rows.length; i++) {
                Arrays.push(result.rows[i].name)
            }
            return {
                count: result.count,
                name: Arrays
            }
        });
}
// 插入
exports.InserNewUser = (value) => {
    return sql.User.create(value).then(function (result) {
        if (result) {
            return true
        } else {
            return false
        }
    }).catch(function (err) {
        console.log("发生错误：" + err);
    });
}
// 登录
exports.login =  (name, pass) => {
    return sql.db.sequelize.transaction((t) => {
            return sql.User.findOne({
                    where: {
                        name: name
                    },
                    transaction: t
                })
                .then((user) => {
                    let userInfo = user.dataValues
                    if (userInfo && name === userInfo.name && pass === userInfo.pass) {
                        return userInfo
                    } else {
                        throw "賬戶密碼錯誤"
                    }
                })
                .then((user) => {
                    const hash = crypto.createHash('md5');
                    hash.update(user.name)
                    let session_id = hash.digest('hex')
                    let time = moment().format('YYYY-MM-DD hh:mm:ss')
                    return sql.Session
                        .findOrCreate({
                            where: {
                                user_id: user.id
                            },
                            defaults: {
                                session_id: session_id,
                                expiration_time: time
                            },
                            transaction: t
                        })
                        .spread((user, created) => {
                            if (created) {
                                return true
                            } else {
                                return sql.Session.update({
                                        expiration_time: time
                                    }, {
                                        where: {
                                            expiration_time: {
                                                [sql.Op.ne]: null
                                            }
                                        }
                                    })
                                    .spread((result, updateBoo) => {
                                        if (result == 1) {
                                            return {
                                                code: 200,
                                                result: "登陸成功"
                                            }
                                        }
                                    })
                            }
                        })
                })
        }).then((result) => {
            console.log("事务result", result)
            return result
        })
        .catch((err) => {
            console.log("事务err", err)
        })
}