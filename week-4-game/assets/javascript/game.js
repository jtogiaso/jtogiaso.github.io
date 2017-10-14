//Declaration of the game object
var game = {
	isFighterChosen: false,
	isOpponentChosen: false,
	fighterID: "",
	opponentID: "",
	fighterBaseAtk: 0,
	isOpponentDefeated: false,
	opponentsDefeated: 0,
	isFighterDefeated: 0,

	statsInitializer: function(charId, atk, catk, hp) {
		$(charId).data("attack", atk)
		.data("counterAttack", catk)
		.data("health", hp);
		$(charId + "HP").text($(charId).data("health"));
	},

	statsDisplay: function() {
		$("#fighterAttack").text("You attacked " + this.opponentID + " with " + $("#" + this.fighterID).data("attack") + " power.");
		$("#counterAttack").text(this.opponentID + " attacked you with " + $("#" + this.opponentID).data("counterAttack") + " power.");
	},

	nextOpponent: function(){
		if (this.opponentsDefeated < 1) {
			$("#instructionCenter").text("Now choose an opponent!");
		}
		else {
			$("#instructionCenter").text("You have defeated " + this.opponentID+ ". Choose your next opponent!");	
		}

	},

	decrementHPandUpAtk: function() {
		//Decrementing Opponent Health and braodcasting
		console.log($("#" + this.opponentID));
		$("#" + this.opponentID).data("health",$("#" + this.opponentID).data("health") - $("#" + this.fighterID).data("attack"));
		$("#" + this.opponentID + "HP").text($("#" + this.opponentID).data("health"));
		if ($("#" + this.opponentID).data("health") <= 0) {
			this.isOpponentDefeated = true;
			this.isOpponentChosen = false;
			$(".chosenOpponent").clone(true, true).attr("class", "deadO fighterCard opponentCard").appendTo($("#defeatedOpponents"));
			$(".chosenOpponent").remove();
			this.opponentsDefeated++;
			this.nextOpponent();
			if (this.opponentsDefeated === 3){
				$("#instructionCenter").text("Congratulations! You have won!!! Click Restart to try again!");
				$("#restartBtn").show();
			}
		}//
		else {
			//Decrementing Fighter Health and broadcasting
			$("#" + this.fighterID).data("health",$("#" + this.fighterID).data("health") - $("#" + this.opponentID).data("counterAttack"));
			$("#" + this.fighterID + "HP").text($("#" + this.fighterID).data("health"));
			if ($("#" + this.fighterID).data("health") <= 0) {
				this.isFighterDefeated = true;
				$("#instructionCenter").text(this.opponentID + " has defeated you... Restart to try again.");
				$("#restartBtn").show();
			}
			
			
			//Increasing Fighter Attack
			$("#" + this.fighterID).data("attack" , $("#" + this.fighterID).data("attack") + this.fighterBaseAtk);
			
			console.log($("#" + this.fighterID).data("attack"));
		}
	}

}

//Procedural Code
$(document).ready(function() {

	// game.stats();
	//Aang Stats
		game.statsInitializer("#Aang", 13, 20 , 130);
	//Kata Stats
		game.statsInitializer("#Katara", 7, 17 , 200);
	//Toph Stats
		game.statsInitializer("#Toph", 12, 45 , 110);
	//Zuko Stats
		game.statsInitializer("#Zuko", 20, 12 , 115);	

	//Hiding Restart Button
	$("#restartBtn").hide();	

	//Choosing player's fighter
	$("div.initialFighter").on("click", function(){
		if (!game.isFighterChosen){
			$(this).attr("class", "chosenFighter fighterCard");
			$("div.initialFighter").clone(true, true).attr("class", "cloneD fighterCard").appendTo($("#slateOfOpponents"));
			game.isFighterChosen = true;
			$("div.initialFighter").remove();
			game.fighterID = $(this).attr("id");
			game.fighterBaseAtk = $(this).data("attack");
			$("#instructionCenter").text("Now choose an opponent!");
		}
	});


	//Choosing player's opponent
	$("div").on("click", ".cloneD" ,function(){
		if (!game.isOpponentChosen){
			$(this).attr("class", "movingUp fighterCard");
			$("div.movingUp").clone(true,true).attr("class", "chosenOpponent fighterCard").appendTo($("#mainOpponent"));
			game.isOpponentChosen = true;
			$("div.movingUp").remove();
			game.opponentID = $(this).attr("id");
			game.isOpponentDefeated = false;
			$("#instructionCenter").text("FIGHT!");
		}
	});

	//Attack Button
	$("#attackButton").on("click" ,function(){
		
		if (!game.isFighterDefeated) {
			if (game.isOpponentChosen) {
				if (!game.isOpponentDefeated){
					game.statsDisplay();
					game.decrementHPandUpAtk();
				}
			}
		}

	});

	$("#restartBtn").on("click" , function(){
		$("#restartBtn").hide();	
		game.isFighterChosen = false;
		game.isFighterDefeated = false;
		game.isOpponentDefeated = false;
		game.isOpponentChosen = false;
		$(".fighterCard").addClass("reClone");
		$(".fighterCard").clone(true,true).attr("class", "initialFighter fighterCard").appendTo("#slateOfFigters");
		$(".reClone").remove();
		game.opponentsDefeated = 0;

	//Aang Stats
		game.statsInitializer("#Aang", 13, 20 , 130);
	//Kata Stats
		game.statsInitializer("#Katara", 7, 17 , 200);
	//Toph Stats
		game.statsInitializer("#Toph", 12, 45 , 110);
	//Zuko Stats
		game.statsInitializer("#Zuko", 20, 12 , 115);
		$("#instructionCenter").text("Choose Your Fighter");
		$("#fighterAttack").text("");
		$("#counterAttack").text("");


	})

});