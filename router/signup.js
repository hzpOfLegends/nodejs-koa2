const router = require('koa-router')()
const conroller = require('../controller/c_register') 
router.post('/register',conroller.postSignup)
module.exports = router