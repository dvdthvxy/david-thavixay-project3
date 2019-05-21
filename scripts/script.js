let runCounter = undefined; //var keeps track of user's unput
let countdown = undefined; //var represents the countdown number


//event listener for when the user presses a key
function running() {
    let animationCount = 0; //var keeps track of the character's animation frame
    let keyPressed = undefined; //var keeps track of the user's last key press

    //checks if the user is on a mobile device, enables user to tap on the character. IF statement from stackoverflow.
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.runner').on('click', function () {
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

            $('main').css('background-position-x', `${runCounter * -50}px`); //move the background 
        });
    }
    else {
        //event listener for key press created for desktop/laptop users
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
    //if the countdown is 0, display GO instead of 0
    if (countdown === 0) {
        $('.countdown').text('GO')
        $('.countdown').addClass('font-expand');

    }
    //display the number of countdown and then decrease it
    else {
        $('.countdown').text(countdown);
        $('.countdown').addClass('font-expand');
        countdown--;
    }
}

//function plays the audio
function playSound() {
    const audio = document.querySelector('audio'); //get the audio source
    audio.play(); //play audio
}

//function resets the styles and counters
function resetGame() {
    $('button').toggleClass('visibility');
    $('.timer').toggleClass('visibility');
    $('.runner').css('visibility', 'hidden');
    $('.countdown').toggleClass('visibility');
    $('.your-time').css('display', 'none');
    runCounter = 0;
    countdown = 3;
}

//function turns on game's active styles
function gameStyles() {
    $('.countdown').toggleClass('visibility');
    $('.timer').css('font-size', '3rem');
    $('.runner').css('visibility', 'visible');
    $('.timer').toggleClass('visibility');
}

//function turns on end of game styles
function endGame() {
    $(window).off('keydown'); //turn off keydown event listener
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.runner').off('click');
    }
    $('button').toggleClass('visibility');
    $('button').text('Retry');
    $('img').attr('src', `assets/images/Dead__009.png`);
    $('.your-time').css('display', 'block');

}

//function starts the game
function startGame() {
    playSound(); //play the countdown music
    resetGame() //reset the styles and counters
    readySetGo(); //start intial countdown
    let beginCountdown = setInterval(readySetGo, 1001); //run countdown again for every second

    //delay start of game by 3.5secs
    setTimeout(function () {
        gameStyles(); //turn on game active styles
        stop(beginCountdown); //stop countdown
        running(); //turn on keydown event listener
        let timer = stopWatch(); //create timer

        //function continously checks runCounter every 10th of a second
        let watcher = setInterval(function () {
            //end game when runCounter is 100
            if (runCounter === 100) {
                stop(timer);
                endGame();
                stop(watcher);
            }
        }, 10);
    }, 3500);
}

//document ready
$(function () {

    //listens for when .countdown gets transitioned
    document.getElementById("countdown").addEventListener("transitionend", removeTransition);

    //listens for when user clicks on the overlay
    $('.title-screen').on('click', function () {
        $('.wrapper').toggleClass('visibility');
        $('.title-screen').css('display', 'none');
    });

    //start game when button clicked
    $('button').on('click', function () {
        startGame();
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.timer').text('Tap on your character to run. Make him run 100m as fast as you can!');
    }
});