var game = {

	valueLookUpTable: {
		"A": 1,
		"K": 10,
		"Q": 10,
		"J": 10,
		"T": 10
	},

	getCardValue: function(card){
		if(this.valueLookUpTable[card.face]) {
			return (this.valueLookUpTable[card.face])
		} 
		else return card.face;
	},

	getHandValue: function(person){
		var sum = 0;
			for(var i =0; i < person.hand.length; i++) {
				sum += this.getCardValue(person.hand[i])
			}
		
		if(person.hand.indexOf("A") >= 0 && sum <= 11) {
			sum += 10;
		}
		person.value = sum
	},

	getWinner: function() {
		if (this.player.value > 21) {
			alert("You Busted! Dealer Wins!")
		} else if (this.player.value === this.computer.value) {
			alert("Tie! Dealer Wins!")
		} else if (this.computer.value > 21) {
			alert("Dealer Busts! You Win!")
		} else if (this.player.value > this.computer.value) {
			alert("You Win!")
		} else {
			alert("Dealer Wins!")
		}
			this.player.hand = []
			this.computer.hand = []
			this.getHandValue(this.computer)
			this.getHandValue(this.player)
	},

	// getAceValue: function(){

	// },


	player: {
		hand: [],
		value: 0,
		decide: function() {
			if (this.value > 21){
				alert("Bust!")
			}
		}


	},

	computer: {
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




function Card(suit, face) {
	this.suit = suit,
	this.face = face
}

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

function init(){
	makeCards()
	game.deck.deal(game.player)
	game.deck.deal(game.computer)
}

init()
