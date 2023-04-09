const Admin = require('../models/Admin');

module.exports.signup = function(req, res){
    return res.render('AdminSignUp');
}

module.exports.signin = function(req, res){
    return res.render('AdminSignIn');
}

module.exports.createAdmin = async function(req, res){
    try{
        if(req.body.password != req.body.confirmPassword){
            console.log("Password Mismatch, Redirecting to home");
            return res.redirect('/');
        }
        const adminExists = await Admin.findOne({email : req.body.email});
        if(adminExists){
            console.log("Already Exists, redirecting to home");
            return res.redirect('/');
        }
        const admin = await Admin.create(req.body);
        console.log("Admin created Successfully");
        return res.redirect('/admin/login');
    }catch(err){
        console.log("Error in completing request while creating Admin", err);
        return res.redirect('/');
    }
}

module.exports.dashboard = function(req, res){
    return res.render('adminDashboard');
}
