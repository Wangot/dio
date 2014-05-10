module.exports = function attachHandlers (router) {

	router.get('/disaster-feeds', testing);


};
var testing = function(req, res) {
	var path = require('path');
	var Q = require('q');
	var fs = require('fs');

	var db = req.db;

	var modelPath = path.resolve('./', 'models/orm');
	var uploadArticlePath = path.resolve('./', 'views/resources/uploads/article');

	var Article = require(modelPath + '/article')(db);

	var article;
	Q.ninvoke(Article, 'find', {})
	.then(function(articles) {

		for (var i in articles) {

			var dir = uploadArticlePath + '/' + articles[i].id;
			if (fs.existsSync(dir)) {
				var imageUrl = getFiles(dir);
				articles[i].images = imageUrl;
			}
		}

		res.render('public/post_calamity/index', { title: 'Express' , articles : articles });
	})
	.fail(function(err) {
		console.log(err);
	});

	function getFiles(dir) {
		var imageFiles = [];
	    var files = fs.readdirSync(dir);
	    for(var i in files){
	        if (!files.hasOwnProperty(i)) continue;
	        var name = dir+'/'+files[i];
	        if (fs.statSync(name).isDirectory()){
	            getFiles(name);
	        }else{
	        	var imagelink = name.replace(/\/opt\/web\/nodejs\/dio\/views\/resources/g, '/public');
	            imageFiles.push(imagelink);
	        }
	    }

	    return imageFiles;
	}

}