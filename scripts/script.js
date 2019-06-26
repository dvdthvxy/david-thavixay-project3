let runCounter = undefined; //var keeps track of user's unput
let countdown = undefined; //var represents the countdown number
let finalTime = undefined;


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANq1B-nx6WnigunSw2zSabHm_4cab_DEY",
    authDomain: "running-game-6160a.firebaseapp.com",
    databaseURL: "https://running-game-6160a.firebaseio.com",
    projectId: "running-game-6160a",
    storageBucket: "",
    messagingSenderId: "768778734360",
    appId: "1:768778734360:web:0bfe360dd3119a1b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref('users')
dbRef.orderByValue().on("value", function (response) {
    $('.scores').empty()

    let leaderboardLimit = 0
    response.forEach( data => {
        leaderboardLimit++
        if (leaderboardLimit > 5) {
            return
        } else {
            $('.scores').append(`<div>${data.key} : ${data.val()}</div>`)
        }
    });
});


//event listener for when the user presses a key
function running() {
    let animationCount = 0; //var keeps track of the character's animation frame
    let keyPressed = undefined; //var keeps track of the user's last key press
    $('.runner').css('background-image', `url("assets/images/Running-boy.png")`);

    //checks if the user is on a mobile device, enables user to tap on the character. IF statement from stackoverflow.
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.runner').on('click', function () {
            runCounter++; //increase run counter by 1

            //checks what frame the character animation is at
            //if the character animation reaches it's 15th frame, the counter resets back to 0 and the animation begins again
            if (animationCount < -3850) {
                animationCount = 0; //reset animation counter to 0
                $('.runner').css('background-position-y', animationCount);
                animationCount -= 275; //increase animation frame by 1
            }

            //show the next frame of the character animation and increase the animation frame by 1
            else {
                $('.runner').css('background-position-y', animationCount);
                animationCount -= 275;
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
                //if the character animation reaches it's 15th frame, the counter resets back to 0 and the animation begins again
                if (animationCount < -3850) {
                    animationCount = 0; //reset animation counter to 0
                    $('.runner').css('background-position-y', animationCount);
                    animationCount -= 275; //increase animation frame by 1
                }

                //show the next frame of the character animation and increase the animation frame by 1
                else {
                    $('.runner').css('background-position-y', animationCount);
                    animationCount -= 275;
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
    $('.startButton').toggleClass('visibility');
    $('.timer').toggleClass('visibility');
    $('.runner').css('visibility', 'hidden');
    $('.countdown').toggleClass('visibility');
    $('.your-time').css('display', 'none');
    $('.submitTime').css('display', 'none');
    $('.runner').css('width', `250px`)
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
    $('.startButton').toggleClass('visibility');
    $('.startButton').text('Retry');
    $('.runner').css('background-image', `url("assets/images/Dead (14).png")`);
    $('.runner').css('width', `300px`);
    $('.runner').css('background-position-y', `0`);
    $('.your-time').css('display', 'block');
    $('.submitTime').css('display', 'block');
    finalTime = parseFloat($('.timer').text().replace('s', ''))
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
            if (runCounter >= 100) {
                stop(timer);
                endGame();
                stop(watcher);
            }
        });
    }, 3500);
}

function submitTime() {
    
    if (/^\s*$/.test($('.username').val()) === false) {
        swal("Your score has been submitted!")
        $('.submitTime').css('display', 'none');
        const dbRef = firebase.database().ref('users');
        dbRef.update({
            // [$('.username').val()]: parseFloat($('.timer').text().replace('s', ''))
            [$('.username').val()]: finalTime
        })
    } else {
        swal("You need to enter your name.")
    }
}

//document ready
$(function () {

    //listens for when .countdown gets transitioned
    document.getElementById("countdown").addEventListener("transitionend", removeTransition);

    //listens for when user clicks on the overlay
    $('.title-screen').on('click', function () {
        $('.wrapper').toggleClass('visibility');
        $('.title-screen').css('display', 'none');
        $('.leaderboard').css('display', 'block');
    });

    //start game when .startButton clicked
    $('.startButton').on('click', function () {
        startGame();
    });

    $('.submitButton').on('click', function() {
        submitTime();
    })

    //adjust text when user is on mobile
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.timer').text(`You're running late for class! Tap on your character to run. Make him run as fast as you can!`);
    }
});
