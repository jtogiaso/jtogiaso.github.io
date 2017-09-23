// Initialize Firebase
var config = {
apiKey: "AIzaSyCLCXax7gXjRbwjFZwdMRdc1wIMYnhUTKg",
authDomain: "rock-paper-scissors-9bed3.firebaseapp.com",
databaseURL: "https://rock-paper-scissors-9bed3.firebaseio.com",
projectId: "rock-paper-scissors-9bed3",
storageBucket: "",
messagingSenderId: "870793654399"
};
firebase.initializeApp(config);

var database = firebase.database();

var playerName = "";
var numberOfPlayers = 0;
var isThisPlayerReady = false;
var thisPushKey = "";
var iAmPlayer = 0;
var isThereAPlayer1 = false;
var isThereAPlayer2 = false;
var submitChatCheck = false;
var elementChosen = false;

$(document).ready(function(){

	//Creating sessions ID with push key to firebase
	var thePush = database.ref("/browserSessions").push();
	thisPushKey = thePush.key;
	thePush.update({
		sessionID: thisPushKey
	});
	sessionStorage.setItem("sessionID" , thisPushKey);

	database.ref().on("value", function(snapshot){
		numberOfPlayers = parseInt(snapshot.val().numOfPlayers);
	});
	database.ref("/browserSessions").on("value", function(snapshot){
		snapshot.forEach(function(childSnapshot){
			var playerNumber = parseInt(childSnapshot.val().player);
			if (!isThereAPlayer1){
				if (childSnapshot.hasChild("player") && playerNumber === 1) {
					isThereAPlayer1 = true;
					$("#player1Name").html(childSnapshot.val().player_Name);
				}
			}
			if (!isThereAPlayer2) {
				if (childSnapshot.hasChild("player") && playerNumber === 2) {
					isThereAPlayer2 = true;
					$("#player2Name").html(childSnapshot.val().player_Name);
				}
			}
		})
	});

    $("#playerNameSubmit").on("click", function(){
    	if(!isThisPlayerReady && numberOfPlayers < 3){
    		isThisPlayerReady = true;
	    	playerName = $("#playerNameInput").val().trim();
	    	database.ref().once("value", function(snapshot){
	    		numberOfPlayers++;
	    		database.ref().update({
	    			numOfPlayers: numberOfPlayers
	    		});
	    	});
	    	database.ref("/browserSessions").child(thisPushKey).update({
	    		player_Name: playerName,
	    		wins: 0,
	    		losses: 0,
	    		player: numberOfPlayers
	    	});
	    	iAmPlayer = numberOfPlayers;
    	}

    });

	
	//Player 1 Box
	$("#elementOptions1 div img.picOption").on("click" , function() {
		if(isThereAPlayer2 && iAmPlayer == 1){
			if (!elementChosen){
				elementChosen = true;
				$("#chosenElement1 div img ")
					.attr("src" , $(this).attr("src"));
			}
		}
	});

	//Player 2 Box
	$("#elementOptions2 div img.picOption").on("click" , function() {
		if(isThereAPlayer2 && iAmPlayer == 2){
			if (!elementChosen){
				elementChosen = true;
				$("#chosenElement2 div img ")
					.attr("src" , $(this).attr("src"));
			}
		}
	});
	
	//Chat Box, submitting chat
	$("#chat-submit").on("click" , function(){
		if(isThisPlayerReady){
			//Getting the player sending the message
			sessionStorage.getItem("player")
			//If there is anything at al in the chat box when submitting
			if ($("#chat-input").val().trim()){
				database.ref("/comments").push({
					comment: $("#chat-input").val().trim(),
					commenter: playerName,
					dateAdded: firebase.database.ServerValue.TIMESTAMP
				});
				$("#chat-input")
					.val("");
			};
		}
	});
	

	//Publish newest comment
	database.ref("comments")
		.orderByChild("dateAdded")
		.limitToLast(1)
		.on("child_added", function(snapshot){
			chatSubmittedAlready = true;
			$("<div>")
				.html(snapshot.val().commenter + ": " + snapshot.val().comment)
				.prependTo("#chatBox")
			;

			//Delete all comments from firebase after most recent has been published
			database.ref().update({
				comments: ""
			});
		});


});

//When window closes, change number of windows by -1, and removes session from firebase
$(window).on("beforeunload" , function(){
	if (isThisPlayerReady) {
		numberOfPlayers--;
	    database.ref().update({
	    	numOfPlayers: numberOfPlayers
	    })
	}
    database.ref("/browserSessions").child(thisPushKey).remove();

});
