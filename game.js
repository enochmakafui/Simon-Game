/// colours user clicked
var userClickedPattern = [];
// starting the game
var startGame = false;

var level = 0;

// game pattern colours chosen by user
var gamePattern = []
// button colours in game
var buttonColours = ["red","blue","green","yellow"];
// random number generator function

function nextSequence(){
    startGame = true;
    level++;

    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log(gamePattern);

    // adding sound to the selected button
    playSound(randomChosenColour);
    // adding animation to the selected button
    var currentButton = $("#"+randomChosenColour);
    currentButton.fadeOut(100).fadeIn(100);
    console.log(gamePattern);

   
   
}



 // detecting which function was clicked

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});






// play sound function
function playSound(name){
    switch(name){
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        default:
            alert("Colour does not exist");
    }

}


// animating user button clicks
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed")
    },100);
}

$(document).on("keypress",function(){
    if(startGame !== true){
    nextSequence();}
}
)

// checking user click pattern for correct answer
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
            userClickedPattern = [];
        }
    }
    else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over,Press Any Key to Restart");
        startOver();
    }
}
// the restart game function
function startOver(){
    userClickedPattern=[];
    startGame=false;
    level = 0;
    gamePattern=[];
}