document.addEventListener("DOMContentLoaded", () => 
    {
        const tilePositions = []
        const  grid = document.querySelector(".grid")

        for (let i=0;i<25;i++) 
            {
                var tile = document.createElement("div")
                tile.setAttribute("class", "tile")
                tile.innerHTML = i.toString()
                grid.appendChild(tile)
                tile.classList.add("tile-" + i)

                if (i == 0) 
                    {
                        tile.classList.add("drone")
                        tile.classList.add("moveable")                        
                    }

                tilePositions.push(i)
                console.log(tilePositions)
            }

    
        // I need to add a function that allows me to move the tile rightward

        var moveableTile = document.querySelector(".moveable")
        document.addEventListener("keydown", (event) => 
            {
                // grad tile class
                if (event.key === "ArrowUp") 
                {
                    // var tileNumber = moveableTile.getHTML()
                    // alert(tileNumber)
                    var currentTile = parseInt( moveableTile.getHTML(),10)
                    console.log(currentTile)
                    

                    var newMoveableTile = document.querySelector(`.tile-${currentTile+1}`)
                    console.log(newMoveableTile)
                    moveableTile.classList.remove("drone")
                    moveableTile.classList.remove("moveable")
                    newMoveableTile.classList.add("drone")
                    newMoveableTile.classList.add("moveable")
                    moveableTile = newMoveableTile
                }



            } )
        
        
    })




