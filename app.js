const canvas = document.querySelector('#paintCanvas'),
    context = canvas.getContext('2d');
const colorBtnAll = document.querySelector('#controlColors'),
    menuBtnAll = document.querySelector('#menuButtons'),
    range = document.querySelector('.controlRange');
let moveX = '';
let moveY = '';
let paintColor = '';
let startDraw = false;
let getRange = '2.5';
let ETid = '';
context.fillStyle='white';

function colorHandler(event) {
    const ET = event.target;
    paintColor = ET.style.backgroundColor;
}
function draw() {
    if (!startDraw) {
        context.beginPath();
        context.moveTo(moveX, moveY);
    } else {
        context.lineTo(moveX, moveY);
        context.strokeStyle = paintColor;
        context.lineWidth = getRange;
        context.stroke();
    }
}
function fill() {
    context.beginPath();
    context.fillStyle = paintColor;
    context.fillRect(0, 0, canvas.width, canvas.height)
}
function menuHandler(event) {
    const ET = event.target;
    ETid = ET.id;
    if(ETid==='save'){
        const image = canvas.toDataURL();
        const link = document.createElement('a');
        link.href=image;
        link.download='paint';
        link.click();
    }
}
function m_downHandler(event) {
    startDraw = true;
    if (ETid === 'fill') {
        fill();
    }
}
function m_moveHandler(event) {
    moveX = event.offsetX;
    moveY = event.offsetY;
    if (ETid === 'draw') {
        draw();
    }
}
function stopPainting() {
    startDraw = false;
}
function changeHandler(event) {
    getRange = event.target.value;
}
function rightClickHandler(event){
    event.preventDefault();
}
if (canvas) {
    canvas.addEventListener('mousemove', m_moveHandler);
    canvas.addEventListener('mousedown', m_downHandler);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('contextmenu',rightClickHandler);
    menuBtnAll.addEventListener('click', menuHandler);
    colorBtnAll.addEventListener('click', colorHandler);
    range.addEventListener('change', changeHandler)
}

