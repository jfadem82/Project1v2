//OBJECTS AND SHIT.
var game = {

	valueLookUpTable: {
		"A": 1,
		"K": 10,
		"Q": 10,
		"J": 10,
		"T": 10
	},
	//This function returns the value of each individual card that is dealt in the game. It checks for the 
	//presence of Aces, Kings, Queens, Jacks or Tens. If none are found, it returns the numeric value of the 
	//individual card it is checking. 
	getCardValue: function(card){
		if(this.valueLookUpTable[card.face]) {
			return (this.valueLookUpTable[card.face])
		} 
		else return card.face;
	},
	/*This function is dual purpose. It sums the values of the individual cards dealt to assign a total value
	to the player/computer's respective hands, and also determines whether the Ace card will have the value of 
	one or eleven depending on the value of the hand*/
	getHandValue: function(person){
		var sum = 0;
			for(var i =0; i < person.hand.length; i++) {
				sum += this.getCardValue(person.hand[i])
			}
		
		if(person.hand.valueOf("A") != -1 && sum <= 11) {
			sum += 10;
		}
		person.value = sum
	},
	/*This function determines the winner of the game. It does so by iterating through all possible outcomes
	in order of importance via the "if" statements. It also clears the player and computer "hand" arrays, and
	runs the "getValue" functions on both the player & computer*/
	getWinner: function() {
		if (this.player.value > 21) {
			alert("You Busted, Buster!")
		} else if (this.player.value === this.computer.value) {
			alert("Tie! Dealer Wins!")
		} else if (this.computer.value > 21) {
			alert("Dealer Busts! You Win!")
		} else if (this.player.value > this.computer.value) {
			alert("You Win! Play Again!")
		} else {
			alert("Dealer Wins! Play Again!")
		}
			this.player.hand = []
			this.computer.hand = []
			this.getHandValue(this.computer)
			this.getHandValue(this.player)
	},
	/*The player object contains the getImages function, which fetches the card images from the server and 
	places them into the player's imagesArray. */
	player: {
		getImages: function() {
			var imagesArray = []
			for(var i = 0; i < this.hand.length; i++) {
				imagesArray.push(this.hand[i].getImage())
			}
			return imagesArray
		},
		hand: [],
		value: 0,
	},
	/*The computer object has the same getImages function as the player object, however it assigns the card
	images to the dealer's imagesArray. Additionally, the computer object contains a decide 
	function that makes the computer hit by default if the value of it's hand array is less than or equal 
	to 15. If the computer's hand is over 15, it holds by default.*/
	computer: {
		getImages: function() {
			var imagesArray = []
			for(var i = 0; i < this.hand.length; i++) {
				imagesArray.push(this.hand[i].getImage())
			}
			return imagesArray
		},
		hand: [],
		value: 0,
		decide: function(){
			while (this.value<=15){
				console.log("running decide")
				game.deck.hit(this)
				game.getHandValue(this)

			}
			if (this.value > 21){
				console.log("Bust!")
			}else {
				console.log("Holding!")
			}

		}
	},
	/*The deal function within the deck object runs the hit function twice for both the computer and the player
	and gets the value of their respective hands. the hit funciton picks a random card, and push's it into 
	either the player or computer's cards array*/
	deck: {
		cards: [],

		deal: function(person) {
			this.hit(person);
			this.hit(person);
			game.getHandValue(person);
		},

		hit: function(person){
			var card = Math.floor((Math.random() * this.cards.length));
			person.hand.push(this.cards.splice(card, 1)[0]);
			game.getHandValue(person)
		}
		
	}
}
//FUNCTIONS AND SHIT.

/*This constructor function allows us to separate the face and suit of each card, and helps set us up to return
the card images from the server.*/ 

function Card(suit, face) {
	this.suit = suit,
	this.face = face
}
//This function helps us retrieve images from the server for the dealer/computer.
Card.prototype.getImage = function () {
	var card = this.face + this.suit
	return "<img src='http://blackjack.wojtekmurawski.me/img/" + card + ".jpg'>" ;
}
//This function helps us retrieve images from the server for the player.
Card.prototype.getCompImage = function () {
	var card = "XX"
	return "<img src='http://blackjack.wojtekmurawski.me/img/" + card + ".jpg'>" ;
}
/*This function populates the cards array contained inside of the deck object. Both the "suits" and "faces"
variables are arrays, so two "for" loops are initiated: one to assign suits, and one to assign faces to the 
cards. All results are then pushed into the cards object. There are four suits, and 13 faces, so 52 cars are
pushed into the array.*/
function makeCards(){
	var suits = ["d", "c", "h", "s"]
	var faces = ["A", "K", "Q", "J", "T", 9, 8, 7, 6, 5, 4, 3, 2, ]
	for(var i = 0; i < suits.length; i++){
		for(var j = 0; j < faces.length; j++){
			card = new Card(suits[i], faces[j])
			game.deck.cards.push(card)
		}
	}
}
/*This function populates the deck, and then deals the first two cards to both the player and computer. 
This happens when the "deal" button is pressed.*/
function init(){
	makeCards()
	game.deck.deal(game.player)
	game.deck.deal(game.computer)
}
//JQUERY AND SHIT. 

$("#noise").on("click", function() {
	if (clip.get(0).mute = true) {
		return playClip ()
	} else if (clip.get(0).play = true) {
		return muteClip ()
	}
})
/*This Jquery function runs when the Deal button is clicked. It runs the init function described above, as well
as actually displays the computer/player's card images on the game screen. Additionally, it places the computer's
first card image face down at the beginning of the game.*/
$("#deal").on("click", function() {
	init();
	game.computer.decide();
	var playerCards = game.player.getImages()
	var playerHtmlString = ""
	for(var i = 0; i < playerCards.length; i++){
		playerHtmlString += playerCards[i]
	}
	$("#playerHand").html(playerHtmlString)
	var computerStartImage = game.computer.hand[0].getCompImage()
	var computerHtmlString = game.computer.hand[1].getImage()
	$("#dealerHand").html(computerStartImage + computerHtmlString)
})/*This Jquery function runs when the Hit Me button is clicked. It pushes an additional card into the player's
hand, and displays this additional card on the screen.*/
$("#hitMe").on("click", function() {
	game.deck.hit(game.player)
	// game.didIBust(game.player)
	var playerCards = game.player.getImages()
	var playerHtmlString = ""
	for(var i = 0; i < playerCards.length; i++){
		playerHtmlString += playerCards[i]
	}
	$("#playerHand").html(playerHtmlString)
})
/*This Jquery function runs when the Hold button is clicked. It displays the rest of the computer/dealer's hand
and runs the getWinner function, described above.*/
$("#hold").on("click", function() {
	var computerCards = game.computer.getImages()
	var computerHtmlString = ""
	for(var i = 0; i < computerCards.length; i++){
		computerHtmlString += computerCards[i]
	}
	$("#dealerHand").html(computerHtmlString)
	game.getWinner()
})

var clip = $( "#clip" )
clip.get(0).loop = true
// clip.get(0).muted = true

function playClip () { 
   clip.get(0).play() 
}
function muteClip () {
clip.get(0).mute
}
Status API Training Shop Blog About Pricing
