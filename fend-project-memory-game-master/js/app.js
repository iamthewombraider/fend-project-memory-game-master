// object which contains class names for cards and icons.
const items = {
//cards is in the items object. cards contains an array of objects
cards: [
	{
	name: 'bomb',
	icon: 'fa fa-bomb',
	class: 'card'
	},
	
	{
	name: 'bomb',
	icon: 'fa fa-bomb',
	class: 'card'
	},

	{
	name: 'bicycle',
	icon: 'fa fa-bicycle',
	class: 'card'
	},

	{
	name: 'bicycle',
	icon: 'fa fa-bicycle',
	class: 'card'
	},

	{
	name: 'bolt',
	icon: 'fa fa-bolt',
	class: 'card'
	},

	{
	name: 'bolt',
	icon: 'fa fa-bolt',
	class: 'card'
	},

	{
	name: 'diamond',
	icon: 'fa fa-diamond',
	class: 'card'
	},

	{
	name: 'diamond',
	icon: 'fa fa-diamond',
	class: 'card'
	},

	{
	name: 'anchor',
	icon: 'fa fa-anchor',
	class: 'card'
	},

	{
	name: 'anchor',
	icon: 'fa fa-anchor',
	class: 'card'
	},

	{
	name: 'cube',
	icon: 'fa fa-cube',
	class: 'card'
	},

	{
	name: 'cube',
	icon: 'fa fa-cube',
	class: 'card'
	},

	{
	name: 'plane',
	icon: 'fa fa-paper-plane-o',
	class: 'card'
	},

	{
	name: 'plane',
	icon: 'fa fa-paper-plane-o',
	class: 'card'
	},

	{
	name: 'leaf',
	icon: 'fa fa-leaf',
	class: 'card'
	},

	{
	name: 'leaf',
	icon: 'fa fa-leaf',
	class: 'card'
	}
	]
};
//variable declarations and assignments so they can be accessed within functions
// tempArray is where cards that are clicked, flipped over, and need to be compared are sent to
let tempArray = [];
let deck= [];
let shuffledCards = [];
//matched is where cards that are matched are sent so the match class can be applied to the matched cards
let matched = [];
//count and counter are to keep track of how many moves the player has made. for every clicked card, count increases by 1
let count = 0;
//when count is divisible by 2, counter will increase by 1 and will update the move counter
let counter = 0;
let span = document.querySelector('span');
span.innerHTML = 0;
const stars = document.getElementsByClassName(' fa fa-star');
var time = 0;
const sun = document.getElementsByClassName('stars')[0];
let clock = document.getElementsByTagName('time')[0];
let seconds = 0;
let mins = 0;


//initiats start function
start();
function start() {
	//need explanation as to why you need to have the [0] after ('deck');
	//deck holds all the li card elements 
	deck = document.getElementsByClassName('deck')[0];
	//removes all the inner html elements so we can add a shuffled list of elements so the cards are in random order each time the game runs
	deck.innerHTML = '';
	//uses shuffle function to take the cards array and shuffle all of the objects within the cards array
	shuffledCards = shuffle(items.cards);
	addElem();
}
// creates new li card elements to insert back into the decks innerHTML
function addElem (){
	//for of loop, loops over for each object within the cards array(16). each loop through creates an li and i element, assigns their classes, and appends them to each other.
	for (shuffledCard of shuffledCards) {
		let liElem = document.createElement('li');
		let iElem = document.createElement('i');
		// li element is created and classes are added. 
		liElem.classList.add(shuffledCard.class, shuffledCard.name);
		iElem.className = shuffledCard.icon;
		// takes i elemnt and appends to li element. li element is appended to deck.
		liElem.appendChild(iElem);
		deck.appendChild(liElem);
		// assigns an event listener to each li element created in the loop. 
		liElem.addEventListener('click', function(){
			//when one of the li elements is clicked, its class list is updated to have open and show in order to display the icon of the card the player clicked
			this.classList.add('open', 'show');
			//also when clicked, the li element and its classes are pushed into the tempArray in order to compare the next card selected
			tempArray.push(this);
			//move counter
			count +=1;
			if (count % 2 === 0) {
				counter += 1;
				//the inner html for the move element is updated 
				span.innerHTML = counter;
				}
			//next step is to compare length of tempArray
			//if the length of temp is === 2 compare the 2 cards to see if they match
			// assignes the inner html in the 2 items in the tempArray to variables to make easier to compare
			let card1 = tempArray[0].innerHTML;
			let card2 = tempArray[1].innerHTML;
			//if the number of items or cards is 2, they will be compared to see if they have the same icon
			if (tempArray.length === 2) {
				//if the icons match, the li elements will be sent to a matched array
				if (card1 == card2) {
					matched.push(tempArray [0])
					matched.push(tempArray [1])
					//for every matched card in the match array, the loop will add the match class and remove open and show classes
					for( match of matched) {
					match.classList.add('match');
					match.classList.remove('open', 'show');
				}
				//clears tempArray so we can repeat procces above to try to find the next match
					tempArray=[];
				// checks to see how many elements have been pushed to the matched array, if there are more than 15, then that means all of the cards have been matched
				if (matched.length > 15){
					//once matched, there is a timeout function to delay the alert
					setTimeout(function(){
						//alert lets player know that the game has been finished
					alert('Congratulations!! you have matched all cards!!!!');
					//restart function initiated because the game has finished and resets the board
					restart();	
					}, 1000);
					}
					//if a card is clicked and the next card clicked is not the same, open and show classes are removed from both cards to flip them back down
				} else { setTimeout( function () {
						tempArray[0].classList.remove('open', 'show');
						tempArray[1].classList.remove('open' , 'show');
						tempArray=[];
						}, 700);}
			}
			//initiates score function
			score();
		})
	}
}
//restarts game either when game is finished or when refresh button is pressed
function restart() {
	start();
	span.innerHTML = 0;
	count = 0;
	counter = 0;
	matched = [];
	//sets star count back to 3
	sun.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>"
	seconds = 0;
	mins = 0;
	tempArray = [];
}

//adds listener event to refresh button and resets game 
let refresh = document.getElementsByClassName('fa fa-repeat')[0];
refresh.addEventListener('click', function(){
	start();
	span.innerHTML = 0;
	count = 0;
	counter = 0;
	matched = [];
	sun.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>"
	seconds = 0;
	mins = 0;
	tempArray = [];
})
//counts the number of moves the player makes and based on the amount of moves, reduces star count
function score () {
	if (counter > 7 && counter < 12) {
		sun.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
	}
	else if (counter > 7 && counter > 12) {
		sun.innerHTML = "<li><i class='fa fa-star'></i></li>";
	}
}
//use sent interval to update timer. every second the seconds variable adds 1, when it hits 60, it adds 1 to minutes and resets seconds to 0
	setInterval(tick, 1000);
	function tick() {
		seconds++;
		if(seconds >= 60){
			seconds = 0;
			mins++;
		}
		if (seconds < 10) {
			seconds = '0'+ seconds;
		}
		clock.innerHTML = mins + ':' + seconds;
	}



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
