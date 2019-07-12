// Enemies our player must avoid
// constructor function for enemies
var Enemy = function(startRow, spd) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.spd = spd;
    this.y = startRow;
};

// function to choose a random entry in an array
function random(array){
    return array[Math.floor((Math.random() * array.length))];
}

// reset player position to original start position
function reset(){
    player.x = 202;
    player.y = 373;

}

// arrays for the position of the enemy and the speed of the enemies
const enemyPos = [57, 140, 223]
const enemySpdArray = [100, 200, 300, 350, 400, 500]

// construct enemy objects with random position and speed
let allEnemies = [];
for (let x = 0; x < 5; x++){
    allEnemies[x] = new Enemy(random(enemyPos), enemySpdArray[x]);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.spd * dt;

    // if bug goes off screen, reset position and speed
    if (this.x > 606){
        this.x = -100;
        this.spd = random(enemySpdArray);
        this.y = random(enemyPos);
    }
    this.checkCollision(this.x, this.y);
};
// triggers reset function if bug is within 60x41 of player
Enemy.prototype.checkCollision = function(x , y){
    if (x >= (player.x - 60) &&
    x <= (player.x + 60) &&
    y >= (player.y - 41) &&
    y <= (player.y + 41)){
        reset();
    }
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);// 1
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 373;
}

Player.prototype.update = function(dt) {
    if (this.y < 0){
        reset();   // reset player position
    }
      if (this.y > 373){ // keeps player from moving out of canvas
          this.y = 373;
      }else if (this.x > 404){
          this.x = 404;
      }else if(this.x < 0){
          this.x = 0;
      }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(input){
    if (input === 'left'){
        this.x -= 101;
    }else if (input === 'right'){
        this.x += 101;
    }else if (input === 'up'){
        this.y -= 83;
    }else if (input === 'down'){
        this.y += 83;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const player = new Player();
