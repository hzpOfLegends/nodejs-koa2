const router = require('koa-router')()
const conroller = require('../controller/c_save_user_info.js') 
router.post('/save_user_info',conroller.user_count)
module.exports = router