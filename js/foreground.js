function Foreground(parentElement){
	this.x = 0;
	this.mainElement = parentElement;
	this.create = function(){
		this.foreDiv = document.createElement('div');
		this.mainElement.appendChild(this.foreDiv);
		this.foreDiv.style.background = 'url(images/foreground.png)';
		this.foreDiv.style.height = WALL_HEIGHT+'px';
		this.foreDiv.style.width = '100%';
		this.foreDiv.style.position = 'absolute';
		this.foreDiv.style.bottom = '0px';
		this.foreDiv.style.backgroundSize = '8% 100%';
		this.foreDiv.style.zIndex = '20';
	}

	this.update = function(){
		this.x-=5;
		this.foreDiv.style.backgroundPositionX = this.x+'px';
	}
}