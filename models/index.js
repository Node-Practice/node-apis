const mongoose = require('mongoose');
const config = require('../configs/app.settings');

mongoose.Promise = global.Promise;

mongoose.connect(config.dbUrl,config.dbOptions)
    .then(() =>{
        console.log('已成功连接上数据库');
    })
    .catch((err) =>{
        console.log((err));
        process.exit(1);
    });

module.exports = {
    Role:require('./roleModel'),
    User:require('./userModel')
};
