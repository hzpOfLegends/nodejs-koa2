const router = require('koa-router')()
const conroller = require('../controller/c_test') 
router.post('/test',conroller.test)
module.exports = router