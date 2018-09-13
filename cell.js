/*class Cell {

  constructor(i, j, w){

  }

  show(){

  }

  reveal(){

  }

}*/


function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i*w;
  this.y = j*w;
  this.w = w;
  this.neighborCount;

  this.bomb = false;
  this.revealed = false;
}

Cell.prototype.show = function () {
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if(!this.revealed){
    return;
  }

  if (this.bomb){
    return ellipse(this.x+this.w*0.5, this.y+this.w*0.5, this.w * 0.5);
  }

  fill(150);
  rect(this.x, this.y, this.w, this.w);
  if(this.neighborCount > 0){
    textAlign(CENTER);
    fill(0);
    text(this.neighborCount, this.x+this.w * 0.5, this.y + this.w -6);
  }
}

Cell.prototype.countBombs = function () {
  if(this.bomb){
    return -1;
  }
  var total = 0;
  for(var xoff = -1; xoff <= 1; xoff++){
      for(var yoff = -1; yoff <= 1; yoff++){
        var i = this.i + xoff;
        var j = this.j + yoff;
        if(i > -1 && i <cols && j > -1 && j < rows){
        var neighbor = grid[i][j];
        if (neighbor.bomb){
          total++;
      }
    }
  }
  }

  this.neighborCount = total;
}



Cell.prototype.contains = function (x, y) {
  return(x > this.x && x <this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function (x, y) {
this.revealed = true;
if(this.neighborCount == 0){
  this.floodfill();
}
}
Cell.prototype.floodfill = function () {
  for(var xoff = -1; xoff <= 1; xoff++){
      for(var yoff = -1; yoff <= 1; yoff++){
        var i = this.i + xoff;
        var j = this.j + yoff;
        if(i > -1 && i <cols && j > -1 && j < rows){
          var neighbor = grid[i][j];
          if (!neighbor.bomb && !neighbor.revealed){
            neighbor.reveal();
          }
        }
      }
    }
}
