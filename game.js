const DinoGame = {
    canvas: null,
    ctx: null,
    dino: { x: 50, y: 150, width: 40, height: 60, jumping: false },
    obstacles: [],
    score: 0,
    tokenBalance: 0,
    gameLoop: null,
    gameSpeed: 5,

    init() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.addEventListeners();
        this.gameLoop = this.gameLoop.bind(this);
        requestAnimationFrame(this.gameLoop);
    },

    addEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.dino.jumping) {
                this.jump();
            }
        });

        this.canvas.addEventListener('touchstart', () => {
            if (!this.dino.jumping) {
                this.jump();
            }
        });
    },

    jump() {
        this.dino.jumping = true;
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            if (jumpHeight < 100) {
                this.dino.y -= 5;
                jumpHeight += 5;
            } else if (jumpHeight < 200) {
                this.dino.y += 5;
                jumpHeight += 5;
            } else {
                this.dino.y = 150;
                this.dino.jumping = false;
                clearInterval(jumpInterval);
            }
        }, 20);
    },

    createObstacle() {
        const obstacle = {
            x: this.canvas.width,
            y: 170,
            width: 20,
            height: 40
        };
        this.obstacles.push(obstacle);
    },

    moveObstacles() {
        this.obstacles.forEach(obstacle => {
            obstacle.x -= this.gameSpeed;
        });
        this.obstacles = this.obstacles.filter(obstacle => obstacle.x > -20);
    },

    checkCollision() {
        return this.obstacles.some(obstacle => 
            this.dino.x < obstacle.x + obstacle.width &&
            this.dino.x + this.dino.width > obstacle.x &&
            this.dino.y < obstacle.y + obstacle.height &&
            this.dino.y + this.dino.height > obstacle.y
        );
    },

    drawGame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw dino
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.dino.x, this.dino.y, this.dino.width, this.dino.height);
        
        // Draw obstacles
        this.ctx.fillStyle = 'red';
        this.obstacles.forEach(obstacle => {
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    },

    updateScore() {
        this.score++;
        document.getElementById('score').textContent = `Score: ${this.score}`;
        if (this.score % 100 === 0) {
            this.mintToken();
        }
    },

    async mintToken() {
        // This is where you'd integrate with your blockchain logic
        this.tokenBalance++;
        document.getElementById('token-balance').textContent = `Tokens: ${this.tokenBalance}`;
    },

    gameLoop() {
        this.moveObstacles();
        if (this.checkCollision()) {
            this.gameOver();
        } else {
            this.updateScore();
            if (this.score % 100 === 0) {
                this.createObstacle();
            }
        }
        this.drawGame();
        requestAnimationFrame(this.gameLoop);
    },

    gameOver() {
        alert(`Game Over! Your score: ${this.score}`);
        this.obstacles = [];
        this.score = 0;
        this.gameSpeed = 5;
    }
};

// Initialize the game when the page loads
window.addEventListener('load', () => {
    DinoGame.init();
});
