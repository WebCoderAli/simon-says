let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0 ;

let started = false;

function music(color) {

    switch (color) {
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;

        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;

        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;

        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;

        default:
            console.log("No matching color sound found.");
            break;
    }
}

function nextSequence() {

    level++;

    $("h1").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);

    let randomColorChosen = buttonColors[randomNumber];

    gamePattern.push(randomColorChosen);

    $("#" + randomColorChosen).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    console.log(randomColorChosen);

    music(randomColorChosen);

    userClickedPattern = [];

   
}

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


$(".btn").click(function() {

    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    console.log(userChosenColour);

    music(userChosenColour);

    animate(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function animate(currentButton){
    $("#" + currentButton).addClass("pressed");

    setTimeout(function(){
    
        $("#" + currentButton).removeClass("pressed")
    
    },100);
}



function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
    
            setTimeout(function () {
    
                nextSequence();
    
            }, 1000);

            userClickedPattern = [];
        }
    
    } else {
        gameOver();
        startOver();
    }

}



function gameOver(){
    
    let wrong = new Audio("/sounds/wrong.mp3");
    
    wrong.play();
    
    $("body").addClass("game-over");
    
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over Press any key to Restart Again");
    
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


