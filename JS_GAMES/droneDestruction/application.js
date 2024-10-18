document.addEventListener("DOMContentLoaded", () => 
    {

        var grid = document.querySelector(".grid")
        var tiles = []

        // create 100 tiles: 10 per row x 10 per column
        for (let x=0;x<10; x++) 
            {
                for (let y=0;y<10;y++) 
                    {
                        var tile = document.createElement("div")
                        tile.setAttribute("class", "tile")
                        tile.setAttribute("x", x)
                        tile.setAttribute("y", y)
                        tile.innerText = `(${x},${y})`

                        grid.appendChild(tile)
                        tiles.push(tile)


                    }
            }

        document.addEventListener("keydown", (event) => 
            {
                const existingDrone = document.querySelector(".drone")
                if (existingDrone && event.key == "ArrowUp") 
                    {
                        moveDrone(existingDrone, event)
                    }
            })

            document.addEventListener("keydown", (event) => 
                {
                    const existingDrone = document.querySelector(".drone")
                    if (existingDrone && event.key == "ArrowRight") 
                        {
                            rotateDroneRight(existingDrone, event)
                        }
                })

                document.addEventListener("keydown", (event) => 
                    {
                        const existingDrone = document.querySelector(".drone")
                        if (existingDrone && event.key == "ArrowLeft") 
                            {
                                rotateDroneLeft(existingDrone, event)
                            }
                    })



        function assignEvent() 
        {
            for (let i=0;0<tiles.length;i++) 
                {
                    tiles[i].addEventListener('click', (event) => 
                        {
                            // alert(tiles[i].getAttribute("x") + " " + tiles[i].getAttribute("y") )

                            var targetTile = event.target
                            var targetTileX = parseInt(targetTile.getAttribute("x"),10)
                            var targetTileY = parseInt(targetTile.getAttribute("y"),10)
                            console.log(targetTileX, " ", targetTileY)

                            var droneExists = document.querySelector(".drone")
                            if (droneExists) 
                                {
                                    var droneExistsX = parseInt(droneExists.getAttribute("x"),10) 
                                    var droneExistsY = parseInt(droneExists.getAttribute("y"),10)
                                    if (targetTileX == droneExistsX && targetTileY == droneExistsY) 
                                        {
                                            droneStrike()
                                        }
                                    else 
                                    {
                                        const direction = prompt("Enter direction (N,S,E,W): ")
                                        console.log(direction)
                                        var cardinals = ['N', 'S', 'E', 'W']
            
                                        if (cardinals.includes(direction, 0)   ) 
                                            {
                                                placeDrone(tiles[i], direction)
                                            }
                                        else 
                                        {
                                            alert("invalid direction, please try again :) ")
                                        }
                                    }
                                }
                            else 
                            {
                                const direction = prompt("Enter direction (N,S,E,W): ")
                                console.log(direction)
                                var cardinals = ['N', 'S', 'E', 'W']
    
                                if (cardinals.includes(direction, 0)   ) 
                                    {
                                        placeDrone(tiles[i], direction)
                                    }
                                else 
                                {
                                    alert("invalid direction, please try again :) ")
                                }
                            }



                            
                        })           
                }
        }

        assignEvent()
        
        
        function placeDrone(tile,direction) 
        {
            var existingDrone = document.querySelector(".drone")
            if (existingDrone) 
                {
                    existingDrone.classList.remove("drone")
                    existingDrone.style.backgroundImage = ""
                }
            
            tile.classList.add("drone")
            tile.setAttribute("direction", direction)
            if (direction === "N") 
                {
                    tile.style.backgroundImage = 'url("img/N.png")' 
                }
            if (direction === "S") 
                {
                    tile.style.backgroundImage = 'url("img/S.png")' 
                }
            if (direction === "E") 
                {
                    tile.style.backgroundImage = 'url("img/E.png")' 
                }
            if (direction === "W") 
                {
                    tile.style.backgroundImage = 'url("img/W.png")' 
                }
            
        }

        function moveDrone(tile, event) 
        {
            var direction = tile.getAttribute("direction")
            var y = parseInt(tile.getAttribute("y"),10)
            var x = parseInt(tile.getAttribute("x"),10) 

            if (direction === "N" && x - 1 >= 0) 
                {
                    tile.classList.remove("drone")
                    tile.style.backgroundImage = ""
                    var newTile =  document.querySelector(`[x="${x-1}"][y="${y}"]`)
                    newTile.classList.add("drone")
                    newTile.style.backgroundImage = 'url("img/N.png")'
                    newTile.setAttribute("direction", "N")
                }
            else if (direction === "E" && y + 1 <= 9) 
                {
                    tile.classList.remove("drone")
                    tile.style.backgroundImage = ""
                    var newTile =  document.querySelector(`[x="${x}"][y="${y+1}"]`)
                    newTile.classList.add("drone")
                    newTile.style.backgroundImage = 'url("img/E.png")'
                    newTile.setAttribute("direction", "E")
                }
            else if (direction === "S" && x + 1 <= 9) 
                {
                    tile.classList.remove("drone")
                    tile.style.backgroundImage = ""
                    var newTile =  document.querySelector(`[x="${x+1}"][y="${y}"]`)
                    newTile.classList.add("drone")
                    newTile.style.backgroundImage = 'url("img/S.png")'
                    newTile.setAttribute("direction", "S")
                }
            else if (direction === "W" && y - 1 >= 0) 
                {
                    tile.classList.remove("drone")
                    tile.style.backgroundImage = ""
                    var newTile =  document.querySelector(`[x="${x}"][y="${y-1}"]`)
                    newTile.classList.add("drone")
                    newTile.style.backgroundImage = 'url("img/W.png")'
                    newTile.setAttribute("direction", "W")
                }

        }

        function rotateDroneRight(tile, event) 
        {
            var direction = tile.getAttribute("direction")
            var y = parseInt(tile.getAttribute("y"),10)
            var x = parseInt(tile.getAttribute("x"),10)
            
            if (direction === "N") 
                {
                    tile.setAttribute("direction", "E")
                    tile.style.backgroundImage = 'url("img/E.png")'
                }
                if (direction === "E") 
                    {
                        tile.setAttribute("direction", "S")
                        tile.style.backgroundImage = 'url("img/S.png")'
                    }
                if (direction === "S") 
                    {
                        tile.setAttribute("direction", "W")
                        tile.style.backgroundImage = 'url("img/W.png")'
                    }
                if (direction === "W") 
                    {
                        tile.setAttribute("direction", "N")
                        tile.style.backgroundImage = 'url("img/N.png")'
                    }
        }

        function rotateDroneLeft(tile, event) 
        {
            var direction = tile.getAttribute("direction")
            var y = parseInt(tile.getAttribute("y"),10)
            var x = parseInt(tile.getAttribute("x"),10)
            
            if (direction === "N") 
                {
                    tile.setAttribute("direction", "W")
                    tile.style.backgroundImage = 'url("img/W.png")'
                }
            if (direction === "E") 
                {
                    tile.setAttribute("direction", "N")
                    tile.style.backgroundImage = 'url("img/N.png")'
                }
            if (direction === "S") 
                {
                    tile.setAttribute("direction", "E")
                    tile.style.backgroundImage = 'url("img/E.png")'
                }
            if (direction === "W") 
                {
                    tile.setAttribute("direction", "S")
                    tile.style.backgroundImage = 'url("img/S.png")'
                }
        }

        function droneStrike() 
        {
            var existingDrone = document.querySelector(".drone")
            var existingDroneX = parseInt(existingDrone.getAttribute("x"),10)
            var existingDroneY = parseInt(existingDrone.getAttribute("y"),10)
            var droneDirection = existingDrone.getAttribute("direction")

            if (droneDirection === "N" && existingDroneX - 2 >= 0) 
                {
                    var tileOne = document.querySelector(`[x="${existingDroneX-2}"][y="${existingDroneY}"]`)
                    console.log(tileOne)
                    tileOne.style.backgroundColor = "black"
                }
            if (droneDirection === "E") 
                {

                }
            if (droneDirection === "S") 
                {

                }
            if (droneDirection === "W") 
                {

                }

        }
        
    })
