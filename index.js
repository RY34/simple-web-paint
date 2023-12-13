let currentColor = "rgb(0, 0, 0)";
let size = 4;
let bgColor = "rgba(255, 255, 255, 255)";
let cursorPosX, cursorPosY, prevX, prevY;
const version = "0.0.3"

function saveImg(canvas, download) {

    const img = canvas.toDataURL('image/png');
    download.setAttribute("href", img);
    download.click()
}

function getCord(e) {

    prevX = cursorPosX;
    prevY = cursorPosY;
    cursorPosX = e.clientX-canvas.offsetLeft;
    cursorPosY = e.clientY-canvas.offsetTop;
    console.log(cursorPosX);
}

function changeCurrentColor(newColor) {

    currentColor = newColor;
}

function draw(c, e) {

    getCord(e);
    c.fillStyle = currentColor;
    c.strokeStyle = currentColor;
    c.lineWidth = size;
    c.lineCap = "round";
    canvas.style.touchAction = "none";
    function drawRect(c, e) {
        
        getCord(e)
        c.beginPath();
        c.moveTo(prevX, prevY);
        c.lineTo(cursorPosX, cursorPosY);
        c.stroke();
    }
    drawRect(c, e);

    function eventHandler(event) {
        drawRect(c, event);
    }

    canvas.addEventListener("pointermove", eventHandler);
    canvas.addEventListener("pointerup", function() {canvas.removeEventListener("pointermove", eventHandler)});
}

function prepareApp(parent) {

    canvas = document.createElement("canvas");
    canvas.style.border = "1px solid black";
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "51px";
    canvas.setAttribute("height", "362px");
    canvas.setAttribute("width", "643px");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0, canvas.width, canvas.height)
    canvas.addEventListener("pointerdown", (event) => {
        draw(ctx, event)
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
    customColor.setAttribute("type", "color");
    customColor.setAttribute("name", "brush")
    let customColorLabel = document.createElement("label");
    customColorLabel.setAttribute("for", "brush");
    customColorLabel.innerText = "<< Choose brush color!"
    customColor.addEventListener("change", function() {
        changeCurrentColor(customColor.value)
    });
    colorPal.append(customColor);
    colorPal.append(customColorLabel);

    parent.append(colorPal);

    changeSize = document.createElement("input")
    changeSize.setAttribute("placeholder", "Size")
    changeSize.addEventListener("keypress", e => {
        if(e.key === 'Enter') {
            if(changeSize.value!="")
                size = changeSize.value;
                changeSize.value = "";
        }});
    parent.append(changeSize);

    let saveBtn = document.createElement("button");
    saveBtn.innerText = "Save"
    let downloadBtn = document.createElement("a");
    downloadBtn.setAttribute("download", "image");
    downloadBtn.innerText = "Download";
    saveBtn.addEventListener("click", function(){saveImg(canvas, downloadBtn)});
    parent.append(saveBtn);

    let changeBgColor = document.createElement("input");
    changeBgColor.setAttribute("type", "color");
    changeBgColor.setAttribute("name", " bg");
    let changeBgColorLabel = document.createElement("label");
    changeBgColorLabel.setAttribute("for", "bg");
    changeBgColorLabel.innerText = "<< Choose background color!"
    changeBgColor.addEventListener("change", function() {
        bgColor = changeBgColor.value;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0,0, canvas.width, canvas.height);
    });
    parent.append(changeBgColor);
    parent.append(changeBgColorLabel);
}

document.addEventListener("DOMContentLoaded", function() {

    const app = document.querySelector("#app");
    prepareApp(app);
});
