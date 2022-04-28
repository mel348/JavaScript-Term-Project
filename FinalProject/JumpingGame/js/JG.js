var plankton = document.getElementById("plankton");
var krabs = document.getElementById("krabs");
var counter=0;

function startGame() {
    document.getElementById("playAgain").style.visibility = "hidden"; 
}



function jump(){                                           //can't readd the same class twice so you have to remove the animation                   
    if(plankton.classList != "animate"){            
    plankton.classList.add("animate");
    setTimeout(function(){
        plankton.classList.remove("animate");
    },500);                                                 //500 ms is how long it takes for the animation to run.
}
setInterval(function() {
    var planktonTop = parseInt(window.getComputedStyle(plankton).getPropertyValue("top"));   //returns top position of the character
    var krabsLeft = parseInt(window.getComputedStyle(krabs).getPropertyValue("left"));        //left position  
    if(krabsLeft<20 && krabsLeft>-10 && planktonTop>=150){                                    //compare top position and left position to see if they have hit each other
        krabs.style.animation = "none";   
        krabs.style.display = "none";          
        alert("Game Over! Your score: "+Math.floor(counter/100));
        counter=0; 
         krabs.style.animation = "block 1s infinite linear";
   }else{
        counter++;                                                                      //counter incremating 
        document.getElementById("scoreSpan").innerHTML = Math.floor(counter/100);
        document.getElementById("playAgain").style.visibility = "visible";              //play again button appears after you start the game.
    }
}, 10)};