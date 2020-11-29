var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0
var started = false;


// if any key is pressed and game has not started, start the game by calling nextsequence()
$(document).keypress(function(){
    if (!started ){
        $("#my-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});

// set the button press animation and save the pattern clicked by user
$(".btn").on("click", function (){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
});

function nextSequence(){
    // evertime when we show a new flash to user, set user patterns to empty array
    // this also makes sure that any unwanted buttons pressed are set to null before the game restarts
    userClickedPattern = []    
    level ++;   // update level after every right choice
    $("#my-title").text("Level " + level);   

    // generating random number to select which color goes next
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);  // push next color in game pattern 
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);   // flash the new color on screen for player
    playSound(randomChosenColor)   // play sound while flashing
}

// this function checks if the output pattern entered by user at every instance is true or not by matching with game pattern
// if player matched the game pattern we call the nextSequence again with a delay of 100ms else, the game ends and we start over by resetting everything
// Display message for the player!

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        if (userClickedPattern.length === gamePattern.length ){
            setTimeout(function(){
                nextSequence();
            }, 1000); // delay
        }
        }
        
    else{
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over! Press Any Key to Restart");
        startOver();
    } 
}


function startOver(){
    level = 0;
    started = false;
    gamePattern = []
}


function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play()
}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    }, 100);
}

