document.querySelector('#draw-text').addEventListener('click', () => {
    drawText();
})

document.addEventListener('DOMContentLoaded', () => {
    drawText();
    drawGrSquare();
    drawGrCircle();
})

function drawText() {
    var el = document.getElementById('text');
    var ctx = el.getContext('2d');
    ctx.clearRect(0, 0, el.width, el.height);
    ctx.font = '60px serif';
    var gradient = ctx.createLinearGradient(0, 0, el.width, 0);
    gradient.addColorStop("0","#0055d4");
    gradient.addColorStop("0.5", "#00aa7f");
    gradient.addColorStop("1.0", "#00d455");
    ctx.fillStyle = gradient;
    ctx.fillText(document.getElementById('title-text').value, 0, 100);
}

function drawGrSquare() {
    var ctx = document.getElementById('gr-square').getContext('2d');
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        ctx.fillStyle = 'rgb(0,' + Math.floor(255-42.5*i) + ',' +
                         Math.floor(255-42.5*j) + ')';
        ctx.fillRect(j*50, i*50, 50, 50);
      }
    }
}

function drawGrCircle() {
    var ctx = document.getElementById('gr-circle').getContext('2d');
    for (var i=0; i < 6; i++){
      for (var j=0; j < 6; j++){
        ctx.strokeStyle = 'rgb(0,' + Math.floor(255-42.5*i) + ',' +
                         Math.floor(255-42.5*j) + ')';
        ctx.beginPath();
        ctx.arc(25+j*50, 25+i*50, 20, 0, Math.PI*2, true);
        ctx.stroke();
      }
    }
}


var img = new Image();
img.src = 'https://cdn.pixabay.com/photo/2017/03/06/11/58/space-2121282_1280.jpg';
var CanvasXSize = 1000;
var CanvasYSize = 400;
var speed = 30; //lower is faster
var scale = 1.05;
var y = -4.5; //vertical offset

var dx = 0.75;
var imgW;
var imgH;
var x = 0;
var clearX;
var clearY;
var ctx1;

img.onload = function() {
    imgW = img.width*scale;
    imgH = img.height*scale;
    if (imgW > CanvasXSize) { x = CanvasXSize-imgW; }
    if (imgW > CanvasXSize) { clearX = imgW; }
    else { clearX = CanvasXSize; }
    if (imgH > CanvasYSize) { clearY = imgH; }
    else { clearY = CanvasYSize; }
    ctx1 = document.getElementById('canv-image').getContext('2d');
    return setInterval(drawImage, speed);
}

function drawImage() {
    //Clear Canvas
    ctx1.clearRect(0,0,clearX,clearY);
    //If image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = 0; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { ctx1.drawImage(img,x-CanvasXSize+1,y,imgW,imgH); }
    }
    //If image is > Canvas Size
    else {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = CanvasXSize-imgW; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { ctx1.drawImage(img,x-imgW+1,y,imgW,imgH); }
    }
    //draw image
    ctx1.drawImage(img,x,y,imgW,imgH);
    //amount to move
    x += dx;
}


var sun = new Image();
var moon = new Image();
var earth = new Image();
function initPlanets(){
    sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
    moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
    earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
    window.requestAnimationFrame(drawSun);
}

function drawSun() {
    var ctx = document.getElementById('planets').getContext('2d');

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0,0,300,300); // clear canvas

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
    ctx.save();
    ctx.translate(150,150);

    // Earth
    var time = new Date();
    ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
    ctx.translate(105,0);
    ctx.fillRect(0,-12,50,24); // Shadow
    ctx.drawImage(earth,-12,-12);

    // Moon
    ctx.save();
    ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
    ctx.translate(0,28.5);
    ctx.drawImage(moon,-3.5,-3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
    ctx.stroke();

    ctx.drawImage(sun,0,0,300,300);

    window.requestAnimationFrame(drawSun);
}
initPlanets();