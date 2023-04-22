const grid = document.querySelector("#grid-container");
const eraserButton = document.querySelector("#erase-button");
const rainbowButton = document.querySelector("#rainbow-button");
const gridButton = document.querySelector("#grid-button");
const clear = document.querySelector("#clear");
const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');
const colorValue = document.getElementById('changeColor');

let sz = 16;
let defaultColor = 'black';
let eraser = false;
let rainbow = false;
let gridd = false; 

function removeGrid() {
    while(grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    eraser = false;
    rainbow = false;
    gridd = false;
    eraserButton.classList.remove('button-on');
    rainbowButton.classList.remove('button-on');
    gridButton.classList.remove('button-on');

}

function createGrid(x, y) {
    removeGrid();
    grid.style.gridTemplateColumns = (`repeat(${x}, 1fr`);
    grid.style.gridTemplateRows = (`repeat(${y}, 1fr`);
    for(let i = 0; i<x * y; i++) {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.style = 'background-color: rgba(255, 255, 255, 1)';
      grid.appendChild(cell);
    }
    listen();
}


function drawClick(e) {
    if (eraser) {
        e.target.style.backgroundColor = 'white';
    } 
    else if (rainbow) {
        e.target.style.backgroundColor = randomColor();
    }
    else {
        e.target.style.backgroundColor = defaultColor;
    }
}

function drawClickHover(e) {
    if (e.buttons == 1) {
        if (eraser) {
            e.target.style.backgroundColor = 'white';
        } 
        else if (rainbow) {
            e.target.style.backgroundColor = randomColor();
        }
        else {
            e.target.style.backgroundColor = defaultColor;
        }
    }
}

function listen() {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mousedown', drawClick);
        cells[i].addEventListener('mouseenter', drawClickHover);
    }
}

function randomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}


eraserButton.addEventListener('click', () => {
    if (eraser) {
        eraser = false;
        eraserButton.classList.remove('button-on');
    }
    else {
        eraser = true;
        eraserButton.classList.add('button-on');
        rainbow = false;
        rainbowButton.classList.remove('button-on');
    }
})

rainbowButton.addEventListener('click', () => {
    if (rainbow) {
        rainbow = false;
        rainbowButton.classList.remove('button-on');
    } else {
        rainbow = true;
        rainbowButton.classList.add('button-on');
        eraser = false;
        eraserButton.classList.remove('button-on');
    }
})

gridButton.addEventListener('click', () => {
    if (gridd) {
        gridd = false;
        gridButton.classList.remove('button-on');
        let cells = document.querySelectorAll('.cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.border = '1px rgba(0, 0, 0, 0.104) solid';
        }
    } else {
        gridd = true;
        gridButton.classList.add('button-on');
        let cells = document.querySelectorAll('.cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.border = cells[i].style.backgroundColor;
        }
    }
})

clear.addEventListener('click', () => {
    createGrid(sz, sz);
});


createGrid(sz, sz);


sizeSlider.addEventListener('mousemove', (e) => {
    let v = e.target.value;
    sizeValue.innerHTML = `${v} x ${v}`;
});

sizeSlider.addEventListener('input', (e) => {
    sz = e.target.value;
    console.log(sz);
    createGrid(sz, sz);
});

colorValue.addEventListener('input', (e) => {
    defaultColor = e.target.value;
})