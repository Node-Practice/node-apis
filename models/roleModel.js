'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
        name: {// 权限名称
            type: 'String',
            index: true,
            unique:true,
            sparse: true
        },
        isDeleted:{
            type: Boolean,
            default: false
        }
    },
    {
        versionKey: false,//去掉版本锁 __v0
        timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}//自动管理修改时间
    });




const roleModel = mongoose.model('role', roleSchema);

roleSchema.pre('save', function (next) {
    roleModel.countDocuments({name:this.name}).then(count =>{
        if(count && count > 0){
            console.log(count);
            next(new Error("请不要添加重复的权限"));
        }else {
            next();
        }
    });
});

module.exports = roleModel;

