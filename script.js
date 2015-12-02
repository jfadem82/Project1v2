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
	getHandValue: function(hand){
		var sum = 0;
			for(var i =0; i < hand.length; i++) {
				sum += this.getCardValue(hand[i])
			}
		return sum;
	},

	// getAceValue: function(){

	// },


	player: {
		hand: [],
		value: 0,
		// calcValue: function() {
		// 	for (i = 0; i < hand.length; i++){
		// 		var cardValue = getHandValue
		// 	}

		// }

	},

	computer: {
		hand: []
		// value: 0,
		// calcValue: function() {


		// }
	},

	deck: {
		cards: [],

		deal: function(person) {
			this.hit(person);
			this.hit(person);
		},

		hit: function(person){
			var card = Math.floor((Math.random() * this.cards.length));
			person.hand.push(this.cards.splice(card, 1)[0]);
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