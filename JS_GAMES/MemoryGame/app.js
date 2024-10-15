document.addEventListener('DOMContentLoaded', () => {
  
    // create array dict of cards

    const cardArray = [
        {
            name: 'bubba',
            img: 'images/bubba.png'
        },

        {
            name: 'bubba',
            img: 'images/bubba.png'
        },


        {
            name: 'cpp',
            img: 'images/cpp.png'
        },

        {
            name: 'cpp',
            img: 'images/cpp.png'
        },

        {
            name: 'gengar',
            img: 'images/gengar.png'
        },

        {
            name: 'gengar',
            img: 'images/gengar.png'
        },

        {
            name: 'snake',
            img: 'images/snake.png'
        },

        {
            name: 'snake',
            img: 'images/snake.png'
        },

        {
            name: 'torterra',
            img: 'images/torterra.png'
        },

        {
            name: 'torterra',
            img: 'images/torterra.png'
        },

        {
            name: 'turtle',
            img: 'images/turtle.png'
        },

        {
            name: 'turtle',
            img: 'images/turtle.png'
        },
    ];


    // now I want to create my grid
    const grid = document.querySelector(".grid");
    const score = document.querySelector("#result");
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];
    cardArray.sort(() => 0.5 - Math.random());



    function createBoard() 
    {
        for (let i=0;i<cardArray.length; i++) 
            {
                var card = document.createElement("img");
                card.setAttribute("src", "images/card-front.png");
                card.setAttribute("data-id", i);
                card.addEventListener('click', flipcard);
                grid.appendChild(card);

            }
    }

    createBoard();


    function checkForMatch() 
    {
        
        var cards = document.querySelectorAll("img");
        const option0 = cardsChosenId[0];
        const option1 = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) 
            {
                alert("Card Match, well done");
                cards[option0].setAttribute("src", "images/card-back.png");
                cards[option1].setAttribute("src", "images/card-back.png");
                cardsWon.push(cardsChosen)
                score.textContent = cardsWon.length;
            }
        else 
        {
            alert("Sorry, try again");
            cards[option0].setAttribute("src", "images/card-front.png");
            cards[option1].setAttribute("src", "images/card-front.png");
        }

        cardsChosen = [];
        cardsChosenId = [];
        
        if (score.textContent == (cardArray.length/2)) 
            {
                score.textContent = "Congrats, You WON!!!";
            }
    }

    function flipcard() 
    {
        var cardId = this.getAttribute("data-id");
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute("src", cardArray[cardId].img);
        if (cardsChosen.length === 2) 
            {
                setTimeout(checkForMatch, 300);
            }
    }
    
})