var GAME_HEIGHT = 700;
var GAME_WIDTH = 500;
var parent = document.getElementById('game');
var WALL_HEIGHT = 100;
var POLE_DIFF = 3.5*BIRD_HEIGHT;

//only whole number
var randomNumber = function(max, min) {
  var x = Math.floor((Math.random() * max) + min);
  return x;
};

function Game(parentElement){
	this.mainElement = parentElement;
	this.spacePress =true;
	this.backgroundX = 0;
	this.obstaclesArray = [];
	var that = this;
	this.direction = 1;

	this.create = function(){
		this.score = 0;
		this.highscore = 0;
		this.counter = 0;
		this.gameDiv = document.createElement('div');
		this.mainElement.appendChild(this.gameDiv);
		this.gameDiv.style.position = 'relative';
		this.gameDiv.style.height = '100%';
		this.gameDiv.style.width = '100%';
		this.gameDiv.style.background = 'url(images/background.png)';
		this.gameDiv.style.backgroundSize = 'cover';
		this.gameDiv.style.overflow = 'hidden';

		this.title = document.createElement('h1');
		this.gameDiv.appendChild(this.title);
		this.title.innerHTML = 'FLAPPY BIRD';
		this.title.style.color = 'red';
		this.title.style.background = 'yellow';
		this.title.style.textAlign = 'center';

		this.description = document.createElement('button');
		this.gameDiv.appendChild(this.description);
		this.description.innerHTML = 'press to start';
		this.description.style.margin = '0 auto';
		this.description.style.display = 'block';
		this.description.style.fontSize = '24px';

		this.birdCreate();
		this.bird.create();
		
		this.description.onclick  = function(){
			that.gameDiv.removeChild(that.title);
			that.gameDiv.removeChild(that.description);
			that.startGame();
			that.foregroundCreate();
			that.scoreCreate();
		}	

	}

	this.startGame = function(){
		this.mainInterval = setInterval(function(){
			that.scoreBoard.point = that.score;
			that.scoreBoard.update();
			that.counter++;
			that.bird.update(that.direction);

			if (that.bird.y >= GAME_HEIGHT-WALL_HEIGHT-BIRD_HEIGHT){
				that.gameOver();
				that.bird.dead();
			}
			//interval for creating obstacles
			if(that.counter%40 == 0){
				that.obstacleCreate();
				that.obstaclesArray.push(that.obstacles);

			}
			that.crash();
			for(var i =0; i<that.obstaclesArray.length;i++){
				if(that.obstaclesArray){
					that.obstaclesArray[i].update();
					if(that.obstaclesArray[i].x <=-POLE_WIDTH){
						that.obstaclesArray[i].delete();
						that.obstaclesArray.splice(0,1);
						that.score++;
						if(that.highscore<that.score){
							that.highscore = that.score;
						}
					}
				}
			}
			
			that.foreground.update();

			document.onkeydown = function(event){
				var key = event.keyCode;
				if (key==32){
					that.bird.jump();
				}
			}

		},50)
	}

	this.obstacleCreate = function(){
		this.obstacles = new Obstacles(that.gameDiv);
		this.obstacles.create();
	}

	this.foregroundCreate = function(){
		this.foreground = new Foreground(that.gameDiv);
		this.foreground.create();
	}

	this.backgroundUpdate = function(){
		this.backgroundX-=5;
		that.gameDiv.style.backgroundPositionX = this.backgroundX+'px';
	}

	this.birdCreate = function(){
		this.bird = new Bird(this.mainElement);
	}

	this.crash = function(){
		for(var i=0;i<this.obstaclesArray.length;i++){
			if(that.bird.x+BIRD_WIDTH>=this.obstaclesArray[i].x&&
				that.bird.x<=this.obstaclesArray[i].x+POLE_WIDTH&&
				that.bird.y+BIRD_HEIGHT>=this.obstaclesArray[i].y+POLE_DIFF||
				that.bird.x+BIRD_WIDTH>=this.obstaclesArray[i].x&&
				that.bird.x<=this.obstaclesArray[i].x+POLE_WIDTH&&
				that.bird.y<=this.obstaclesArray[i].y){
				clearInterval(that.mainInterval);
				while(that.gameDiv.hasChildNodes()){
					that.gameDiv.removeChild(that.gameDiv.lastChild);
				}
				that.bird.dead();
				that.restartScreen();
				console.log('crash');
			}
		}
	}

	this.gameOver = function(){
		while(that.gameDiv.hasChildNodes()){
					that.gameDiv.removeChild(that.gameDiv.lastChild);
				}
		clearInterval(that.mainInterval);
		that.restartScreen();
	}

	this.restartScreen = function(){
		var over = document.createElement('h1');
		that.gameDiv.appendChild(over);
		over.innerHTML = 'GAME OVER';
		over.style.color = 'red';
		over.style.background = 'yellow';
		over.style.textAlign = 'center';
		over.style.zIndex = '20';

		var high = document.createElement('h2');
		that.gameDiv.appendChild(high);
		high.innerHTML = 'HIGHSCORE : '+this.highscore;
		high.style.display = 'block';
		high.style.margin = 'auto';
		high.style.background = 'pink';
		high.style.textAlign = 'center';

		var restart = document.createElement('button');
		that.gameDiv.appendChild(restart);
		restart.style.display = 'block';
		restart.style.fontSize = '24px';
		restart.innerHTML = 'RESTART';
		restart.style.margin = 'auto';
		restart.style.zIndex = '20';

		restart.onclick = function(){
			while(that.gameDiv.hasChildNodes()){
					that.gameDiv.removeChild(that.gameDiv.lastChild);
				}
			clearInterval(that.bird.dyeInterval);
			that.obstacles = null;
			that.obstaclesArray = [];
			that.bird.revive();
			that.startGame();
			that.foregroundCreate();
			that.scoreCreate();
			that.score = 0;
		}
	}

	this.scoreCreate = function(){
		this.scoreBoard = new Score(that.gameDiv);
	}

};

var game = new Game(parent);
game.create();