
var express = require('express');
var app = express();


// configuration ===========================================
app.set('views', './src/views');

app.use(express.static(__dirname + '/src'));
app.use('/libs', express.static(__dirname + '/bower_components'));

app.get('/inicio', function(req, res, next) {
	res.sendFile('index.html', {
		root: './src/views'
	});
});



app.listen(8000, function () {
});