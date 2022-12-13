var express = require('express');
var router = express.Router();
var Account = require('../models/Account');
var qr = require('qrcode');

router.get('/:orderId([0-9a-fA-F]{24})', async function (req, res, next) {
    var id = req.params.orderId;
    var menu = await Account.findById(id);
    res.render('host',{menu});
});

router.get('/:orderId([0-9a-fA-F]{24})/qrcode', async function (req, res, next) {
    var id = req.params.orderId;
    res.send('<img src=\"' + await qr.toDataURL(id,{width: 100})+ '\">');
});
module.exports = router;

