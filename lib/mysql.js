var mysql = require('mysql')
var config = require('../config')
var 
var pool = mysql.createPool({
    host: config.sequelize.host,
    user: config.sequelize.username,
    password: config.sequelize.passwoed,
    database: config.sequelize.database,
    port: config.sequelize.port
});

let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                })
            }
        })
    })
}
// 注册用户
exports.insertData = ( value ) => {
  let _sql = "insert into users set name=?,pass=?,moment=?;"
  return query( _sql, value )
}
// 插入文件名
exports.insertFile = ( value ) => {
    console.log(value)
    let _sql = "insert into file set filePath=?;"
    return query( _sql, value )
}
// 通过名字查找用户数量判断是否已经存在
exports.findDataCountByName =  ( name ) => {
    let _sql = `select count(*) as count from users where name="${name}";`
    return query( _sql)
}
// 通过名字查找用户
exports.findDataByName =  ( name ) => {
    let _sql = `select * from users where name="${name}";`
    return query( _sql)
}
// 获取用户数量
exports.findDataUserCount =  ( name ) => {
    let _sql = `select count(*) from users;`
    return query( _sql)
}