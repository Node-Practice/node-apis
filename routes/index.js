const user_routers = require('./users');
const role_routers = require('./role');
const createError = require('http-errors');
const configs = require('../configs/app.settings');
const routes = function (app) {
    /**
     * 用户相关路由
     */
    app.use('/user',user_routers);
    /**
     * 权限相关路由
     */
    app.use('/role',role_routers);



    app.use('*',function (req,res,next) {
        next(createError(404,'没有找到路由'));
    });
    if(configs.environment !== "DEV"){
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
  // console.error(err);
  res.status(200).send(err);
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
