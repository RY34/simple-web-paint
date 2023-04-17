let currentColor = "rgb(0, 0, 0)"

function changeCurrentColor(newColor) {

    currentColor = newColor
}

function draw(canvas) {

    c = canvas.getContext("2d");
    c.beginPath()
    c.fillStyle = currentColor;

    function drawRect() {
        cursorPosX = event.clientX;
        cursorPosY = event.clientY;
        c.fillRect(cursorPosX-51, cursorPosY, 10, 10);
    }
    drawRect();

    canvas.addEventListener("mousemove", drawRect);
    canvas.addEventListener("touchmove", drawRect);
    canvas.addEventListener("mouseup", function() {canvas.removeEventListener("mousemove", drawRect)});
    canvas.addEventListener("touchend", function() {canvas.removeEventListener("touchmove", drawRect)});
}

function prepareApp(parent) {

    canvas = document.createElement("canvas");
    canvas.style.border = "1px solid black";
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "51px";
    canvas.setAttribute("height", "362px");
    canvas.setAttribute("width", "643px");
    canvas.addEventListener("mousedown", function() {
        draw(this)
    });
    canvas.addEventListener("touchstart", function() {
        draw(this)
    });
    parent.append(canvas);
    
    colorPal = document.createElement("div");
    colors = ["#ff0000", "#ffff00", "#00ff00", "#0fffff" , "#0000ff", "#000000", "#ffffff"]
    for(let i in colors) {
        c = document.createElement("div");
        c.style.height = "50px";
        c.style.width = "50px";
        c.style.backgroundColor = colors[i];
        c.style.border = "1px solid black"
        c.addEventListener("click", function() {
            changeCurrentColor(this.style.backgroundColor)
        });
        colorPal.append(c);
    }
    parent.append(colorPal)
}


document.addEventListener("DOMContentLoaded", function() {

    const app = document.querySelector("#app");
    
    prepareApp(app);
});
