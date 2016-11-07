
var express = require('express');
var app = express();
var watson = require('watson-developer-cloud');


// configuration ===========================================
app.set('views', './src/views');

app.use(express.static(__dirname + '/src'));
app.use('/libs', express.static(__dirname + '/bower_components'));

app.get('*', function(req, res, next) {
	res.sendfile('index.html', {
		root: './src/views'
	});
});

var visual_recognition = watson.visual_recognition({
  api_key: '7de1e5ad54445dbe9ed14e310b7665256dc3d4ae',
  version_date: '2016-05-20'
});


app.listen(8000, function () {
});