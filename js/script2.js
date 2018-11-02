let icons = [`<i class="far fa-angry fa-4x"></i>`, `<i class="far fa-dizzy fa-4x"></i>`, `<i class="far fa-grin-stars fa-4x"></i>`, `<i class="far fa-frown fa-4x"></i>`, 
            `<i class="far fa-grin-tears fa-4x"></i>`, `<i class="far fa-grin-tongue fa-4x"></i>`, `<i class="far fa-flushed fa-4x"></i>`, `<i class="far fa-kiss fa-4x"></i>`,
            `<i class="far fa-angry fa-4x"></i>`, `<i class="far fa-dizzy fa-4x"></i>`, `<i class="far fa-grin-stars fa-4x"></i>`, `<i class="far fa-frown fa-4x"></i>`, 
            `<i class="far fa-grin-tears fa-4x"></i>`, `<i class="far fa-grin-tongue fa-4x"></i>`, `<i class="far fa-flushed fa-4x"></i>`, `<i class="far fa-kiss fa-4x"></i>`]
let i, j, k, tds;
let compare = [];

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
    //console.log(this.firstChild.classList);
    this.firstChild.classList.remove("hide");
    compare.push(this.innerHTML);
    if (compare.length === 2) {
        if (compare[0].innerHTML != compare[1].innerHTML) {
            //Need to add logic to compare and flip
        }
    }
}

shuffle(icons);
createGameboard();


