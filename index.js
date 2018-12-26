const koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser');
const config = require('./config');
const MysqlStore = require('koa-mysql-session');
const session = require('koa-session-minimal');
const koaBody = require('koa-body');
const app = new koa()
// 路由文件名
const router_file_name = ['signup','login','user_count','send_file','test','save_user_info']
// session存储配置
const sessionMysqlConfig = {
    user: config.sequelize.username,
    password: config.sequelize.password,
    database: config.sequelize.database,
    host: config.sequelize.host,
}
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
// 配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}))
app.use(bodyParser())
// 注册路由
for(let item of router_file_name){
    app.use(require(`./router/${item}.js`).routes())
}
app.listen(3000)