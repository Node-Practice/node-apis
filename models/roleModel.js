'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name:{// 权限名称
        type:String,
    },
});

var roleModel = mongoose.Model('roleModel',roleSchema);

export default roleModel;
