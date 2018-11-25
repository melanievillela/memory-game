"use strict";
 
 (function init() {
 
   let icons = [`<i class="fa-angry fa-3x far"></i>`, `<i class="fa-dizzy fa-3x far"></i>`, `<i class="fa-grin-stars fa-3x far"></i>`, `<i class="fa-frown fa-3x far"></i>`, 
                `<i class="fa-grin-tears fa-3x far"></i>`, `<i class="fa-grin-tongue fa-3x far"></i>`, `<i class="fa-laugh fa-3x far"></i>`, `<i class="fa-kiss fa-3x far"></i>`,
                `<i class="fa-angry fa-3x far"></i>`, `<i class="fa-dizzy fa-3x far"></i>`, `<i class="fa-grin-stars fa-3x far"></i>`, `<i class="fa-frown fa-3x far"></i>`, 
                `<i class="fa-grin-tears fa-3x far"></i>`, `<i class="fa-grin-tongue fa-3x far"></i>`, `<i class="fa-laugh fa-3x far"></i>`, `<i class="fa-kiss fa-3x far"></i>`]
    let i, j, tds;
    let compare = [];
    let matches = 0;
    let score = 9;
    let turns = 0;

    shuffle(icons);
    createGameboard();

    //Shuffle image array
    function shuffle(icons) {
        let currentIndex = icons.length;
        let temp;
        let randomIndex;
    
        while (currentIndex != 0) {
        // Create random index
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // Swap current index/random index
        temp = icons[currentIndex];
        icons[currentIndex] = icons[randomIndex];
        icons[randomIndex] = temp;
    }
    return icons;
    }

    //Populate gameboard
    function createGameboard() {
        //Create table
        let table = document.querySelector("table");
        //Check if table is empty if not clear table
        if (table.hasChildNodes()) {
            let rows = document.querySelectorAll("tr");
            let stars = document.querySelectorAll(".fa-star"); 
            for (let i = 0; i < rows.length; i++) {
                rows[i].remove();
            }
            for (let j = 0; j < stars.length; j++) {
                stars[j].classList.remove("hide");
            }
        }
        for (i = 0; i < 4; i++) {
            let tr = document.createElement("tr");
            table.appendChild(tr); 
            for (j = 0; j < 4; j++) {
                let td = document.createElement("td");
                tr.appendChild(td);
            }       
        }
        //Add emoji array to table
        for (i = 0; i < icons.length; i++) {
            tds = document.querySelectorAll("td");
            tds[i].innerHTML = icons[i];
        }

        hideCards();
    }

    //Hide emojis
    function hideCards() {
        let emoji = document.querySelectorAll(".far");
        for (i = 0; i < icons.length; i++) {
            emoji[i].classList.add("hide"); 
        }
        
        listenForClick();
    }

    //Add event listener
    function listenForClick() {
        tds = document.querySelectorAll("td");
        for (i = 0; i < icons.length; i++) {
            tds[i].addEventListener("click", checkMatch);
        } 
    }

    //Check for match
    function checkMatch() {
        this.firstChild.classList.remove("hide");
        compare.push(this.firstChild);
        console.log(this);

        if (compare.length === 2) {  
            console.log(compare);
            turns += 1;    
            //Remove clicks from other cards    
            for (i = 0; i < icons.length; i++) {
                tds[i].removeEventListener("click", checkMatch);
            }

            //Match
            if (compare[0].className === compare[1].className) { 
                //Add animation       
                compare[0].classList.add("animated", "pulse");
                compare[1].classList.add("animated", "pulse");              
                     
                //Reset array to zero add event listeners back to cards
                setTimeout(function() {
                    compare = [];
                    listenForClick()
                }, 1250);
                matches += 1;
                //Check for win
                if (matches === 8) {
                    setTimeout(endGame, {
                    }, 100);
                }
            } 

            //No match    
            else {
                score -= 1;
                compare[0].classList.add("animated", "shake");
                compare[1].classList.add("animated", "shake");

                //Hide cards, remove animation class remove star and reset array to zero
                setTimeout(function() {
                    compare[0].classList.add("hide");
                    compare[1].classList.add("hide");
                    compare[0].classList.remove("animated", "shake");
                    compare[1].classList.remove("animated", "shake");
                    removeStar(); 
                    compare = [];
                    listenForClick()
                }, 1250);
            }        
        }
    }

    //Remove star
    function removeStar() {
        let stars = document.querySelectorAll(".fa-star");
        if (score === 6) {
            stars[0].classList.add("hide");
        } else if (score === 3) {
            stars[1].classList.add("hide");
        } else if (score === 0) {
            stars[2].classList.add("hide");
            setTimeout(endGame, {            
            }, 100);
        } 
    }

    //Win/Lose messages
    function endGame() {
        let modal = document.querySelector("#modal-msg");
        modal.parentElement.classList.remove("hide");
        let restart = document.querySelector("button");
        restart.addEventListener("click", hideModal);
        if (score === 0) {
            modal.innerText = 
            `Sorry you are not a winner. 
            You lost all your stars and took ${turns} turns.
            Better luck next time!
            Play again?`
        } else {
            modal.innerText = 
            `Congratulations you are a winner. 
            You didn't lose all your stars and took ${turns} turns.
            Play Again?`
        }
    }

    //Hide modal
    function hideModal() {
        let modal = document.querySelector("#modal-msg");
        modal.parentElement.classList.add("hide");
        //Restart game
        init();
    }

})();




