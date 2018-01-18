// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
let friends = require("../data/friend.js");

// Routes
// =============================================================
module.exports = function(app) {
// ===============================================================================

  // Routes
  app.get("/api/friends", function(req, res) {
  	res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

  	let match_index = null;
  	let smallest_diff = false;

  	let find_match_diff = (newser_array , matcher_array) => {

  		return matcher_array.reduce( (total , current_val , index) => {
  			return total + (Math.abs(parseInt(current_val) - parseInt(newser_array[index])))
  		}, 0);
  	}

  	friends.forEach( (friend, index) => {
  		let curr_diff = find_match_diff(req.body.scores , friend.scores);
  		if (isNaN(parseInt(smallest_diff))){
  			match_index = index;
  			smallest_diff = curr_diff;
  		}
  		else if (curr_diff < smallest_diff) {
  			match_index = index;
  			smallest_diff = curr_diff;
  		};
  	});
  	res.json(friends[match_index]);
  });

};
