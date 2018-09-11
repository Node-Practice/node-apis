const roleController = require('../controller/role');
const express = require('express');
const router = express.Router();

router.post('/',roleController.addRole)
    .get('/',function (req,res) {
        res.status(200).send("No Content");
    });

module.exports = router;

