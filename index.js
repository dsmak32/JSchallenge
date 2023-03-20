//  Card rendering function.

const cardContainer = document.querySelector('.layout-placeholder');
let start = 0;
const cardsPerLoad = 4;

function renderCards() {  
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      const cardsToRender = data.slice(start, start + cardsPerLoad);
      cardsToRender.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('preview');
         card.innerHTML = `
 
          <div class="card" id="cardId" data-source-type="${item.source_type}"> 
            <div class="topPart">
              <img src="${item.profile_image}" class="profilePic" alt="">
              <div class="nameAndDate">
                <strong>${item.name}</strong><br>
                <p class="date">${item.date}</p>
              </div>
              <img src="./icons/${item.source_type}-logo.svg" class="platform" alt="">
            </div>
            <img src="${item.image}" class="mainImage" alt="">
            <div class="bottomPart">
            <p class="caption">${item.caption.slice(0, 125)}</p>    ${/* I spliced the caption to the Instagram post character limit, 125 chars. */''}
              <hr>
              <img class="likeButton"  src="./icons/heart.svg" alt="" >
              <p class="numberOfLikes">${item.likes}</p>
            </div>
          </div>

        `; 
        cardContainer.appendChild(card);
      });
      
      start += cardsPerLoad;

      if (start >= data.length) {
        loadMoreButton.style.display = "none";
      }
    })
    .catch(error => console.error(error));
}

renderCards(); // First four cards that get rendered.



// Load more button, loads four more posts each time when pressed.
const loadMoreButton = document.querySelector('.load-more');
loadMoreButton.addEventListener('click', renderCards);  







// Column function, takes the value of the column drop down menu and applies it to the layout.

const numberOfColumnsDropdown = document.getElementById('numberOfColumns');
numberOfColumnsDropdown.addEventListener('change', function() { 
    const selectedValue = numberOfColumnsDropdown.value;
    if (selectedValue === 'dynamic') {
      document.getElementById("layout").style.gridTemplateColumns  = 'repeat(2, 1fr)';
    } else {
      document.getElementById("layout").style.gridTemplateColumns = `repeat(${selectedValue}, 1fr)`;
    }

});




//Background color changer, takes value from text box and applies it to the background color of the cards/posts.

const bgColor = document.getElementById('cardBackgroundColor');

bgColor.addEventListener('change', function() {  
    const colorValue = bgColor.value;
     const cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = colorValue;
    }
});



// Space between cards function, takes the value inserted in pixels and adds is at a margin.

const spaceBetween = document.getElementById('cardSpaceBetween');

spaceBetween.addEventListener('change', function() { 
    const space = spaceBetween.value;
    const cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.margin = space;
    }
});





// Light and dark theme function, if one or the other gets selected, I loop through the cards and set their properties.

const theme = document.getElementById('darkTheme');
const defaultTheme = document.getElementById('lightTheme');

theme.addEventListener('change', function() { 
    const cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = "black";
        cards[i].style.color = "white";
    }
});

defaultTheme.addEventListener('change', function() {
    const cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = "white";
        cards[i].style.color = "black";
    }
});



// Filtering function, adds a listener to all the sources via a loop, then we loop through the cards and if they don't match the source type we hide them.

const filterBySource = document.getElementsByName("filterBySource");

for (let i = 0; i < filterBySource.length; i++) { 
  filterBySource[i].addEventListener("change", function() {
    const selectedSource = this.value;
    const cards = document.getElementsByClassName("card");
    for (let j = 0; j < cards.length; j++) {
      const sourceType = cards[j].getAttribute("data-source-type");
      if (selectedSource === "all" || selectedSource === sourceType) {
        cards[j].style.display = "block";
      } else {
        cards[j].style.display = "none";
      }
    }
  });
}




// Like function, adds a listener to all the like buttons, if like is clicked I add a "liked" tag to the class and increase the number of likes by one. 
//If it's already tagged as like, I decrease the amount and remove the color.

window.onload=function(){

function toggleLike() {
  const likeButton = this;
  const numberOfLikes = this.nextElementSibling;

  if (likeButton.classList.contains('liked')) {
    likeButton.classList.remove('liked');
    numberOfLikes.textContent = parseInt(numberOfLikes.textContent) - 1;
    likeButton.style.backgroundColor = "transparent";
  } else {
    likeButton.classList.add('liked');
    numberOfLikes.textContent = parseInt(numberOfLikes.textContent) + 1;
    likeButton.style.backgroundColor = "red";
  }
}
const likeButtons = document.querySelectorAll('.likeButton');
likeButtons.forEach(button => button.addEventListener('click', toggleLike));
}