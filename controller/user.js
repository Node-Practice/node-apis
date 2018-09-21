'use strict';
const UserModel = require('../models').User;
const createError = require('http-errors');

class UserController {
    /**
     * 添加用户
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async add(req,res,next){
        var name = req.body.name ? req.body.name.replace(/(^\s+)|(\s+$)/g, ""):'';
        var err_msg;
        if(name === ''){
            err_msg = "请填写用户名";
        }else if(req.body.password === '') {
            err_msg = "请填写密码";
        }else if(req.body.password.length <6){
            err_msg = "密码长度不合法";
        }
        if(err_msg){
            next(400,err_msg);
        }
        var newUser = new UserModel(req.body);
        newUser.saveAsync().then(user => {
            return res.status(200).json({user_id:user._id});
        }).catch(err => {
            return res.status(500).json(err);
        });
    }
    /**
     * 获得所有用户
     * @param {*} req req.query.currentPage, req.query.pageSize,  req.query.sortName req.query.sortOrder: desc
     * @param {*} res 
     * @param {*} next 
     */
    async list(req,res,next){
        var currentPage = (parseInt(req.query.currentPage) > 0) ? parseInt(req.query.currentPage) : 1;
        var pageSize = (parseInt(req.query.pageSize) > 0) ? parseInt(req.query.pageSize) : 10; 
        var startRow = (currentPage -1 ) * pageSize;
        
        var sortName = String(req.query.sortName) || "createdAt";

        var sortOrder = req.query.sortOrder;

        if(sortOrder === "desc"){
            sortName = "-" + sortName;
        }
        UserModel.estimatedDocumentCount().then(count => {
            return UserModel.find({}).skip(startRow)
                    .limit(pageSize)
                    .sort(sortName)
                    .populate({path:'roles',select:'name'})
                    .exec().then(users => {
                        return res.status(200).json({users: users,count: count});
                    });
        }).catch(err => {
            console.log(err);
            return next(500, err);
        })
    }



}

module.exports = new UserController();