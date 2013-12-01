/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 * Thanks to  Manas Sahoo for info on how to setup sailsjs + passport
 */
var passport = require('passport');
module.exports = {
    signup : function(req,res){
	res.view()
    },
    create : function(req,res){
	var username = req.body.username
	var password = req.body.password
	
	var invite = req.body.invite

	User.create({
	    username : username,
	    password : password,
	    role : 'user'
	}).done(function(err,user){
	    if(err && err.code == 11000)
		return res.view("auth/message.ejs",{message:"Duplicate user"})
	    
	    console.log(err)
	    return res.view("auth/message.ejs",{message :"User created"})
	})
    },
    login: function (req, res) {
    res.view()
  },
  process: function(req, res){
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
	  return res.view("auth/message.ejs",{message :"Login failed"})
      }
	req.logIn(user, function(err) {
            if (err) res.send(err);
	    return res.redirect("/")
	});
    })(req, res);
  },
  logout: function (req,res){
    req.logout();
    res.send('logout successful');
  }
};
