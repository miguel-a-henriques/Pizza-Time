class ExtraPoint {
    constructor(gameScreen){
        this.gameScreen = gameScreen;

        // Random Position
        this.top = Math.floor(Math.random() * (100 - 100) + 100);     // <----- alterar valores

        this.left = 850;
        this.width = 100;
        this.height = 100;

        // Create the HTML element and create default styling
        this.element = document.createElement("img");
        this.element.src = "./images/pizza-extra-point.png";   //    
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element);
    }

    move(){
        // Move obstacle down
        this.left -= 3;    
        this.updatePosition();
    }

    updatePosition(){
        this.element.style.left =`${this.left}px`;
        this.element.style.top=`${this.top}px`;
    }
}