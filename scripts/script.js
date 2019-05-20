let runCounter = undefined; //var keeps track of user's unput
let countdown = undefined; //var represents the countdown number


//event listener for when the user presses a key
function running() {
    
}

//function to create the timer
function stopWatch() {

}

//function to stop the intervals
function stop(functionToBeStopped) {
    clearInterval(functionToBeStopped);
}

//function to remove the transition of the countdown
function removeTransition(e) {
    if (e.propertyName !== 'font-size') return; //checks if the transition involved the font size
    this.classList.remove('font-expand'); //removes the font-expand class
}

//function checks the countdown timer
function readySetGo() {

}

//function plays the audio
function playSound() {

}

//function resets the styles and counters
function resetGame() {

}

//function turns on game's active styles
function gameStyles() {

}

//function turns on end of game styles
function endGame() {

}

//function starts the game
function startGame() {

}

//document ready
$(function () {

    //listens for when .countdown gets transitioned
    document.getElementById("countdown").addEventListener("transitionend", removeTransition);

    //listens for when user clicks on the overlay
    $('.title-screen').on('click', function () {

    });

    //start game when button clicked
    $('button').on('click', function () {

    });
});