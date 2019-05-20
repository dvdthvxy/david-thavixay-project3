let runCounter = undefined; //var keeps track of user's unput
let countdown = undefined; //var represents the countdown number


//event listener for when the user presses a key
function running() {
    let animationCount = 0; //var keeps track of the character's animation frame
    let keyPressed = undefined; //var keeps track of the user's last key press

    //event listener for key press created
    $(window).keydown(function (e) {

        //checks the user's key press - the key press cannot be the last user's last key pressed and it has to be either the left or right arrow key
        if (e.keyCode !== keyPressed && (e.keyCode == 37 || e.keyCode == 39)) {
            runCounter++; //increase run counter by 1

            //checks what frame the character animation is at
            //if the character animation reaches it's 9th frame, the counter resets back to 0 and the animation begins again
            if (animationCount > 9) {
                animationCount = 0; //reset animation counter to 0
                $('img').attr('src', `assets/images/Run__00${animationCount}.png`); //change the character animation
                animationCount++; //increase animation counter by 1
            }

            //show the next frame of the character animation and increase the animation counter by 1
            else {
                $('img').attr('src', `assets/images/Run__00${animationCount}.png`);
                animationCount++;
            }
        }

        $('main').css('background-position-x', `${runCounter * -50}px`); //move the background 
        keyPressed = e.keyCode //record the key press
    });
}

//function to create the timer
function stopWatch() {
    const startTime = new Date; //var represents the timestamp of when the game started

    //creates a loop
    return setInterval(function () {
        //formula calculates the timer
        //(time of when new Date created - game start time) / 1000
        //we divied by 1000 to return the time in seconds and then provide the next 3 decimal places with toFixed
        //the result is then shown on the screen.
        $('.timer').text(((new Date - startTime) / 1000).toFixed(3) + "s");
    });
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