'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: { // 姓名
        type: String,
    },
    password: { // 密码
        type: String,
        minlength: 6
    },
    age: { // 年龄
        type: Number,
        min: 0,
    },
    birthday: { // 生日
        type: Date,
    },
    roles: { // 用户权限
        type: Array,
        default: [{type:Schema.Types.ObjectId, ref:'roleModel'}],
    },
    status: { // 用户状态
        type: Number,
        default: 0, // 0: 可用，1: 删除
    }
}, {
    timestamps: true // 使用timestamps会添加createdAt 和 updateAt字段
});
// 创建model
var userModel = mongoose.model('userModel', userSchema);
// 设置options
// 可以调用ToJson方法转换为JSON字符串
userSchema.set("toJSON",{getters:true});
userSchema.set("toObject",{getters:true});









export default userModel;