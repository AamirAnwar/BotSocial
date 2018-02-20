var express = require('express');
var app = express();
var PORT = 3000

app.get("/", function(req, res){
	res.render("<html><body><h1>Hello world</h1><body></html>");
});


app.listen(PORT, function() {
	console.log("Server started on " + PORT);
});