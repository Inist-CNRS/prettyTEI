var fs = require('fs');
fs.readdir(__dirname + '/tei', function(err,files){
	console.log(files);
});