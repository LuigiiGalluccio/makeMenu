var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/host.html', function(req, res, next) {
    res.render('host', { title: 'Express' });
    var id = req.get('id');
});



module.exports = router;
