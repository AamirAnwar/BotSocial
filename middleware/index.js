var middlewareObj = {};


// Check if user is logged in
middlewareObj.isLoggedIn = function(req,res,next){
	if (req.isAuthenticated()) {
		return next();
	}
	else {
		// Flash auth error message
		res.redirect('/login');
	}
}
module.exports = middlewareObj;
