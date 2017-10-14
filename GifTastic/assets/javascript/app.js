//Topics for pre-made buttons
var topics = [
	"San Francisco 49ers",
	"Golden State Warriors",
	"San Jose Sharks",
	"San Francisco Giants",
	"Los Angeles Lakers",
	"Las Vegas Raiders",
	"Oakland Athletics",
	"Kansas City Cheifs",
	"Avatar The Last Airbender",
	"The Legend of Korra",
	"Naruto: Shippuden",
	"God of War",
	"Kratos"
	];

//Put query url together
var toQueryString = function() {
    var parametersString = '';
    for (var i in searchString) {
      parametersString += '&' + i + '=' + searchString[i];
    }
    return queryString + '?' + parametersString.trim('&');
}

//Constant String for URL
var queryString = "https://api.giphy.com/v1/gifs/search";

//Object for string parameters
var searchString = {
	api_key: "5d8a8510f5534d128ca41a306b65392d",
	q: "",
	limit: 10,
	rating: "r"
};

//Giphy API call
var gifRetrieval = function() {
	$.get(toQueryString())
		.done( function(data) {
			//Call Gif display for each gif returned in API query
			for (var i = 0; i < searchString.limit; i++) {
				displayGif(data.data[i].images.fixed_height_small.url,
							data.data[i].images.fixed_height_small_still.url,
							data.data[i].rating);
			}
		});
};

//Create and show new button
var buttonMaker = function(q_string) {
	$("<button>")
		//Using attr only because I think the data being "hidden" makes it difficult to call an element by a hidden data attribute value
		.attr("id" , q_string)
		.html(q_string)
		.on("click" , function(){
			$(".gifColumn").empty();
			searchString.q = $(this).attr("id");
			gifRetrieval();
		})
		.appendTo(".buttonsRow")
	;
};

//Show gif on screen
var displayGif = function(alt , src , rating){
	$("<div>")
		.append(
			$("<div>")
				.html("Rating: " + rating)
		)
		.append(	
			$("<img>")
				.attr("src", src)
				.data("alt", alt)
				.on("click" , function(){
					var altSrc = $(this).attr("src");
		   			$(this)
		      			.attr("src",$(this).data("alt"))
		      			.data("alt" , altSrc);
				}))
		.addClass("oneThird")
		.appendTo(".gifColumn")
	;
};

$(document).ready(function(){
	//Create buttons from Topics array and append to page
	for (var i in topics) {
		buttonMaker(topics[i]);
	}

	//On button click, add button to row of buttons
	$("#newBtn").on("click" , function(){
		var q_string = $("#q_string").val().trim();
		//check if button already exists
		if (!$("#" + q_string ).length){
			buttonMaker(q_string);
		}
		else {
			alert("That button already exists!")
		}
	});
});