const cards = document.querySelectorAll(".card");
let count = 0;
const game = document.querySelector(".game");
let images = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"];
const modal = document.querySelector(".modal");
const p = document.createElement("p");
const reset = document.querySelector("#reset");
const stars = document.querySelectorAll(".icon");
let startTime;
const start = document.querySelector("#start")
let total = 0;
const upCards = document.querySelectorAll(".up-card")

//Messages
const won = document.createTextNode("Congratulations you won! Here are your stats: ");
const lost = document.createTextNode("Sorry you lost! Click the restart button to try again!");

//Shuffle image array
function shuffle(array) {
  let currentIndex = images.length;
  let temp;
  let randomIndex;

  while (currentIndex != 0) {
   // Create random index
   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex -= 1;

   // Swap current index/random index
   temp = images[currentIndex];
   images[currentIndex] = images[randomIndex];
   images[randomIndex] = temp;
 }
 return images;
}
//Insert shuffled array into card divs
function insert(array) {
  let i = 0;
  let j = 0;
  while (i < upCards.length) {
    upCards[i].innerHTML = "<img src='images/" + images[j] + "'/>";
    i++;
    j++;
  }
}

//Flip cards over and compare
function flipCompare() {
  let compareCardsInner = [];
  let compareCards = [];
  for (let k=0; k<cards.length; k++) {
    let innerHTML;
    //Listen for click
    cards[k].addEventListener("click", function() {
      total++;
      //Get image source
      outerElement = this.firstElementChild;
      innerHTML = this.firstElementChild.innerHTML;
      //Add to array
      compareCardsInner.push(innerHTML);
      compareCards.push(outerElement);
      //Flip cards over
      this.firstElementChild.classList.toggle("hide");
      //Add two flipped cards to array and compare
      if (compareCardsInner.length === 2) {
        //Variables to compare cards (innerHTML)
        let cardOne = compareCardsInner[0];
        let cardTwo = compareCardsInner[1];
        //Convert innerHTML to a string to compare
        let stringOne = cardOne.toString();
        let stringTwo = cardTwo.toString();
        if (stringOne === stringTwo) {
          let  match = 0;
          compareCards[0].classList.add("match");
          compareCards[1].classList.add("match");
          compareCards = [];
          compareCardsInner = [];
          //Check to see if all cards on board matched
          for (let i = 0; i <upCards.length; i++) {
            if (upCards[i].classList.contains("match")) {
              match++;
            }
            if (match === 16) {
              const endTime = new Date();
              const finalTime = endTime.getMinutes() - startTime.getMinutes();
              modal.classList.remove("hide");
              modal.appendChild(p);
              p.appendChild(won);
              let p2 = p.cloneNode();
              modal.appendChild(p2);
              p2.innerHTML = (stars.length) + (" stars with ") + (total) + (" moves in ") + (finalTime) + (" minutes!");
              }
            }
            console.log(match);

          } else {
            setTimeout(function(){
              //Add animated shake if no match
              compareCards[0].classList.add("animated");
              compareCards[1].classList.add("animated");
              compareCards[0].classList.add("shake");
              compareCards[1].classList.add("shake");
            }, 500);
            setTimeout(function(){
              //Remove animated shake and flip the card back over
              compareCards[0].classList.remove("animated");
              compareCards[1].classList.remove("animated");
              compareCards[0].classList.remove("shake");
              compareCards[1].classList.remove("shake");
              compareCards[0].classList.add("hide");
              compareCards[1].classList.add("hide");
              compareCards = [];
              compareCardsInner = [];
            }, 1000);
            //Check count and remove stars
            setTimeout(function(){
            count++;
            if (count > 3 && count <= 6) {
              stars[3].classList.add("hide");
            } else if (count > 6 && count <= 9) {
              stars[3].classList.add("hide");
              stars[2].classList.add("hide");
            } else if (count > 9 && count <= 12) {
              stars[3].classList.add("hide");
              stars[2].classList.add("hide");
              stars[1].classList.add("hide");
            } else  if (count > 12){
              stars[3].classList.add("hide");
              stars[2].classList.add("hide");
              stars[1].classList.add("hide");
              stars[0].classList.add("hide");
              //Show lost modal
              modal.classList.remove("hide");
              p.appendChild(lost);
              modal.appendChild(p);
            }
            }, 1800);
          };
        };
      })
    }
  }

  //Restart game
  reset.addEventListener("click", function() {
    for (let i = 0; i < upCards.length; i++) {
      upCards[i].classList.add("hide");
    }
    stars[3].classList.remove("hide");
    stars[2].classList.remove("hide");
    stars[1].classList.remove("hide");
    stars[0].classList.remove("hide");
    shuffle(images);
    insert(images);
    count = 0;
    modal.classList.add("hide");
  });

  //Timer
  start.addEventListener("click", function() {
    startTime = new Date();
  });

  shuffle(images);
  insert(images);
  flipCompare();
