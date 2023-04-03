window.onload = () => {
    // getting the cardsdiv element, in which we will be adding the elements
    const cardsDiv = document.getElementById("cardsListDiv");
    // getting the json file, which is a promise, so we convert it to a json file and store it in the data variable
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // for all the objects in the json file, we make a new component and append it to the main div
        for (let i = 0; i < data.length; i++) {
            fetch('components/movieCard.html')
                .then(response => response.text())
                .then(html => {
                    // replacing the movie's name, image address, and the comment 
                    html = html.replace("Image Address", data[i].src);
                    html = html.replace("Movie Name", data[i].name);
                    html = html.replace("Comment", data[i].comment_titile);
                    // making a string that holds unicode characters for the number of stars
                    let stars = '';
                    for (let j = 1; j<=5; ++j){
                        if(j<=data[i].stars){
                            // full star
                            stars += "&#9733; ";
                        }
                        else{
                            // empty star
                            stars += "&#9734; ";
                        }
                    }
                    // removing the last space
                    stars = stars.slice(0, -1);
                    html = html.replace("Star Rating", stars);
                    const cardComponent = document.createElement("div");
                    cardComponent.innerHTML = html;
                    cardsDiv.appendChild(cardComponent);
                })
                .catch(error => console.error(error));
        }
    })
  };
  
  const light = document.getElementById("lightButton");
  const dark = document.getElementById("darkButton");
  const sun = document.getElementById("sunImg");
  const moon = document.getElementById("moonImg");
  
  light.addEventListener("click", function() {
    moon.classList.add("img-faded");
    moon.classList.remove("img-normal");
    sun.classList.add("img-normal");
    sun.classList.remove("img-faded");
  });
  
  dark.addEventListener("click", function() {
    moon.classList.remove("img-faded");
    moon.classList.add("img-normal");
    sun.classList.remove("img-normal");
    sun.classList.add("img-faded");
  });