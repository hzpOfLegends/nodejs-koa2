var config = require('../config');
var Sequelize = require('sequelize');
var db = {
    sequelize:new Sequelize(config.sequelize.database,config.sequelize.username,config.sequelize.password,config.sequelize)
};
const Article = db.sequelize.define('article',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
    },
    // 文章标题
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'title',
    },
    // 文章作者
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'author'
    },
    // 文章内容
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'content'
    },
    // 文章分类
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'category'
    },
    // 创建时间
    createdAt: {
        type: DataTypes.DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    // 更新时间
    updatedAt: {
        type: DataTypes.DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    }
},{
    // timestamps: false,
    updatedAt:false,
    freezeTableName: true
});