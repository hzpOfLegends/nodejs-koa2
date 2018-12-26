const userModel = require('../lib/mysql1.js');
const fs = require('fs')
const path = require('path')
exports.insertFile = async ctx => {
    let fileName;
    // 上传单个文件
    const file = ctx.request.files.file_base;
    // 为文件取名
    fileName = `${Date.now()}.${file.name.split(".")[1]}`
    // 创建可读流
    const reader = fs.createReadStream(file.path)
    let filePath = path.join(__dirname, '../public/') + `${fileName}`;
    // 写入数据库
    if (filePath) {
        await userModel.insertFile([filePath])
            .then(result => {
                if (result) {
                    ctx.body = {
                        code: 200,
                        message: "上传成功",
                        file_path:filePath
                    }
                    // 创建可写流
                    const upStream = fs.createWriteStream(filePath);
                    // 可读流通过管道写入可写流
                    reader.pipe(upStream);
                }
            })
    } else {
        ctx.body = {
            code: 404
        }
    }

}