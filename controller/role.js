'use strict';
const  RoleModel = require('../models/roleModel');
const createError = require('http-errors');


class RoleController {
    /**
     * 添加权限
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async addRole(req,res,next){
        const role_Name = req.body.name;
        if(!role_Name){
            return next(createError(400,"请填写权限名称"));
        }
        const newRole = {
            name:role_Name
        };
        const role = new RoleModel(newRole);
        // RoleModel.init().then(() =>{
        //     RoleModel.create(role).then(role =>{
        //         console.log(role);
        //         return res.status(200).json(role);
        //     });
        // }).catch(err =>{
        //     console.log(err);
        // });
        await role.save().then((role) =>{
            return res.status(200).json(role);
        }).catch(err =>{
            return res.status(500).send('添加权限失败,失败原因: ' + err);
        });
    }
}
module.exports = new RoleController();