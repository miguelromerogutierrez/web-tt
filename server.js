
var express = require('express');
var app = express();
var twilio = require('twilio');
var http = require('http');
	
var clientTwilio = twilio('AC684d56373befd933db5616c4b2e58c48', '456e33bb42a9f70ce96359251f07c222');
// var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');


// configuration ===========================================
app.set('views', './src/views');

app.use(express.static(__dirname + '/src'));
app.use('/libs', express.static(__dirname + '/bower_components'));

app.get('/activate/device/:serial', function(req, response, next) {
	console.log('servicio de sms');
	var options = {
	  host: '104.154.249.88',
	  port: 8080,
	  path: '/AlertAmberTT/api/flow/device/position?serial='+req.params.serial
	};

	function request () {
		http.get(options, function(res) {
			var body;
		  console.log('STATUS: ' + res.statusCode);
		  console.log('HEADERS: ' + JSON.stringify(res.headers));
		  res.setEncoding('utf8');
		  res.on('data', function (chunk) {
		    console.log('BODY: ' + chunk);
		    body = chunk;
		  });
		  res.on('end',function() {
		  	response.send(body);
		  });
		});
	}
	clientTwilio.sendMessage({
		to: '+525576321427',
		from: '+14436663381',
		body: 'ACTIVAR'
	});

	setTimeout(request, 15000);
});

app.get('*', function(req, res, next) {
	res.sendfile('index.html', {
		root: './src/views'
	});
});

// var visual_recognition = new VisualRecognitionV3({
//   api_key: '7de1e5ad54445dbe9ed14e310b7665256dc3d4ae',
//   version_date: '2016-05-20'
// });

app.listen(8000, function () {
});
