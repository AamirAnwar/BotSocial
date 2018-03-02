const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const Story = mongoose.model('Story');
const middleware = require('../../../middleware');


// Get all stories
// TODO load more

router.get('/', passport.authenticate('jwt', { session: false }),function(req,res) {
  // console.log(req);
  GetStories(function(stories){
		res.send(stories);
	});
});

// Get a particular story
router.get('/:id', function(req,res) {

});

// Create a story
router.post('/:id', function(req,res) {

});

// Delete a story
router.delete('/:id', function(req,res) {

});

// Update a Story
router.put('/:id', function(req,res) {

});

// Helpers
var GetStories = function(callback){
	Story.find({},null,{sort:'-date'}).populate('author').exec(function (err, stories) {
		if (err) {
			callback([]);
		}
		else {
			callback(stories);
		}
	});
}

module.exports = router;
