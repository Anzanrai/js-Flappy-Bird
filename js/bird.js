var BIRD_HEIGHT = 50;
var BIRD_WIDTH = 50;

function Bird(parentElement){
	this.mainElement = parentElement;
	this.y = GAME_HEIGHT/2 - BIRD_HEIGHT;
	this.x = (GAME_WIDTH/2 - BIRD_WIDTH/2)-BIRD_WIDTH;
	var that = this;

	this.create = function(){
		this.birdDiv = document.createElement('div');
		this.mainElement.appendChild(this.birdDiv);
		this.birdDiv.style.height = BIRD_HEIGHT+'px';
		this.birdDiv.style.width = BIRD_WIDTH+'px';
		this.birdDiv.style.position = 'absolute';
		this.birdDiv.style.left = this.x+'px';
		this.birdDiv.style.top = this.y+'px';
		this.birdDiv.style.transition = 'transform .5s';
		

		this.birdImage = document.createElement('img');
		this.birdDiv.appendChild(this.birdImage);
		this.birdImage.setAttribute('src','images/bird.gif');
		this.birdImage.style.height = '100%';
		this.birdImage.style.width = '100%';
				
	}

	this.update = function(direction){
		this.y += 10;
		this.birdDiv.style.top = this.y*direction+'px';
		
	}

	this.jump = function(){
		this.y-=2*BIRD_HEIGHT;
		this.birdDiv.style.top = this.y +'px';
		
	}
	this.dead = function(){
		this.dyeInterval =setInterval(function(){
			if(that.y<=GAME_HEIGHT-WALL_HEIGHT-BIRD_HEIGHT){
				that.y+=5;;
				that.birdDiv.style.top = that.y+'px';
				that.birdDiv.style.transform = 'rotate(90deg)';
			}
		},20)
	}
	this.delete = function(){
		this.mainElement.removeChild(this.birdDiv);
	}

	this.revive = function(){
		this.y = GAME_HEIGHT/2 - BIRD_HEIGHT; 
		this.birdDiv.style.top = this.y +'px';
		this.birdDiv.style.transform = 'rotate(0deg)';
	}
};