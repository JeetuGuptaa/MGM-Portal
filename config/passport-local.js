const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/Admin');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
    async function(req, email, password, done) {
      try{
        //passing userType in params to ease the search
        if(req.params.userType=='admin'){
            const admin = await Admin.findOne({ email: email });
            if(!admin) return done(null, false, {message : "Admin doesn't exists"});
            if(admin.password != password){
              return done(null, false, {message : "Invalid Credentials"});
            }
            return done(null, admin);
        }else if(req.params.userType == 'student'){
          //TODO
        }
        else if(req.params.userType == 'teacher'){
          //TODO
        }
      }catch(err){
        done(err);
      }
    }
));

passport.serializeUser(function(admin, done){
  done(null, admin.id);
});

passport.deserializeUser( async function(id, done){
  try{
    const admin = await Admin.findById(id);
    return done(null, admin);
  }catch(err){
    console.log("Error in finding admin->passport", err);
    return done(err);
  }
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        if(req.xhr){
            return res.status(200).json({
                data : {
                    redirect : '/admin/login'
                },
                message : 'User not loggedIn',
            });
        }
        return res.redirect('/admin/login');
    }
    
}

passport.setAutherizedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
}

passport.isAdmin = async function(req, res, next){
  if(req.isAuthenticated()){
    const admin = Admin.findOne({email : req.user.email});
    if(admin){
      next();
    }
    //TODO
    // Check if the signed in user is student or teacher and redirect them ti their dashboard
    else return res.redirect('/home');
  }
  else return res.redirect('/admin/login');
}

passport.checkAdminAuthentication = async function(req, res, next){
  if(req.isAuthenticated()){
    const admin = await Admin.findById(req.user.id);
    if(admin){
      return res.redirect('/admin/dashboard');
    }
    //TODO
    //Redirect Accordingly
    else return res.redirect('/home');
  }else{
    next();
  }
}

module.exports = passport;