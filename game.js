gamePattern = [];
clickPattern = [];
buttonColors = ["red", "blue", "green", "yellow"];
var index = 0;
var level = 1;
var flag = false;


function nextSequence() {
    randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);

    return randomNumber;
}

// Press any key to start and generate first sequence
document.addEventListener("keydown", function () {
    if(!flag){
        randomChosenColor = nextSequence();
        gamePattern.push(buttonColors[randomChosenColor]);
        console.log(gamePattern);
        var audio = new Audio("sounds/"+gamePattern[0]+".mp3");
        audio.play();

        $("#"+gamePattern[0]).fadeTo(100, 0);

        setTimeout(function () {
            $("#"+gamePattern[0]).fadeTo(100, 1);
        }, 100);

        flag = true;

        $("#level-title").text("Level "+level);
    }
    
});

// Detect clicks on the buttons
document.addEventListener("click", function (event) {
    
    btnId = event.target.id;

    if(btnId == "blue" || btnId == "yellow" || btnId == "green" || btnId == "red" ){
        console.log(gamePattern[index]+"--"+btnId);
        var audio = new Audio("sounds/"+btnId+".mp3");
        audio.play();

        $("#"+btnId).fadeTo(100, 0);

        setTimeout(function () {
            $("#"+btnId).fadeTo(100, 1);
        }, 100);

        if(gamePattern[index] == btnId){
            index++;

            // New Level
            if(index == gamePattern.length) {

                setTimeout(function () {
                    randomChosenColor = nextSequence();
                    gamePattern.push(buttonColors[randomChosenColor]);
                    var audio = new Audio("sounds/"+gamePattern[gamePattern.length-1]+".mp3");
                    audio.play();

                    $("#"+gamePattern[gamePattern.length-1]).fadeTo(100, 0);

                    setTimeout(function () {
                        $("#"+gamePattern[gamePattern.length-1]).fadeTo(100, 1);
                    }, 100);

                    console.log("New game pattern: "+gamePattern);
                    index = 0;
                    level++;
                    $("#level-title").text("Level "+level);
                }, 1000);
                

                
            }
        }
        else {
            console.log("Game Over");
            index = 0;
            level = 1;
            $("#level-title").text("Game Over, Press Any Key to Restart");
            gamePattern = [];
            flag = false;
        }

    }
});