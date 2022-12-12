var express = require('express');
var router = express.Router();
var Account = require('../models/Account');

/* GET home page. */
router.get('/host.html', async function (req, res, next) {
    var id = req.get('id');
    var user = await Account.findById(id);
    if(user){
        document.body.innerHTML = user.get('menu_saved');

    }
    res.render('host', {title: 'Express'});
});
module.exports = router;
