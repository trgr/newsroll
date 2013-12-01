/**
 * PagesController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var fs = require("fs")
var util  = require("util")

module.exports = {
    
  
    view : function(req,res){
	var page = req.params.page
	var location = util.format("views/pages/%s.ejs",page)				   
	fs.exists(location,function(exists){
	    if(exists)
		return res.view(util.format("pages/%s.ejs",page))
	    return res.view("404.ejs")
	});
},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PagesController)
   */
  _config: {}

  
};
