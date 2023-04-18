let currentColor = "rgb(0, 0, 0)";
let currentColorIndicator = document.createElement("div");
let size = 4;
let cursorPosX, cursorPosY, prevX, prevY;;
const version = "0.0.2"

function getCord() {

    prevX = cursorPosX;
    prevY = cursorPosY;
    cursorPosX = event.clientX-canvas.offsetLeft;
    cursorPosY = event.clientY-canvas.offsetTop;
}

function changeCurrentColor(newColor) {

    currentColor = newColor;
    currentColorIndicator.style.backgroundColor = currentColor;
}

function draw(canvas) {

    getCord();
    c = canvas.getContext("2d");
    c.fillStyle = currentColor;
    c.strokeStyle = currentColor;
    c.lineWidth = size;
    c.lineCap = "round";
    c.canvas.style.touchAction = "none";

    function drawRect() {
        
        getCord()
        c.beginPath();
        c.moveTo(prevX, prevY);
        c.lineTo(cursorPosX, cursorPosY);
        c.stroke();
    }
    drawRect();

    canvas.addEventListener("mousemove", drawRect);
    canvas.addEventListener("mouseup", function() {canvas.removeEventListener("mousemove", drawRect)});
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
    let customColor = document.createElement("input");
    customColor.setAttribute("placeholder", "#000000");
    customColor.addEventListener("keypress", e => {
        if(e.key === 'Enter') {
            if(customColor.value!="")
                changeCurrentColor(customColor.value);
        }});
    colorPal.append(customColor);

    parent.append(colorPal);

    currentColorIndicator.style.border = "1px solid black";
    currentColorIndicator.style.backgroundColor = currentColor;
    currentColorIndicator.style.width = "50px";
    currentColorIndicator.style.height = "50px";

    parent.append(currentColorIndicator);

    changeSize = document.createElement("input")
    changeSize.setAttribute("placeholder", "Size")
    changeSize.addEventListener("keypress", e => {
        if(e.key === 'Enter') {
            if(changeSize.value!="")
                size = changeSize.value;
        }});
    parent.append(changeSize);
}

document.addEventListener("DOMContentLoaded", function() {

    const app = document.querySelector("#app");
    
    prepareApp(app);
});
