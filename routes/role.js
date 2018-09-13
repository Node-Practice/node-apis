const roleController = require('../controller').RoleController;
const express = require('express');
const router = express.Router();

router.post('/',roleController.addRole)
    .delete('/:id',roleController.delete)
    .put('/:id',roleController.update)
    .get('/:id?',roleController.get);

module.exports = router;

