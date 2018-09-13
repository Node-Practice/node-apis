'use strict';
const RoleModel = require('../models').Role;
const createError = require('http-errors');


class RoleController {
    /**
     * 添加权限
     * @param req req.body.name
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async addRole(req, res, next) {
        const role_Name = req.body.name;
        if (!role_Name) {
            return next(createError(400, "请填写权限名称"));
        }
        const newRole = {
            name: role_Name
        };
        const role = new RoleModel(newRole);
        await role.save().then((role) => {
            return res.status(200).json(role);
        }).catch(err => {
            return res.status(500).send('添加权限失败,失败原因: ' + err);
        });
    }

    /**
     * 删除权限
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async delete(req, res, next) {
        const roleId = req.params.id;
        if (!roleId) {
            return next(createError(400, "请提供roleID"));
        }
        let conditions = {
            isDeleted: false
        };
        conditions._id = roleId;
        RoleModel.findOneAndUpdate(conditions, {$set: {isDeleted: true}})
            .then(() => {
                return res.status(200).json("OK");
            }).catch(err => {
            return next(createError(500, "删除权限失败,失败原因：" + err));
        })
    }

    /**
     * 更新权限
     * @param req req.params.roleId; req.body.name
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    async update(req, res, next) {
        const roleId = req.params.id;
        if (!roleId) {
            return next(createError(400, "请提供roleID"));
        }
        const role_Name = req.body.name;
        if (!role_Name) {
            return next(createError(400, "请填写权限名称"));
        }
        let conditions = {
            isDeleted: false
        };
        conditions._id = roleId;
        RoleModel.findOneAndUpdate(conditions, {$set: {name: role_Name}},{new:true})
            .then(role => {
                    console.log(role);
                    return res.status(200).json(role);
            }).catch(err => {
            return next(createError(500, "更新权限失败,失败原因：" + err));
        });


    }

    /**
     * 获得权限
     * @param req req.id?
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    async get(req, res, next) {
        const roleId = req.params.id;
        let conditions = {
            isDeleted: false
        };
        if(roleId) {
            conditions._id = roleId;
        }
        RoleModel.find(conditions).then(roles => {
            return res.status(200).json(roles);
        }).catch(err => {
            return next(createError(500, "获取权限失败,失败原因：" + err));
        })
    }

}

module.exports = new RoleController();