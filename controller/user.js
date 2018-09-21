'use strict';
const UserModel = require('../models').User;
const createError = require('http-errors');

class UserController {
    async add(req,res,next){
        const newUser = req.body;
        

    }
}

module.exports = new UserController();