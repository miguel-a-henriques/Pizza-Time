class Player {
    constructor(gameScreen, left, top, width, height, imgSrc){
        // gameScreen HTML element
        this.gameScreen = gameScreen;

        // Position values
        this.left = left;
        this.top = top;

        // Player Dimension Values
        this.width = width;
        this.height = height;

        this.element = document.createElement("img");
        this.element.src = imgSrc;
        this.element.style.position = "absolute";


        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element);

        this.directionX = 0;
        this.directionY = 0;

        this.gravity = 0.6;
        this.jumpStrength = 4;
        this.isJumping = false;
        this.jumpStartTime = 0;
        this.jumpCount = 0;
        this.maxJumps = 2;
    }

    move() {
        this.left += this.directionX;
        this.top += this.directionY;


        // Handle the right side of the screen; the car stops at the right border
        if(this.left + this.width > this.gameScreen.offsetWidth){ // offsetWidth is width + padding + borders
            this.left = this.gameScreen.offsetWidth - this.width;
        }
        //Handle the left side of the screen; car stops at left border of game screen;
        else if(this.left <= 0) {
            this.left = 0;
        }
        //Handle the top of the screen; 
        if (this.top <= 0) {
            this.top = 0;
        }
        // Handle the bottom of the screen;
        else if (this.top + this.height > this.gameScreen.offsetHeight){
            this.top = this.gameScreen.offsetHeight - this.height;
        }


        if (!this.isJumping && this.top + this.height < this.gameScreen.offsetHeight) {
            this.directionY += this.gravity;
        }

        // Jump handling
        if (this.isJumping) {
            const elapsedTime = performance.now() - this.jumpStartTime;
            if (elapsedTime < 350 && this.jumpCount < this.maxJumps) { // Adjust jump duration as needed
                this.directionY = -this.jumpStrength;
            } else {
                this.isJumping = false;
                if (this.top + this.height >= this.gameScreen.offsetHeight) {
                    // Reset jump count when landing
                    this.jumpCount = 0;
                }
            }
        }

        this.updatePosition();
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.jumpStartTime = performance.now();
            this.jumpCount ++;
        }
    }

    updatePosition() {
        this.left += this.directionX;
        this.top += this.directionY;

        // Handle screen boundaries
        if (this.left < 0) {
            this.left = 0;
        } else if (this.left + this.width > this.gameScreen.offsetWidth) {
            this.left = this.gameScreen.offsetWidth - this.width;
        }

        if (this.top < 0) {
            this.top = 0;
        } else if (this.top + this.height > this.gameScreen.offsetHeight) {
            this.top = this.gameScreen.offsetHeight - this.height;
            this.isJumping = false; // Stop jumping when hitting the ground
        }

        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }


    // always used to check crash ***********************
    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        //If part of the player's car is inside the obstacles car, then I have a collision
        if(playerRect.left < obstacleRect.right && playerRect.right > obstacleRect.left && playerRect.top < obstacleRect.bottom && playerRect.bottom > obstacleRect.top) {
            return true;
        } else {
            return false;
        }
    }

    didCollide(point){
        const playerRect = this.element.getBoundingClientRect();
        const pointRect = point.element.getBoundingClientRect();

        if (
            playerRect.left < pointRect.right &&
            playerRect.right > pointRect.left &&
            playerRect.top < pointRect.bottom &&
            playerRect.bottom > pointRect.top
        ) {
            return true;

        } else {
            return false;
        }


    }
}