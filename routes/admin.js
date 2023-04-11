const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const passport = require('passport');

router.get('/Signup', passport.checkAdminAuthentication, adminController.signup);
router.get('/login', passport.checkAdminAuthentication, adminController.signin);
router.get('/dashboard',passport.isAdmin, adminController.dashboard);
router.post('/createAdmin',adminController.createAdmin);
router.post('/create-Session/:userType',
    passport.authenticate('local',
    {
        failureRedirect: '/admin/login',
        failureFlash : true
    }),
    function(req, res) {
        res.redirect('/admin/dashboard');
    }
    );
module.exports = router;