/**
 * NewsController
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

var urlTool = require("url");
module.exports = {
    
    index: function(req,res){
	
	News.find({}).sort('createdAt DESC').done(function(err,news){
	    return res.view({news:news,user:req.user})
	});
    },

    submit : function(req,res){
	if (req.method == "GET")
	    return res.view()
	
	if (req.method != "POST")
	    return res.send("Something fishy")
	
	var title = req.body.inputTitle
	var url   = req.body.inputUrl
	var info = urlTool.parse(url)
	News.create({
	    title : title,
	    url : url,
	    host: info.hostname
	}).done(function(err,news){
	    return res.view("news/submitok.ejs")
	});
	
    },
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to NewsController)
   */
  _config: {}

  
};
