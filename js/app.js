// Global scope
const cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt",
 "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
let openCard = [];
let matchedCard = [];
let movements = 0;
let clicks = 0;

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
    	if ($(this).hasClass("open show")) { return; };
    	$(this).toggleClass("open show animated pulse");
    	openCard.push($(this));
    	clicks += 1;
    	moves();
    	startTimer();
    	let first = openCard[0];
    	let second = openCard[1];
    	if (openCard.length === 2 && first.children().hasClass(second.children().attr("class"))) {
    		first.toggleClass("match pulse flash");
    		second.toggleClass("match pulse flash");
    		openCard.pop(second);
    		openCard.pop(first);
    		matchedCard.push(second);
    		matchedCard.push(first);
    		popup();
    	} else if (openCard.length === 2 && !first.children().hasClass(second.children().attr("class"))) {
    		setTimeout(function() {
    			first.toggleClass("open show pulse shake")
    		}, 1000);
    		setTimeout(function() {
    			second.toggleClass("open show pulse shake")
    		}, 1000);
    		setTimeout(function() {
    			first.toggleClass("animated shake")
    		}, 1500);
    		setTimeout(function() {
    			second.toggleClass("animated shake")
    		}, 1500);
    		openCard.pop(second);
        	openCard.pop(first);
    	}
    })
}

// Call first functions
giveCards();
findMatch();
reloadPage();