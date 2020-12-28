// PopUp Message When User Refreshes Site
swal("Welcome To The Simon Game!", "To Start All You Need To Do is Press a Key 😄")

// Declaring Array of Colors
var buttonColors = ["red", "blue", "green", "yellow"];

// Declaring Game Pattern Array
var gamePattern = [];
var userClickedPattern = [];

// Variables to initialize the games starting point
var started = false;
var level = 0;

/******* EVENT LISTENER FUNCTIONS *******/

// KeyPress Event Listener That States Level

$(document).keypress(function (){
    if(!started)
    {
        $("#level-title").text("level" + level);
        nextSequence();
        started = true;
    }
});

// Listens For Button Click To Play a Specific Sound

$(".btn").click(function(){
    var chosenColor = $(this).attr("id");
    userClickedPattern.push(chosenColor);

    playSound(chosenColor);
    animatePress(chosenColor);

    checkAnswer(userClickedPattern.length-1);
});

/********* HELPER FUNCTIONS *********/

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function()  {
                nextSequence();
            }, 1000);
        }
    }

    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function()  {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence()
{
    userClickedPattern = [];
    level++;

    // Updating the level counter
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4)    // Range of 1-4
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");

    setTimeout(function()  {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver()
{
    // Initializes values to default

    level = 0;
    gamePattern = [];
    started = false;
}