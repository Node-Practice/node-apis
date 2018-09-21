const express = require('express');
const router = express.Router();
const userController = require('../controller').UserController;
/* GET users listing. */
router.get('/list',userController.list);

module.exports = router;
