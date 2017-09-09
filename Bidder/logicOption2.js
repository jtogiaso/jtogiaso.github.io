// Initialize Firebase
var config = {
	apiKey: "AIzaSyBcM5iZuUOONtICRxukqKHqAoqFtl-jAh8",
	authDomain: "bayareasports-fb5e3.firebaseapp.com",
	databaseURL: "https://bayareasports-fb5e3.firebaseio.com",
	projectId: "bayareasports-fb5e3",
	storageBucket: "bayareasports-fb5e3.appspot.com",
	messagingSenderId: "481708343153"
};

firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
//var database = ...

var database = firebase.database();


// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

//  At the page load and subsequent value changes, get a snapshot of the local data.
// This function allows you to update your page in real-time when the firebase database changes.




database.ref().on("value", function(snapshot){
// If Firebase has a highPrice and highBidder stored (first case)
	if(snapshot.child("highPrice").exists()){


// Set the local variables for highBidder equal to the stored values in firebase.
// highPrice = ...
// highBidder = ...
		highPrice = snapshot.val().highPrice;
		highBidder = snapshot.val().highBidder;

// change the HTML to reflect the newly updated local values (most recent information from firebase)

		$("#highest-bidder").html(highBidder);
		$("#highest-price").html(highPrice);

// Print the local data to the console.
	console.log("High price: " + highPrice);
	console.log("High bidder: " + highBidder);

	}
	else {
// Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
		database.ref().set({
			highPrice: highPrice,
			highBidder: highBidder
		});

// Change the HTML to reflect the local value in firebase
		highPrice = snapshot.val().highPrice;
		highBidder: snapshot.val().highBidder;
		$("#highest-bidder").html(highBidder);
		$("#highest-price").html(highPrice);


// Print the local data to the console.
	}

}, function(errorObject) {
   console.log("The read failed: " + errorObject.code);
});



// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function() {
// prevent form from submitting with event.preventDefault() or returning false
    event.preventDefault();
    
// Get the input values
		var localBidder = $("#bidder-name").val().trim();
		var localBidderPrice = parseInt($("#bidder-price").val().trim());		

// Log the Bidder and Price (Even if not the highest)
		console.log("Your name: " + localBidder);
		console.log("Your bid: " + localBidderPrice);

// If Then statements to compare against previous high bidder
		if (localBidderPrice > highPrice){

// Alert that they are High Bidder
			alert("You are now the highest bidder!");

// Save the new price in Firebase
			database.ref().set({
				highPrice: localBidderPrice,
				highBidder: localBidder
			})

// Log the new High Price

	
// Store the new high price and bidder name as a local variable (could have also used the firebase variable)


// Change the HTML to reflect the new high price and bidder
			highPrice = localBidderPrice;
			highBidder= localBidder;
			$("#highest-bidder").html(highBidder);
			$("#highest-price").html(highPrice);
		}
		else {
// Else tell user their bid was too low via alert
			alert("Your bid is too low!");
		}
});