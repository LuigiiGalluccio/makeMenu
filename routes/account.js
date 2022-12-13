var express = require('express');
const Account = require("../models/Account");
var router = express.Router();

/* GET Account page. */
router.get('/', async function(req, res, next) {

    if(req.isAuthenticated()){
        var id = req.session.passport.user;
        var user = await Account.findById(id);
        console.log( "utente:"+user);
        if(user){
         res.render('logged_in/edit_page.ejs',{user:user});
        }else{
            res.render('logged_in/edit_page.ejs');
        }}
    else
        res.redirect('/login?failed=false');
});

/* GET Logout. */
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {

        if (err)
            return next(err);
        else
            res.redirect('/');
    });

});

router.post('/', async function (req, res, next){
    var menu = req.body.container;
    var id = req.session.passport.user;
    await Account.findByIdAndUpdate(id,{menu_saved:menu});
    res.send(id);
});


module.exports = router;