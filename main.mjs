import Cell from "./cell.mjs";
import Sound from "./sound.mjs";
import util from "./util.mjs";

function Game(canvasID = "jesus") {
    this.canvas    = document.getElementById(canvasID);
    this.context   = this.canvas.getContext("2d");
    this.timer     = null;
    this.time      = 0;
    this.rows      = 20;
    this.cols      = 20;
    this.cellWidth = 28;
    this.bombsLocation = [];
    this.shownCells    = 0;
    this.grid          = [];
    this.assets        = {}; 
    this.resizeCanvas();
    this.generateGrid();
    this.clickEvent();
}

//-------------------------------------------------------------------------------------------------

Game.prototype.resizeCanvas = function() {
    this.canvas.width  = this.cols * this.cellWidth;
    this.canvas.height = this.rows * this.cellWidth + 50;
    this.canvas.style.border = "1px solid";
};

//-------------------------------------------------------------------------------------------------

Game.prototype.clickEvent = function() {
    function getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    this.canvas.onclick = ((event) => {
        let mousePos = getMousePos(this.canvas, event);
        console.log(mousePos);
        if(mousePos.y < this.rows * this.cellWidth) {
            let clickedCell = this.getCellFromCoor(mousePos.x , mousePos.y);
            if(!clickedCell.shown) this.processClickedCell(clickedCell);                
        }
    });
};

//-------------------------------------------------------------------------------------------------

Game.prototype.getCellFromCoor = function(x , y) {
    let row = Math.floor(x / this.cellWidth);
    let col = Math.floor(y / this.cellWidth);
    let index = this.cols * col + row;    
    return this.grid[index];
};

//-------------------------------------------------------------------------------------------------

Game.prototype.generateGrid = function() {
    for(let i = 0;i < this.rows;i++) {
        for(let j = 0;j < this.cols;j++) {
            let x = j * this.cellWidth , y = i * this.cellWidth;
            let newCell = new Cell(this.canvas , x , y , this.cellWidth);
            if(util.generateRandomNumber(0 , 300) < 50) {
                newCell.value = -1;
                this.bombsLocation.push(newCell);
            }
            this.grid.push(newCell);
        }
    }
    this.countBombsSides(this.grid);
};

//-------------------------------------------------------------------------------------------------

Game.prototype.getSides = function(x , y) {
    let indices = [
        {x : x - this.cellWidth , y : y} ,
        {x : x + this.cellWidth , y : y} ,
        {x : x , y : y - this.cellWidth} ,
        {x : x , y : y + this.cellWidth} ,
        {x : x - this.cellWidth, y : y - this.cellWidth} ,
        {x : x + this.cellWidth, y : y - this.cellWidth} ,
        {x : x - this.cellWidth, y : y + this.cellWidth} ,
        {x : x + this.cellWidth, y : y + this.cellWidth} ,
    ];
    indices = indices.filter((item) => {
        if(item.x < 0 || item.x >= this.cols * this.cellWidth) return false;
        if(item.y < 0 || item.y >= this.rows * this.cellWidth) return false;
        return true;
    });
    let cells = [];
    indices.forEach((item) => {
        cells.push(this.getCellFromCoor(item.x , item.y));
    });
    return cells;

};

//-------------------------------------------------------------------------------------------------

Game.prototype.countBombsSides = function() {
    this.bombsLocation.forEach((bomb) => {
        this.getSides(bomb.x , bomb.y).forEach((cell) => {
            if(cell.value !== -1) cell.value++;
        });
    });

};

//-------------------------------------------------------------------------------------------------

Game.prototype.floodFill = function(cell) {
    this.shownCells++;
    cell.shown = true;
    let adjs   = this.getSides(cell.x , cell.y);
    adjs.forEach((adjCell) => {
        if(!adjCell.shown) {
            adjCell.shown = true;
            if(adjCell.value === 0) this.floodFill(adjCell);
            else this.shownCells++;
        }
    });
};

//-------------------------------------------------------------------------------------------------

Game.prototype.processClickedCell = function(cell) {
    if(cell.value === -1) {
        this.shownCells++;
        this.showAllGrid();
    } else if(cell.value === 0) {
        this.floodFill(cell);
    } else {
        this.shownCells++;
        cell.shown = true;
    }
};

//-------------------------------------------------------------------------------------------------

Game.prototype.showAllGrid = function() {
    this.grid.forEach((cell) => {
        cell.shown = true;
    });
};

//-------------------------------------------------------------------------------------------------

Game.prototype.drawFrame = function() {
    this.grid.forEach((cell) => {
        cell.draw();
    });
    this.showGameInfo();
};

//-------------------------------------------------------------------------------------------------

Game.prototype.clearFrame = function() {
    this.context.clearRect(0 , 0 , this.canvas.width , this.canvas.height);
};

//-------------------------------------------------------------------------------------------------

Game.prototype.showGameInfo = function() {
    this.context.font = "10px atari1Font";
    this.context.fillStyle = "#000";
    this.context.fillText(`Time : ${util.toTime(this.time)}` , 10 , this.canvas.height - 20);
    let text = `Bombs : ${this.shownCells} ${this.bombsLocation.length} ${this.rows * this.cols}`;
    this.context.fillText(text , this.canvas.width - this.context.measureText(text).width - 10 , this.canvas.height - 20);
};

//-------------------------------------------------------------------------------------------------

Game.prototype.checkGameEnds = function() {
    if(this.rows * this.cols - this.shownCells === this.bombsLocation.length) {
        console.log("won");
    }
};

//-------------------------------------------------------------------------------------------------

Game.prototype.begin = function() {    
    this.timer = setInterval(() => {
        this.clearFrame();
        this.drawFrame();
        this.time += 40;
    } , 40);
};

//-------------------------------------------------------------------------------------------------


util.loadAssets().then((results) => {
    let game = new Game();
    results.forEach(({label , name , dom}) => {
        if(label === "image") {
            game.assets[name] = dom;
        }
        if(label === "sound") {
            game.assets[name] = new Sound(dom);
        }
        if(label === "font") {
            document.fonts.add(dom);
        }
    });
    game.begin();    

} , (results) => {
    console.error(results);
});