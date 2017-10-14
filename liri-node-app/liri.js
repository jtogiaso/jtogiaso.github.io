let inquirer = require("inquirer");
let twitterKeys = require("./keys.js");
let Twitter = require("twitter");
let spotify = require('spotify');
let request = require("request");

let consumer_key1 = twitterKeys.twitterKeys.consumer_key;
let consumer_secret1 = twitterKeys.twitterKeys.consumer_secret;
let access_token_key1 = twitterKeys.twitterKeys.access_token_key;
let access_token_secret1 = twitterKeys.twitterKeys.access_token_secret;

let client = new Twitter({
  consumer_key: consumer_key1,
  consumer_secret: consumer_secret1,
  access_token_key: access_token_key1,
  access_token_secret: access_token_secret1
});



//Command pbject for all the user functions
let commandObj = {
	//Tweet Function
	tweetFunction: function(){
		var params = {	screen_name: 'ROSGO21',
						count: 20};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			for (let i = 0; i < params.count; i++){
				console.log( tweets[i].created_at, tweets[i].text);
			}
		});

	},
	//Spotify function
	spotifyFunction: function(){
 
		spotify.search({ type: "song", query: "One Love"}, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		 
		    console.log(data);
		});
	},
	//Movie function
	movieFunction: function(){	
		inquirer.prompt([
		    {
		      type: "input",
		      message: "Name a movie on which you would like info: ",
		      name: "movie_name"
		    }
	    ])
	    .then(function(inquirerResponse){
			let title = inquirerResponse.movie_name;

			let queryURL = "http://www.omdbapi.com/?t=" + title + "&y=&plot=full&apikey=40e9cece";
			// Then run a request to the OMDB API with the movie specified
			request(queryURL, function(error, response, body) {

			// If the request is successful (i.e. if the response status code is 200)
			if (!error && response.statusCode === 200) {
				console.log("Title: " + JSON.parse(body).Title);
				console.log("Release Date: " + JSON.parse(body).Released);
				console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
				console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
				console.log("Country: " + JSON.parse(body).Country);
				console.log("Language: " + JSON.parse(body).Language , "\n");
				console.log("Plot: " + JSON.parse(body).Plot , "\n");
				console.log("Actors: " + JSON.parse(body).Actors);
			}
		});
});
		
	},
	//What ever function
	whatEverFunction: function(){
		console.log("What");
	},
	//Function to concatenate string
	argumentCondenser: function(array, start){
	  	let concatenated_string = "";
	  	for (let i = start; i < array.length; i++){
	  		concatenated_string += " " + array[i];
	  	}
  		return concatenated_string.trim();
  	}
}

//Inital user view
let intialQuestion = function(){
	inquirer
	  .prompt([
	    {
	      type: "list",
	      message: "Choose from the following to execute: ",
	      choices: ["my-tweets" , "spotify-this-song", "movie-this", "do-what-it-says"],
	      name: "user_action"
	    }
	   ])
	  .then(function(inquirerResponse){

		switch (inquirerResponse.user_action){
			case `my-tweets`:
				commandObj.tweetFunction();
				break;
			case `spotify-this-song`:
				commandObj.spotifyFunction();
				break;
			case `movie-this`:
				commandObj.movieFunction();
				break;
			case `do-what-it-says`:
				commandObj.whatEverFunction();
				break;
			default:
				console.log("Type in one of the following options: [my-tweets] [spotify-this-song] [movie-this] [do-what-it-says]");
				console.log("Example: node liri.js my-tweets");
		}

	  })
	;
};


intialQuestion();
