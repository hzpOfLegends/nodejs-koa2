const sql = require('../sqldb');
const moment = require('moment');
const ComMethods = {
    async VerfitySession(token){
        if(token){
           await sql.Session.findOne({
            where: {
              session_id:token
            }
          })
           .then(result =>{
                console.log(result)    
           }) 
        }
    }
}
module.exports = ComMethods