/*
 * Create a list that holds all of your cards
 */
 // Global scope
const cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt",
 "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
let openCard = [];
let matchedCard = [];
let movements = 0;
let clicks = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Update stars
function stars() {
	if (movements > 0 && movements < 19) {
    	return;
    } else if (movements >= 19 && movements <= 22) {
    	$(".good i, i.good").removeClass("fa-star");
    } else if (movements > 22) {
    	$(".average i, i.average").removeClass("fa-star");
    }
}

// Update moves
function moves() {
	movements = movements + 1;
	$("span.remove").remove();
	if (movements === 1) {
		$("span.moves").html(movements + " Move");
	} else {
		$("span.moves").html(movements + " Moves");
	};
	stars();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffle and distribute cards on HTML
function giveCards() {
	shuffle(cards).forEach(function createCard(x) {
		$(".deck").append(`<li class="card"><i class="fa ${x}"></i></li>`);
	});
}

// Reload function
function reloadPage() {
	$("div .restart").click(function() {
    	location.reload();
	});
}

// Function that sets timer
function startTimer() {
   	if (clicks === 1) {
       	var sec = 0;
       	function time ( val ) { return val > 9 ? val : "0" + val; }
       	timer = setInterval( function(){
       		$(".seconds").html(time(++sec % 60));
       		$(".minutes").html(time(parseInt(sec / 60, 10)));
      	}, 1000);
   	}
}

// Open pop-up
function popup() {
	if (matchedCard.length === 16) {
		$("div")[3].style.display = "block";
		var record = $("div.timer").text();
		$(".closer span:first").html(record);
	}
}

// Logic to find matching cards
function findMatch() {
    // Show cards on click
    $(".card").on("click", function() {
    	if ($(this).hasClass("open show")) { return; }
    	$(this).toggleClass("open show");
    	openCard.push($(this));
    	clicks += 1;
    	moves();
    	startTimer();
    	let first = openCard[0];
    	let second = openCard[1];
    if (openCard.length === 2 && first.children().hasClass(second.children().attr("class"))) {
    	first.addClass("match");
    	second.addClass("match");
    	openCard.pop(second);
    	openCard.pop(first);
    	matchedCard.push(second);
    	matchedCard.push(first);
    	popup();
    } else if (openCard.length === 2 && !first.children().hasClass(second.children().attr("class"))) {
    	setTimeout(function() {
    		first.toggleClass("open show")
    	}, 1000);
    	setTimeout(function() {
    		second.toggleClass("open show")
    	}, 1000);
    	openCard.pop(second);
    	openCard.pop(first);
    }
    })
}

// Call first functions
giveCards();
findMatch();
reloadPage();

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


 /*
Falta adicionar animações às cartas quando são abertas, combinadas e rejeitadas.
Falta adicionar modal que mostre os resultados: tempo final, número de estrelas e mensagem.
Torná-lo responsivo.
*/