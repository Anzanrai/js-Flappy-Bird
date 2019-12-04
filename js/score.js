function Score(parentElement){
  this.mainElement = parentElement;
  this.point;
  var scoreDiv = document.createElement('h1')
  this.mainElement.appendChild(scoreDiv);
  scoreDiv.style.position = 'absolute';
  scoreDiv.style.top = '0px';
  scoreDiv.style.left = '0px';
  scoreDiv.style.zIndex = '30';
  scoreDiv.style.background = 'grey';

  this.update = function(){
    scoreDiv.innerHTML = 'Score : '+this.point;
  }
};