export default function Cell(canvas , x , y , width) {
    this.canvas  = canvas;
    this.context = this.canvas.getContext("2d");
    this.x       = x;
    this.y       = y;
    this.width   = width;
    this.value   = 0;
    this.shown   = false; 
    this.bomb    = "\u{1F311}";
}

Cell.prototype.draw = function() {
    this.context.lineWidth = 0.3;
    this.context.font = "12px atari2Font";
    if(!this.shown) {
        this.context.fillStyle = "#f2e4e4";
        this.context.fillRect(this.x , this.y , this.width , this.width);
        this.context.strokeRect(this.x , this.y , this.width , this.width);
    } else {
        let dotX = Math.floor((this.width - 13) / 2 + this.x);
        let dotY = Math.floor((this.width + 13) / 2 + this.y);
        if(this.value === -1) {
            this.context.fillStyle = "#bdabaa";
            this.context.fillRect(this.x , this.y , this.width , this.width);
            this.context.strokeRect(this.x , this.y , this.width , this.width);
            this.context.fillText(this.bomb , dotX , dotY);
        } else {
            this.context.fillStyle = "#e6ccbe";
            this.context.fillRect(this.x , this.y , this.width , this.width);
            this.context.strokeRect(this.x , this.y , this.width , this.width);
            this.context.fillStyle = "#000";
            if(this.value !== 0) this.context.fillText(this.value , dotX , dotY);
        }
    }
};





