var coinImage = new Image();
coinImage.src = "images/bird.png";

var canvas = document.getElementById("coinAnimation");
canvas.width = 50;
canvas.height = 50;

var coin = sprite({
    context: canvas.getContext("2d"),
    width: 50,
    height: 50,
    image: coinImage
});

function sprite (options) {
				
    var that = {};
					
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.render = function () {

        // Draw the animation
        that.context.drawImage(
           that.image,
           0,
           0,
           that.width,
           that.height,
           0,
           0,
           that.width,
           that.height);
    };
    return that;
}
coin.render();


