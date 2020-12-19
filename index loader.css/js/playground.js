class Playground {
    
  // Initialiser le plateau de jeu :
  constructor(width, height){
      this.tabPlayground = [];
      for(var i=0; i<width; i++) {
          this.tabPlayground[i] = [];
          for(var j=0; j<height; j++) {
              this.tabPlayground[i][j] = undefined;
          }
      }
  }

  // Placer le joueur player dans le plateau de jeu :
  placePlayerInTab(player){
      this.tabPlayground[player.position.x][player.position.y] = {player:player.name, color:player.color};
  }

  // Dessiner le plateau de jeu dans le canvas :
  drawTab(){
      for (let i in this.tabPlayground){
          for (let j in this.tabPlayground[i]){
          
              if (this.tabPlayground[i][j] != undefined){
                  this.drawSquare(i, j, this.tabPlayground[i][j].color);
                  
              }
          }
  
      }
  }

  // Dessiner un carré du plateau de jeu :
  drawSquare(i, j, color){
      noStroke(); // Enlever les contours du carré
      fill(color); // Remplir le carré avec la couleur color
      rect(i, j, PIX, PIX); // Dessiner le carré
  }

  
}