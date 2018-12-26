const router = require('koa-router')()
const conroller = require('../controller/c_login') 
router.post('/login',conroller.postLogin)
module.exports = router