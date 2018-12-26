var config = require('../config');
var Sequelize = require('sequelize');
var db = {
    sequelize:new Sequelize(config.sequelize.database,config.sequelize.username,config.sequelize.password,config.sequelize)
};
// console.log(1,db.sequelize)
// db.User = db.sequelize.import('../model/user.js');
// 注册用户表
const User = db.sequelize.define('users',{
    id:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    pass:{
        type:Sequelize.STRING,
        allowNull:false, 
    },
    moment:{
        type:Sequelize.DATE,
        allowNull:true, 
    },
    // 创建时间
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    // 更新时间
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    }
},{
    timestamps: false,
    // deletedAt:false,
    freezeTableName: true
});
// 用户的个人信息
const User_Info = db.sequelize.define('userinfo',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false, 
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    age:{
        type:Sequelize.INTEGER,
        allowNull:true, 
    },
    gender:{
        type:Sequelize.STRING,
        allowNull:true, 
    }
},{
    timestamps: false,
    freezeTableName: true
});
// 用户文章
const Article = db.sequelize.define('article',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
    },
    // 文章标题
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'title',
    },
    // 文章作者
    author: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'author'
    },
    // 文章内容
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'content'
    },
    // 文章分类
    category: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'category'
    },
    // 创建时间
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    // 更新时间
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    }
},{
    timestamps: false,
    // deletedAt:false,
    freezeTableName: true
});
const Session = db.sequelize.define('session_store',{
    user_id:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false, 
    },
    session_id:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    expiration_time:{
        type:Sequelize.STRING,
        allowNull:true, 
    },
},{
    timestamps: false,
    freezeTableName: true
})
// User.sequelize.sync({force: false}).then(function() {
//     console.log("Server successed to start --User");
// }).catch(function(err){
//     console.log("Server failed to start due to error: %s", err);
// });
// User_Info.sequelize.sync({force: false}).then(function() {
//     console.log("Server successed to start --User_Info");
// }).catch(function(err){
//     console.log("Server failed to start due to error: %s", err);
// });
// Article.sequelize.sync({force: false}).then(function() {
//     console.log("Server successed to start --Article");
// }).catch(function(err){
//     console.log("Server failed to start due to error: %s", err);
// });
// Session.sequelize.sync({force: false}).then(function() {
//     console.log("Server successed to start --Session");
// }).catch(function(err){
//     console.log("Server failed to start due to error: %s", err);
// });
module.exports.User = User
module.exports.User_Info = User_Info
module.exports.Article = Article
module.exports.Session = Session
module.exports.db = db
module.exports.Op = Sequelize.Op