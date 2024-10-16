var grid = document.querySelector(".grid");

for (let i=0;i<9;i++) 
    {
        var square = document.createElement("div");
        square.setAttribute("class", "square");
        square.setAttribute("id", i+1);
        grid.appendChild(square);


    }


const squares = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
const timeLeft = document.querySelector("#time-left");
let score = document.querySelector("#score");

let currentTime = timeLeft.textContent;



let result = 0;

// randomly add .mole to a tile
function randomSquare() 
{
    squares.forEach(square => 
        {
            square.classList.remove("mole");
        })

    let randomTile = squares[Math.floor(Math.random() * 9)];
    randomTile.classList.add("mole");
    hitPosition = randomTile.id; // for later in the global namespace
}

squares.forEach(square => 
    {
        square.addEventListener("click", () => 
            {
                if (square.id === hitPosition) 
                    {
                        result = result + 1;
                        score.textContent = result;
                    }
            })
    })


// rapidly keep moving the mole
function moveMole() 
{
    let timerId = null;
    timerId = setInterval(randomSquare, 500);   
}

moveMole()

function countDown() 
{
    currentTime --;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) 
        {
            clearInterval(timerId)
            alert("Game Over");
        }
}



let timerId = setInterval(countDown, 1000);

