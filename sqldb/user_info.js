var config = require('../config');
var Sequelize = require('sequelize');
var db = {
    sequelize:new Sequelize(config.sequelize.database,config.sequelize.username,config.sequelize.password,config.sequelize)
};
// console.log(1,db.sequelize)
// db.User = db.sequelize.import('../model/user.js');
var User_Info = db.sequelize.define('userinfo',{
    name:{
        type:Sequelize.STRING,
        primaryKey:true,
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
User_Info.sequelize.sync({force: false}).then(function() {
    console.log(User_info)
    console.log("Server successed to start");
}).catch(function(err){
    console.log("Server failed to start due to error: %s", err);
});
module.exports = User_Info;