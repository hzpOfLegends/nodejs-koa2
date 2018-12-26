// const config = {
//     port : 3000 ,
//     // 数据库默认配置
//     database:{
//         DATABASE:'hzp',
//         USERNAME:'root',
//         PASSWORD:'a10116248',
//         PORT: '3306',
//         HOST: '127.0.0.1'
//     }
// }
const config = {
    sequelize: {
        username: 'root',
        password: 'a10116248',
        database: 'hzp',
        host: "localhost",
        dialect: 'mysql',
        define: {
            underscored: false,
            timestamps: true,
            paranoid: true
        }
    }
}
module.exports = config