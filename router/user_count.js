const router = require('koa-router')()
const conroller = require('../controller/c_user_count.js') 
router.post('/user_count',conroller.user_count)
module.exports = router