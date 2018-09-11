const user_routers = require('./users');
const createError = require('http-errors');
const configs = require('../configs/app.settings');
const routes = function (app) {
    app.use('/user',user_routers);
    app.use('*',function (req,res,next) {
        next(createError(404));
    });
    if(configs.environment === "DEV"){
      app.use(ClientErrorHandler);
    }else {
      app.use(LogErrorHandler);
    }
};

/**
 * 处理掉所有的错误
 * @param err
 * @param req
 * @param res
 * @param next
 * @constructor
 */
function LogErrorHandler(err,req,res,next){
  console.error(err);
  res.status(200).send('没有找到路由,请确定URL');
}

/**
 * 客户端处理
 * @param err
 * @param req
 * @param res
 * @param next
 * @constructor
 */
function ClientErrorHandler(err,req,res,next) {
    next(err);
}



module.exports = routes;
