let buttonColours = ["red", "blue", "green", "yellow"];

let userClickedPattern = [];
let gamePattern = [];

let level = 0;
let randomColour = 0;


function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = []; 
   let randomNumber = Math.floor(Math.random() * 4);
   randomColour = buttonColours[randomNumber];
   gamePattern.push(randomColour);
   $("#"+randomColour).fadeOut(100).fadeIn(100);
    playSound(randomColour);
    
}



function checkAnswer(currentUserClick) {
    if (userClickedPattern[currentUserClick] != gamePattern[currentUserClick]){
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key To Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 300);
        startOver();
        
    } else {
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(nextSequence,1000);
        }
        
       

    } 

    console.log(userClickedPattern);
    console.log(gamePattern);
}

function startOver() {
    count = 0;
    gamePattern = [];
    level = 0;
    check = 0;
    userClickedPattern = [];

}

// *** HELPER FUNCTION

function playSound(name){
    let soundFileName =  "sounds/" + randomColour + ".mp3";
    soundFile = new Audio(soundFileName);
    soundFile.play();
}


function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 300)
    
}

$(".btn").click(function(){
    let userChosenColour = $(this).attr('id');  
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

let count = 0;

$(document).keydown(function() {
    count++;
    if (count === 1){
       nextSequence();

    }
})
    
    