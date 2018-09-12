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
        await role.save().then((role) =>{
            return res.status(200).json(role);
        }).catch(err =>{
            return res.status(500).send('添加权限失败,失败原因: ' + err);
        });
    }

    async update(req,res,next){
        const roleId = req.params.roleId;
        if(!roleId){
            return next(createError(400,"请提供roleID"));
        }
        const role_Name = req.body.name;
        if(!role_Name){
            return next(createError(400,"请填写权限名称"));
        }

        RoleModel.findOneAndUpdate({id:roleId},{$set:{name:role_Name}})
        .then(role =>{
            return res.status(200).json(role);
        }).catch(err => {
            
        })



    }


}
module.exports = new RoleController();