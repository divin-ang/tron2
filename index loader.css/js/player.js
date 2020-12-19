class Player {
    constructor(name, x, y, direction, color){
        this.name = name;
        this.position = {x:x, y:y}
        this.direction = direction;
        this.color = color;
    }

    getX(){
        return this.position.x;
    }

    getY(){
        return this.position.y;
    }

    getDirection(){
        return this.direction;
    }


    setDirection(direction){
        this.direction = direction;
    }

    changeDirection(direction){
        switch (this.getDirection()){
            case "left":
            case "right":
                if ((direction == "up") || (direction == "down")) this.setDirection(direction);break;
            
            case "down":
            case "up":
                if ((direction == "right") || (direction == "left")) this.setDirection(direction);break;
        }
        return;
    }


    play(tabPlayground){
        switch (this.direction){
            case "left":
                this.position = ({x:this.getX()-1, y:this.getY()});break;
            case "right":
                this.position = ({x:this.getX()+1, y:this.getY()});break;
            case "up":
                this.position = ({x:this.getX(), y:this.getY()-1});break;
            case "down":
                this.position = ({x:this.getX(), y:this.getY()+1});break;
        }
        tabPlayground.placePlayerInTab(this);
    }


    // ---------------------------------
    update(player){
        this.position = player.position;
        this.direction = player.direction;
    }

}