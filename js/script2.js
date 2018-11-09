let icons = [`<i class="fa-angry fa-4x far"></i>`, `<i class="fa-dizzy fa-4x far"></i>`, `<i class="fa-grin-stars fa-4x far"></i>`, `<i class="fa-frown fa-4x far"></i>`, 
            `<i class="fa-grin-tears fa-4x far"></i>`, `<i class="fa-grin-tongue fa-4x far"></i>`, `<i class="fa-flushed fa-4x far"></i>`, `<i class="fa-kiss fa-4x far"></i>`,
            `<i class="fa-angry fa-4x far"></i>`, `<i class="fa-dizzy fa-4x far"></i>`, `<i class="fa-grin-stars fa-4x far"></i>`, `<i class="fa-frown fa-4x far"></i>`, 
            `<i class="fa-grin-tears fa-4x far"></i>`, `<i class="fa-grin-tongue fa-4x far"></i>`, `<i class=" fa-flushed fa-4x far"></i>`, `<i class=" fa-kiss fa-4x far"></i>`]
let i, j, k, tds;
let compare = [];
let turns = 0;
let score = 9;

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

    if (compare.length === 2) {  
        turns += 1;    
        //Remove clicks from other cards    
        for (i = 0; i < icons.length; i++) {
            tds[i].removeEventListener("click", checkMatch);
        }

        //Match
        if (compare[0].className === compare[1].className) { 
            //Add animation 
            /*         
            setTimeout(function() {
                compare[0].classList.add("animated", "flash");
                compare[1].classList.add("animated", "flash");              
            }, 500)
            */
            //Reset array to zero add event listeners back to cards
            setTimeout(function() {
                compare = [];
                listenForClick()
            }, 1500);
        } 

        //No match    
        else {
            score -= 1;
            //Add animation 
            /*
            setTimeout(function() {
                compare[0].classList.add("animated", "flash");
                compare[1].classList.add("animated", "flash");
            }, 500);
            */
            //Reset array to zero add event listeners back to cards
            setTimeout(function() {
                compare[0].classList.add("hide");
                compare[1].classList.add("hide");
                removeStar(); 
                compare = [];
                listenForClick()
            }, 1500); 

        }
        console.log(score)
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
    } 
}

shuffle(icons);
createGameboard();




