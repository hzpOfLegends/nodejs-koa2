module.exports = function(sequelize){
    // console.log(123,sequelize.DataTypes)
    var User = sequelize.define('user',{
        // id:{
        //     type:DataTypes.UUID,
        //     allowNull:false,
        //     defaultValue:DataTypes.UUIDV1
        // },
        name:{
            type:sequelize.STRING,
            primaryKey:true,
            allowNull:false,
        },
        pass:{
            type:sequelize.STRING,
            allowNull:false, 
        },
        moment:{
            type:sequelize.DATE,
            allowNull:false, 
        }
    },{
        freezeTableName: true
    });
    return User;
};