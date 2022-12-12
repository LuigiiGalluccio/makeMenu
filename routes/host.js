var express = require('express');
var router = express.Router();
var Account = require('../models/Account');


router.get('/:orderId([0-9a-fA-F]{24})', async function (req, res, next) {
    var id = req.params.orderId;
    var menu = await Account.findById(id);
    res.render('host',{menu});
});

module.exports = router;

