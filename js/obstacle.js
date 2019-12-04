var BASE_POLE_HEIGHT = 50;
var POLE_WIDTH = 100;

function Obstacles(parentElement){
	this.mainELement = parentElement;
	this.x = GAME_WIDTH;
	this.y;
	var northPole = document.createElement('div');
	var southPole = document.createElement('div');

	this.create = function(){
		var multiplier = randomNumber(7,1);
		this.mainELement.appendChild(northPole);
		this.mainELement.appendChild(southPole);
		this.y = BASE_POLE_HEIGHT*multiplier;
		northPole.style.width = POLE_WIDTH+'px';
		northPole.style.height = this.y+'px';
		northPole.style.position = 'absolute';
		northPole.style.top = '0px';
		northPole.style.left = this.x+'px';
		northPole.style.background = 'red';

		southPole.style.width = POLE_WIDTH+'px';
		southPole.style.height = GAME_HEIGHT-parseInt(northPole.style.height)-POLE_DIFF+'px';
		southPole.style.position = 'absolute';
		southPole.style.bottom = '0px';
		southPole.style.left = this.x+'px';
		southPole.style.background = 'red';
	}

	this.update = function(){
		this.x-=10;
		northPole.style.left = this.x+'px';
		southPole.style.left = this.x+'px';
	}

	this.delete = function(){
		this.mainELement.removeChild(northPole);
		this.mainELement.removeChild(southPole);
	}
}