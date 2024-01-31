class Game {
    constructor(){

        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.gameOverScreen = document.getElementById("game-over");
        this.timeRemaining = document.getElementById("timeRemaining");
        

        this.player = new Player(
            this.gameScreen,
            0 ,
            500 ,
            50 ,   // valores já alterados
            100 ,
            "./images/player1.png" );


        this.height = 600;
        this.width = 900;

        // Timer

        // Pineapples and Pizzas
        this.obstacles = [];
        this.points = [];

        // Score
        this.score = 0;

        // Lives
        this.lives = 3;

        // Variable to Check if the Game is Over;
        this.gameIsOver = false;

        // Variable to Check If I'm in the Process of Crating an Obstacle
        this.isPushingObstacle = false;
        this.isPushingPoint = false;

        this.timer = 90;
        
    }

    start(){
    //Sets the height and width of the game screen.
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width=`${this.width}px`;
    //Hides the start screen.
        this.startScreen.style.display = "none";
    //Shows the game screen.
        this.gameScreen.style.display = "block";
    //Starts the game loop. 
        this.gameLoop();

    setInterval(() => {
        this.timer -= 1;
        document.getElementById("timeRemaining").innerText = `Remaining time: ${this.timer}`;

        if (this.timer <= 0) {
            clearInterval();
            this.endGame();
        }
    }, 1000);
    }
    
   


    gameLoop(){
        if(this.gameIsOver) {
            return;
        }
        this.update();
        window.requestAnimationFrame(()=> this.gameLoop());
    }

    update(){
        /* Socre, Lives Scoreboard */
        let score = document.getElementById("score");
        let lives = document.getElementById("lives");

        /*  Every Frame of the Game, I want to check if the car is moving */
        this.player.move();

        // Iterate over the obstacles array and make them move
        for (let i=0;i<this.obstacles.length; i++){
            const obstacle=this.obstacles[i];
            obstacle.move();

            if(this.player.didCollide(obstacle)){
                obstacle.element.remove();

                this.obstacles.splice(i,1);

                this.lives--;

            } else if(obstacle.left <= 0){
                

                // Remove the Obstacle HTML Element from the HTML
                obstacle.element.remove();

                // Remove the Obstacle from the Game Class'obstacles array
                this.obstacles.splice ( i , 1 )
            }
        }
        if (this.lives === 0){
            this.endGame();
        }
        else if(!this.obstacles.length && !this.isPushingObstacle){
                this.isPushingObstacle = true;
                setTimeout(()=>{
                    this.obstacles.push(new Obstacle(this.gameScreen))
                    this.isPushingObstacle = false;
                },1500);
            }
            
        // Iterate over the points array and make them move
        for (let i=0;i<this.points.length; i++){
            const point=this.points[i];
            point.move();

            if(this.player.didCollide(point)){
                point.element.remove();

                this.points.splice(i,1);

                this.score ++;

            } else if(point.left <= 0){
                
                

                // Remove the Obstacle HTML Element from the HTML
                point.element.remove();

                // Remove the Obstacle from the Game Class'obstacles array
                this.points.splice ( i , 1 )
            }
        
        }
        
        if (!this.points.length && !this.isPushingPoint) {
            this.isPushingPoint = true;
            setTimeout(()=>{
                this.points.push(new Point(this.gameScreen));
                this.isPushingPoint = false;
            }, 2000)
        }
    
    score.innerHTML = this.score;     // score and lives
    lives.innerHTML = this.lives;
  

    }
    
    endGame(){
        this.timeRemaining.style.display = "none";
        // Change the gameIsOver status. If it's ture, remember that this is going to break the animation loop.
        this.gameIsOver = true;

        // Remove Player
        this.player.element.remove();

        // Remove all Obstacles
        this.obstacles.forEach((obstacle,index)=>{

            // Remove the obstacle from JS
            this.obstacles.splice(index,1);

            // Remove the obstacle from HTML;
            obstacle.element.remove();
        })

        // Remove all points

        this.points.forEach((point,index)=>{
            this.points.splice(index,1);
            point.element.remove();
        })

        this.gameScreen.style.display = "none";
        this.gameOverScreen.style.display = "block";

    }
}