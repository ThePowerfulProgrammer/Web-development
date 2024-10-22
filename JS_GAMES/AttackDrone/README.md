# Personal Details
**Name:** Ashish Ramnath

# Project Title: Drone Destruction

# Project Description
A web-based game simulating a user controlling a drone on a grid.

## 1) What the application does:
- The app allows a user upon first appearance to place a drone on a grid, facing an input direction. This action is either achieved by:
  - Clicking on a tile using a mouse and following the prompts.
  - Using a finger on a touchscreen display and following the prompts.
  
- The movement of the drone on non-touch screen displays is managed via the (LeftArrow, UpArrow, RightArrow):
  - The UpArrow moves the drone one unit forward in the current direction.
  - The LeftArrow rotates the drone 90 degrees left about an axis.
  - The RightArrow rotates the drone 90 degrees right about an axis.
  
- A player can click on any tile that is currently not displaying a drone to reposition the drone.
- Upon clicking on a tile with a drone, a player can follow the prompts to:
  - **Report:** Displays the drone's current location and direction.
  - **Reposition:** Allows a player to rotate the drone at its current location.
  - **Attack:** Fires a projectile 2 tiles ahead.

- If a user is on a touchscreen display:
  - The actions of the (LeftArrow, UpArrow, RightArrow) are not valid.
  - A user can place and move a drone by clicking on any tile via touch input.

## 2) Technologies used:
- **HTML:** The standard format for displaying web pages.
- **CSS:** To style the game.
- **JavaScript:** To provide the functionality of the game.

## 3) Challenges:
- **Displaying the drone:** When the game is run locally with direct access to the images folder, handling the display of the drone is easy. However, if the images are served from GitHub, the initial display is slower until the browser caches the individual images.
  
- **Creating the projectile for the attack:** While creating the impression that a tile 2 units forward is destroyed is straightforward, animating the projectile's movement is much more challenging.
  
- **Accounting for player variance:** The game accommodates various input methods (mouse, touch, keyboard). Some players may not enjoy the variability in input methods.

## How to Install and Run the Project:
1. Navigate to this URL and download the zip folder.
2. Unzip the folder in any location. The unzipped folder contains:
   - `index.html`
   - `style.css`
   - `appV1.js` (references images in the images folder)
   - `appV2.js` (references images from my GitHub)
   - Do not alter the files or folders.
3. You can open `index.html` in any way you want, and the game will start.
   - If you are on PC, use your mouse to click on any tile to begin.
   - If you are on mobile, do the same via touch input.

## Access the online game here: [CodePen link](<insert_your_codepen_link_here>)
