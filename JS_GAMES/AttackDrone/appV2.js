document.addEventListener("DOMContentLoaded", () => 
    {
        var grid = document.querySelector(".grid")
        var tiles = []
        
        const droneNorth = "https://github.com/ThePowerfulProgrammer/Web-development/blob/main/JS_GAMES/AttackDrone/images/N.png?raw=true"
        const droneSouth = "https://github.com/ThePowerfulProgrammer/Web-development/blob/main/JS_GAMES/AttackDrone/images/S.png?raw=true"
        const droneWest = "https://github.com/ThePowerfulProgrammer/Web-development/blob/main/JS_GAMES/AttackDrone/images/W.png?raw=true"
        const droneEast = "https://github.com/ThePowerfulProgrammer/Web-development/blob/main/JS_GAMES/AttackDrone/images/E.png?raw=true"


        // Preload images in an attempt to make loading a lil faster

        function preloadImg(...urls) 
        {
            urls.forEach(url => 
                {
                    const img = new Image()
                    img.src = url
                })
        }

        preloadImg(droneNorth, droneSouth, droneEast, droneWest)
    
        // create 100 tiles: 10 rows x 10 columns at 9% of parent size each 
        for (let x=9;x>=0; x--) 
            {
                for (let y=0;y<10;y++) 
                    {
                        var tile = document.createElement("div")
                        tile.setAttribute("class", "tile")
                        tile.setAttribute("x", y) // yes, it is correct
                        tile.setAttribute("y", x)
                        tile.innerText = `(${y},${x})`
    
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
                    if (existingDrone && event.key == "ArrowRight" || existingDrone && event.key == "ArrowLeft") 
                        {
                            rotateDrone(existingDrone, event)
                        }
                })
    
    
    
        function assignPlaceEvent() 
        {
            for (let i=0;i<tiles.length;i++) 
                {
                    tiles[i].addEventListener('click', (event) => 
                        {

                            var targetTile= event.target.parentNode
                                
                            var targetTileX = parseInt(targetTile.getAttribute("x"),10)
                            var targetTileY = parseInt(targetTile.getAttribute("y"),10)                    
                            var droneExists = document.querySelector(".drone")                            

                            if (droneExists) 
                                {
                                    var droneExistsX = parseInt(droneExists.getAttribute("x"),10) 
                                    var droneExistsY = parseInt(droneExists.getAttribute("y"),10)
                                    
                                    
                                    if (targetTileX == droneExistsX && targetTileY == droneExistsY) 
                                        {
                                            var action = prompt("Would you like to report your Position?\nWould you like to move your current Drone?\nWould you like to Destroy your enemies?\nEnter R (R = Report), P (P = Position) or A (A = Attack) ")
                                            var strippedAction = action.trim()
                                            var actions = ["A", "R", "P"]
                                            if (actions.includes(strippedAction,0)) 
                                                {
                                                    if (strippedAction == "A") 
                                                        {
                                                            droneStrike() // I clicked on a tile which has a drone therefore I strike
                                                        }
                                                    else if (strippedAction == "R") 
                                                        {
                                                            reportPosition() // I clicked on a tile which has a drone and I want to report a few details
                                                        }
                                                    else if (strippedAction == "P") // More of a feature as I need to account for movement of mobile users: They have no keyboard LOL :^) 
                                                        {
                                                            const direction = prompt("Enter direction (North,South,East,West): ")
                                                            
                                                            const strippedDirection = direction.trim()
                                                            var cardinals = ['North', 'South', 'East', 'West']
                                                            
                                                            if (cardinals.includes(strippedDirection, 0)   ) 
                                                                {
                                                                    placeDrone(tiles[i], strippedDirection)
                                                                }
                                                            else 
                                                            {
                                                                alert("invalid direction, please try again :) ")
                                                            }
                                                             
                                                        }
                                                }
                                            else 
                                            {
                                                alert("Invalid Option, do that again and maybe a drone will visit you")
                                            }
                                        }
                                    else // I am either adding the first drone or moving that drone
                                    {
                                        const direction = prompt("Enter direction (North,South,East,West): ")
                                        const strippedDirection = direction.trim()
                                        
                                        var cardinals = ['North', 'South', 'East', 'West']
            
                                        if (cardinals.includes(strippedDirection, 0)   ) 
                                            {
                                                placeDrone(tiles[i], strippedDirection)
                                            }
                                        else 
                                        {
                                            alert("invalid direction, please try again :) ")
                                        }
                                    }
                                }
                            else 
                            {
                                const direction = prompt("Enter direction (North,South,East,West): ")
                                const strippedDirection = direction.trim()
                                
                                var cardinals = ['North', 'South', 'East', 'West']
    
                                if (cardinals.includes(strippedDirection, 0)   ) 
                                    {
                                        placeDrone(tiles[i], strippedDirection)
                                    }
                                else 
                                {
                                    alert("invalid direction, please try again :) ")
                                }
                            }
                        })           
                }
    }
    assignPlaceEvent() // call function to apply the event on each coordinate tile
    
    
    // place drone according to direction and tile
    function placeDrone(tile,direction) 
    {
        var existingDrone = document.querySelector(".drone")
        if (existingDrone) 
            {
                existingDrone.classList.remove("drone")
                var existingImage = existingDrone.querySelector("img")
                existingDrone.removeChild(existingImage)
            }
        
        tile.classList.add("drone")
        tile.setAttribute("direction", direction)
        tile.innerText = null
        if (direction == "North") 
            {
                // create a new image tag and add it as a child to the tile
    
                var image = document.createElement("img")
                image.setAttribute("src", droneNorth)
                image.setAttribute("alt", "A super scary drone")
                image.setAttribute("class", "drone-img")
                tile.appendChild(image)
            }
        if (direction == "South") 
            {
                // create a new image tag and add it as a child to the tile
                var image = document.createElement("img")
                image.setAttribute("src", droneSouth)
                image.setAttribute("alt", "A super scary drone")
                image.setAttribute("class", "drone-img")
                tile.appendChild(image)
            }
        if (direction == "East") 
            {
                // create a new image tag and add it as a child to the tile
                var image = document.createElement("img")
                image.setAttribute("src", droneEast)
                image.setAttribute("alt", "A super scary drone")
                image.setAttribute("class", "drone-img")
                tile.appendChild(image) 
            }
        if (direction == "West") 
            { 
                // create a new image tag and add it as a child to the tile
                var image = document.createElement("img")
                image.setAttribute("src", droneWest)
                image.setAttribute("alt", "A super scary drone")
                image.setAttribute("class", "drone-img")
                tile.appendChild(image)
            }
        
    }
    
    // advance a drone forward by 1 tile (Coordinate in either x or y)
    function moveDrone(tile, event) 
    {
        var direction = tile.getAttribute("direction")
        var y = parseInt(tile.getAttribute("y"),10)
        var x = parseInt(tile.getAttribute("x"),10) 
    
        console.log("Not moving forward: " + direction)
        if (direction == "North" && y + 1 <= 9) 
            {
                console.log(tile)
                console.log("Direction: " + direction)            
                tile.classList.remove("drone")
                var existingImage = tile.querySelector("img")
                tile.removeChild(existingImage)
    
                var newTile =  document.querySelector(`[x="${x}"][y="${y+1}"]`)
                newTile.innerText = null
                newTile.classList.add("drone")
                newTile.setAttribute("direction", "North")
                
                var image = document.createElement("img")
                image.setAttribute("src", droneNorth)
                image.setAttribute("alt", "A super scary drone")
                image.setAttribute("class", "drone-img")
                newTile.appendChild(image)
            }
        else if (direction == "East" && x + 1 <= 9) 
            {
                console.log(tile)
                console.log("Direction: " + direction)
                tile.classList.remove("drone")
                var existingImage = tile.querySelector("img")
                tile.removeChild(existingImage)
    
                var newTile =  document.querySelector(`[x="${x+1}"][y="${y}"]`)
                newTile.innerText = null
                newTile.classList.add("drone")
                newTile.setAttribute("direction", "East")
    
                var image = document.createElement("img")
                image.setAttribute("src", droneEast)
                image.setAttribute("alt", "A super scary drone")
                image.setAttribute("class", "drone-img")
                newTile.appendChild(image)
            }
        else if (direction == "South" && y - 1 >= 0) 
            {
                console.log(tile)
                console.log("Direction: " + direction)
                tile.classList.remove("drone")
                var existingImage = tile.querySelector("img")
                tile.removeChild(existingImage)
    
                var newTile =  document.querySelector(`[x="${x}"][y="${y-1}"]`)
                newTile.innerText = null
                newTile.classList.add("drone")
                newTile.setAttribute("direction", "South")
                
                var image = document.createElement("img")
                image.setAttribute("src", droneSouth)
                image.setAttribute("alt", "A super scary drone")
                image.setAttribute("class", "drone-img")
                newTile.appendChild(image)
            }
        else if (direction == "West" && x - 1 >= 0) 
            {
                console.log(tile)
                console.log("Direction: " + direction)
                tile.classList.remove("drone")
                var existingImage = tile.querySelector("img")
                tile.removeChild(existingImage)
    
                var newTile =  document.querySelector(`[x="${x-1}"][y="${y}"]`)
                newTile.innerText = null
                newTile.classList.add("drone")
                newTile.setAttribute("direction", "West")
    
                var image = document.createElement("img")
                image.setAttribute("src", droneWest)
                image.setAttribute("alt", "A super scary drone")
                image.setAttribute("class", "drone-img")
                newTile.appendChild(image)
            }
    
    }
    
    
    // give the impression of rotation about a axis
    function rotateDrone(tile, event) 
    {
        var direction = tile.getAttribute("direction")
        var y = parseInt(tile.getAttribute("y"),10)
        var x = parseInt(tile.getAttribute("x"),10) 
    
        if (direction == "North" && event.key == "ArrowLeft") 
            {
                // change img src and uodate direction
                var currentImg = tile.querySelector("img")
                currentImg.setAttribute("src", droneWest)
    
                tile.setAttribute("direction", "West")
            }
        else if (direction == "West" && event.key  == "ArrowLeft") 
            {
                // change img src
                var currentImg = tile.querySelector("img")
                currentImg.setAttribute("src", droneSouth)
    
                tile.setAttribute("direction", "South")
            }
        else if (direction == "South" && event.key  == "ArrowLeft") 
            {
                // change img src
                var currentImg = tile.querySelector("img")
                currentImg.setAttribute("src", droneEast)
    
                tile.setAttribute("direction", "East")
            }
        else if (direction == "East" && event.key  == "ArrowLeft") 
            {
                // change img src
                var currentImg = tile.querySelector("img")
                currentImg.setAttribute("src", droneNorth)
    
                tile.setAttribute("direction", "North")
            }
    
        if (direction == "North" && event.key == "ArrowRight") 
            {
                // change img src and uodate direction
                var currentImg = tile.querySelector("img")
                currentImg.setAttribute("src", droneEast)
    
                tile.setAttribute("direction", "East")
            }
        else if (direction == "West" && event.key  == "ArrowRight") 
            {
                // change img src
                var currentImg = tile.querySelector("img")
                currentImg.setAttribute("src", droneNorth)
    
                tile.setAttribute("direction", "North")
            }
        else if (direction == "South" && event.key  == "ArrowRight") 
            {
                // change img src
                var currentImg = tile.querySelector("img")
                currentImg.setAttribute("src", droneWest)
    
                tile.setAttribute("direction", "West")
            }
        else if (direction == "East" && event.key  == "ArrowRight") 
            {
                // change img src
                var currentImg = tile.querySelector("img")
                currentImg.setAttribute("src", droneSouth)
    
                tile.setAttribute("direction", "South")
            }
            
    }
    
    // shoot a projectile 2 tiles ahead
    function droneStrike() 
    {
        var drone = document.querySelector(".drone")
    
        var X = parseInt(drone.getAttribute("x"),10)
        var Y = parseInt(drone.getAttribute("y"),10)
        var Direction = drone.getAttribute("direction")
    
        if (Direction == "North" && Y+2 <= 9) // fire upwards 
            {
                console.log(drone)
    
                // create projectile
                var projectile = document.createElement("div")
                projectile.setAttribute("class", "projectileNorth")
            
                // affect forward tile
                var firstTile =  document.querySelector(`[x="${X}"][y="${Y+1}"]`)
                firstTile.innerText = null
                firstTile.classList.add("projectile-containerNorth")
                firstTile.appendChild(projectile)
            
    
                // destroy second tile
                setTimeout(()=> 
                    {
                        var secondTile = document.querySelector(`[x="${X}"][y="${Y+2}"]`)
                        secondTile.innerText = null
                        secondTile.classList.add("tileDestroyed")
    
                        // clean tiles 
                        firstTile.removeChild(projectile)
                        firstTile.classList.remove("projectile-containerNorth")
                    }, 1500)
            }
        else if (Direction == "South" && Y-2 >= 0) // fire downards 
            {
                console.log(drone)
    
                // create projectile
                var projectile = document.createElement("div")
                projectile.setAttribute("class", "projectileSouth")
            
                // affect forward tile
                var firstTile =  document.querySelector(`[x="${X}"][y="${Y-1}"]`)
                firstTile.innerText = null
                firstTile.classList.add("projectile-containerSouth")
                firstTile.appendChild(projectile)
            
    
                // destroy second tile
                setTimeout(()=> 
                    {
                        var secondTile = document.querySelector(`[x="${X}"][y="${Y-2}"]`)
                        secondTile.innerText = null
                        secondTile.classList.add("tileDestroyed")
    
                        // clean tiles 
                        firstTile.removeChild(projectile)
                        firstTile.classList.remove("projectile-containerSouth")
                    }, 1500)
            }
        else if (Direction == "West" && X - 2 >= 0) 
            {
                console.log(drone)
    
                // create projectile
                var projectile = document.createElement("div")
                projectile.setAttribute("class", "projectileWest")
            
                // affect forward tile
                var firstTile =  document.querySelector(`[x="${X-1}"][y="${Y}"]`)
                firstTile.innerText = null
                firstTile.classList.add("projectile-containerWest")
                firstTile.appendChild(projectile)
            
    
                // destroy second tile
                setTimeout(()=> 
                    {
                        var secondTile = document.querySelector(`[x="${X-2}"][y="${Y}"]`)
                        secondTile.innerText = null
                        secondTile.classList.add("tileDestroyed")
    
                        // clean tiles 
                        firstTile.removeChild(projectile)
                        firstTile.classList.remove("projectile-containerWest")
                    }, 1500)
            }
        else if (Direction == "East" && X + 2 <= 9) 
            {
                console.log(drone)
    
                // create projectile
                var projectile = document.createElement("div")
                projectile.setAttribute("class", "projectileEast")
            
                // affect forward tile
                var firstTile =  document.querySelector(`[x="${X+1}"][y="${Y}"]`)
                firstTile.innerText = null
                firstTile.classList.add("projectile-containerEast")
                firstTile.appendChild(projectile)
            
    
                // destroy second tile
                setTimeout(()=> 
                    {
                        var secondTile = document.querySelector(`[x="${X+2}"][y="${Y}"]`)
                        secondTile.innerText = null
                        secondTile.classList.add("tileDestroyed")
    
                        // clean tiles 
                        firstTile.removeChild(projectile)
                        firstTile.classList.remove("projectile-containerEast")
                    }, 1500)
            }
    }
    
    // report drone details 
    function reportPosition() 
    {
        var drone = document.querySelector(".drone")
        var x = drone.getAttribute("x")
        var y = drone.getAttribute("y")
        var direction = drone.getAttribute("direction")
    
        alert(`Your drone's current location is: (${x},${y}) \nYour drone is facing ${direction}`)
    }
            
    })