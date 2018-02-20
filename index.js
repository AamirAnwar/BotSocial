var express = require('express');
var app = express();
var PORT = 3000


app.use(express.static('public'));
app.set('view engine','ejs');
app.get("/*", function(req, res){
	res.render("home");
});


app.listen(PORT, function() {
	console.log("Server started on " + PORT);
});