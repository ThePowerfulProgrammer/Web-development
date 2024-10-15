document.addEventListener("DOMContentLoaded", () => {

    var rows = 100;

    const surface = document.querySelector(".surface"); // grab div surface

    // populate surface
    for (let i=0;i<rows;i++) 
        {
            var col = document.createElement("img");
            col.setAttribute("src", "images/bubba.png");
            surface.appendChild(col);
        }

})