// This version only checks AFTER the number of times users press the button
// is equal the length of the game pattern
// In other words, it won't let users know right away if they press the wrong button.
let gamePattern = [];
let userClickedPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;


// *** HELPER FUNCTION

function playSound(name){
    let soundFileName =  "sounds/" + randomChosenColour + ".mp3";
    soundFile = new Audio(soundFileName);
    soundFile.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 300)
    
}

function nextSequence() {
    let randomNumber = Math.floor(Math.random()*4);
    // return randomNumber;
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    selectedButton = $("#"+randomChosenColour);
    selectedButton.fadeOut(100).fadeIn(100);
    //     // FUNCTION TO PLAY SOUND
    playSound(selectedButton);
    level++;
    $("#level-title").text("Level " + level);
    return randomNumber;
}

let check = 0;

function startOver() {
    count = 0;
    gamePattern = [];
    level = 0;
    check = 0;
    userClickedPattern = [];

}

function checkAnswer(){
    
    for (let i = 0; i < gamePattern.length; i++) {
        if (userClickedPattern[i] != gamePattern[i]) {
            // console.log("false");
            $("#level-title").text("Game Over, Press Any Key To Restart");
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 300);
        } else {
            check++;
            // console.log("true");
            

        }
        
        }
        if (check === gamePattern.length) {
            check = 0;
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
            
        } else {
            playSound("wrong");
            startOver();
        }
        

        
    }



// *** END OF HELPER FUNCTION

// selectedButton.click(function() {
//     selectedButton.fadeOut(100).fadeIn(100);
//     // FUNCTION TO PLAY SOUND
//     playSound(selectedButton);
// })



let started = false;

let count = 0;
let click = 0;

document.addEventListener("keydown",function(event){
    count++;
    document.querySelector("h1").innerHTML = "Level " + level; 
    if (count === 1)
    {
       nextSequence();
       $(".btn").click(function() {
        let userChosenColour = $(this).attr('id');  
        userClickedPattern.push(userChosenColour);
        // console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        
        if (userClickedPattern.length === gamePattern.length){
            checkAnswer();
         }
        }
        )
    
}
})   
    
       
    
   



// $(".btn").keydown(function(event){
//     // count += 1;
//     // if (count === 1) {
//     //     started = true;
//     // }

//     // while (started) {
//     //     let lvl = 0;
//     //     nextSequence();
//     //     $("h1").text("Level " + lvl);
//     // }
//     console.log(event);
    
// })

// VANILLA JS

// let buttons = document.querySelectorAll(".btn");
// for (let i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener("click", function() {
//         console.log(buttons[i].getAttribute("id"));
//     })
// }