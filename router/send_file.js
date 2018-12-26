const router = require('koa-router')()
const conroller = require('../controller/c_file.js') 
router.post('/send_file',conroller.insertFile)
module.exports = router