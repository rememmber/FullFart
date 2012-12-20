var width = 320,
globalContext,
    //screen.width
    height = 500,
    //screen.height
    speed = 200,
    tempSpeed,
    left = false,
    right = false,
    gLoop, road, degree = 0,
    points = 0,
    uniDegree = 0,
    holdTimes = 0,
    playerX, playerY, roadNr = 1,
    assImg, hasAss=false, n = 0,
    colisionY = false,
    colisionX = false,
    uniCode, holding = false;
adjustment = false, time = 300,
//min - 230
state = true, gameStarted = false, speedometerCanvas = document.getElementById('speedometer')
speedometerContext = speedometerCanvas.getContext('2d');

speedometerArrow = document.getElementById('speedometerArrow')
speedometerArrowContext = speedometerArrow.getContext('2d');

navigator = document.getElementById('navigator')
navigatorContext = navigator.getContext('2d');

logg = document.getElementById('logg')
loggContext = logg.getContext('2d');

petrol = document.getElementById('petrol')
petrolContext = petrol.getContext('2d');

petrolArrow = document.getElementById('petrolArrow')
petrolArrowContext = petrolArrow.getContext('2d');

petrolBulb = document.getElementById('petrolBulb')
petrolBulbContext = petrolBulb.getContext('2d');

c = document.getElementById('c'), ctx = c.getContext('2d');

//c0 = document.getElementById('canvas0'), ctx0 = c0.getContext('2d');

c.width = width;
c.height = height;


var clear = function () {
        ctx.fillStyle = '#d0e7f9';
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.rect(0, 0, width, height);
        ctx.closePath();
        ctx.fill();
        
//                ctx0.fillStyle = '#d0e7f9';
//        ctx0.clearRect(0, 0, width, height);
//        ctx0.beginPath();
//        ctx0.rect(0, 0, width, height);
//        ctx0.closePath();
//        ctx0.fill();
    }

var howManyCircles = 10,
    circles = [];

for (var i = 0; i < howManyCircles; i++)
circles.push([Math.random() * width, Math.random() * height, Math.random() * 100, Math.random() / 2]);

var DrawCircles = function (road) {
	//alert();
        var road = new Image();
        road.src = "road" + roadNr + ".png";

        //ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
        ctx.drawImage(road, 0, 0);
        ctx.beginPath();
        //ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    };

var DrawRight = function () {

        var navigatorImg = new Image();
        navigatorImg.src = "textures/navigator.png";

        
        var loggImg = new Image();
        loggImg.src = "textures/logg.png";

        navigatorContext.canvas.height = navigatorImg.height;
        navigatorContext.canvas.width = navigatorImg.width;

        navigatorContext.drawImage(navigatorImg, 0, 0);
        navigatorContext.beginPath();
        navigatorContext.closePath();
        navigatorContext.fill();

        loggContext.canvas.height = loggImg.height;
        loggContext.canvas.width = loggImg.width;

        loggContext.drawImage(loggImg, 0, 0);
        loggContext.beginPath();
        loggContext.closePath();
        loggContext.fill();


    };

var DrawLeft = function () {

        var speedometer = new Image();
        speedometer.src = "textures/rsz_speedometer.png";

        var petrolLevel = new Image();
        petrolLevel.src = "textures/bensin.png";
        
        var petrolGreenBuld = new Image();
        petrolGreenBuld.src = "textures/green_button-1.png";
        
        var petrolRedBuld = new Image();
        petrolRedBuld.src = "textures/red_button.png"

        speedometerContext.canvas.width = speedometer.width;
        speedometerContext.canvas.height = speedometer.height;

        speedometerContext.drawImage(speedometer, 0, 0);
        speedometerContext.beginPath();
        speedometerContext.closePath();
        speedometerContext.fill();


        petrolContext.canvas.height = petrolLevel.height;
        petrolContext.canvas.width = petrolLevel.width;


        petrolContext.drawImage(petrolLevel, 0, 0);
        petrolContext.beginPath();
        petrolContext.closePath();
        petrolContext.fill();


        speedometerArrowContext.canvas.height = 100;
        speedometerArrowContext.canvas.width = 100;

        var canvasWidth = 100,
            canvasHeight = 10;
        //speedometerContext.clearRect(0, 0, canvasWidth, canvasWidth);
        speedometerContext.save();

        speedometerContext.translate(canvasWidth / 1.7, canvasWidth / 1.7);

        //(speed - 200) / 2      - km/h
        speedometerContext.rotate(-(((speed - 200) * 1.2) - 180) * Math.PI / 180);

        speedometerContext.translate(-canvasWidth / 2, -canvasWidth / 2);


        speedometerContext.fillRect(canvasWidth / 2, canvasWidth / 2, canvasWidth / 4, canvasHeight / 4);

        speedometerContext.restore();


        petrolArrowContext.canvas.height = 100;
        petrolArrowContext.canvas.width = 100;

        var canvasWidth = 100,
            canvasHeight = 10;
        //petrolContext.clearRect(0, 0, canvasWidth, canvasWidth);
        petrolContext.save();

        petrolContext.translate(canvasWidth / 1.7, canvasWidth / 1.3);

        petrolContext.rotate(time * Math.PI / 180);

        petrolContext.translate(-canvasWidth / 2, -canvasWidth / 2);


        petrolContext.fillRect(canvasWidth / 2, canvasWidth / 2, canvasWidth / 4, canvasHeight / 4);

        petrolContext.restore();

        petrolBulbContext.canvas.height = petrolGreenBuld.height;
        petrolBulbContext.canvas.width = petrolGreenBuld.width;

        if(time <= 300 && time >= 250){
        petrolBulbContext.drawImage(petrolGreenBuld, 0, 0);
        petrolBulbContext.beginPath();
        petrolBulbContext.closePath();
        petrolBulbContext.fill();
        }else if(time <250 && time >= 230){
            petrolBulbContext.drawImage(petrolRedBuld, 0, 0);
            petrolBulbContext.beginPath();
            petrolBulbContext.closePath();
            petrolBulbContext.fill();
        }
    };

var MoveCircles = function () {

        var road = new Image();
        road.src = "road" + roadNr + ".png"

        //ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
        ctx.drawImage(road, 0, 0);
        ctx.beginPath();
        //ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        player.draw();
        if (roadNr < 9) roadNr++;
        else roadNr = 1;

    };

var player = new(function () {

    var that = this;
    that.image = new Image();

    that.image.src = "Car.png"
    that.width = 75;
    that.height = 144;
    that.frames = 1;
    that.actualFrame = 0;
    that.X = 0;
    that.Y = 0;



    that.jump = function () {
        //		if (!that.isJumping && !that.isFalling) {
        //			that.fallSpeed = 0;
        //			that.isJumping = true;
        //			that.jumpSpeed = 17;
        //		}
    }

    that.update = function () {
        // that.image.src = "Car.png";
    }

    that.checkJump = function () {
        //a lot of changes here
        if (that.Y > height * 0.4) {
            that.setPosition(that.X, that.Y - that.jumpSpeed);
        } else {
            if (that.jumpSpeed > 10) points++;
            // if player is in mid of the gamescreen
            // dont move player up, move obstacles down instead
            MoveCircles(that.jumpSpeed * 0.5);

            //			platforms.forEach(function(platform, ind){
            //				platform.y += that.jumpSpeed;
            //
            //				if (platform.y > height) {
            //					var type = ~~(Math.random() * 5);
            //					if (type == 0) 
            //						type = 1;
            //					else 
            //						type = 0;
            //					
            //					platforms[ind] = new Platform(Math.random() * (width - platformWidth), platform.y - height, type);
            //				}
            //			});
        }


        that.jumpSpeed--;
        if (that.jumpSpeed == 0) {
            that.isJumping = false;
            that.isFalling = true;
            that.fallSpeed = 1;
        }

    }

    that.fallStop = function () {
        that.isFalling = false;
        that.fallSpeed = 0;
        that.jump();
    }

    that.checkFall = function () {
        if (that.Y < height - that.height) {
            that.setPosition(that.X, that.Y + that.fallSpeed);
            that.fallSpeed++;
        } else {
            if (points == 0) that.fallStop();
            else GameOver();
        }
    }

    that.moveLeft = function () {
        if (right == true) {
            that.setPosition(that.X - that.width, that.Y);
        }
        left = true;
        right = false;

        if (that.X > 0) {
            that.setPosition(that.X - 5 + (2 * Math.sin(uniDegree / 2)), that.Y);
            degree = degree - 1;
            uniDegree = degree;
            //rotate image
            //that.rotate();
            that.image.src = "Car-left.png";
        }
    }

    that.moveRight = function () {
        if (left == true) {
            that.setPosition(that.X + that.width, that.Y);
        }

        left = false;
        right = true;

        if (that.X + that.width < width) {
            that.setPosition(that.X + 5 - (2 * Math.sin(uniDegree / 2)), that.Y);
            degree = degree + 1;
            uniDegree = degree;


            //that.rotate();
that.image.src = "Car-right.png";
        }
    }

    that.moveUp = function () {
        if (that.X + that.width < width) {
            //athat.setPosition(that.X, that.Y - 5);
        }
    }

    that.moveDown = function () {
        if (that.X + that.width < width) {
            //that.setPosition(that.X, that.Y + 5);
        }
    }

    that.getPosition = function () {
        return that.X;
    }


    that.setPosition = function (x, y) {
        that.X = x;
        that.Y = y;
    }

    that.rotate = function () {
        try {


            //ctx.drawImage(that.image, 0, 0, that.width, that.height, that.X, that.Y, that.width, that.height);
            //alert("rotate");
        } catch (e) {};
    }

    that.interval = 0;
    that.draw = function () {       ////+ (2 * Math.sin(uniDegree / 2))
        try {
            ctx.save();

            // ctx.clearRect(that.X, that.Y, that.width, that.height);
            if (adjustment) {
                //alert("adjustment");
                if (left) {
                    ctx.translate(that.X + that.width / 2, that.Y + that.height);
                    ctx.rotate(degree * Math.PI / 180);

                    ctx.drawImage(that.image, -that.width / 2, -that.height, that.width, that.height);

                }
                else if (right) {
                    ctx.translate(that.X - that.width / 2, that.Y + that.height);
                    ctx.rotate(degree * Math.PI / 180);

                    ctx.drawImage(that.image, -that.width / 2, -that.height, that.width, that.height);

                }
            } else if (!adjustment){

                if (left) {
                    //alert("draw");
                    //ctx.moveTo(that.X, that.Y);
                    ctx.translate(that.X + that.width / 2, that.Y);

                    // ctx.translate(that.width, that.height);
                    ctx.rotate(degree * Math.PI / 180);
                    ctx.drawImage(that.image, -that.width / 2, 0, that.width, that.height);
                }
                else if (right) {
                    //alert("draw");
                    //ctx.moveTo(that.X, that.Y);
                    ctx.translate(that.X - that.width / 2, that.Y);

                    // ctx.translate(that.width, that.height);
                    ctx.rotate(degree * Math.PI / 180);
                    ctx.drawImage(that.image, -that.width / 2, 0, that.width, that.height);
                }
            }
            
                               ctx.translate(that.X, that.Y);
                               ctx.drawImage(that.image, 0, 0, that.width, that.height);
     
            ctx.restore();
        } catch (e) {};
    }
})();


player.setPosition(~~ ((width - player.width) / 1.55), height - player.height);


//document.onmousemove = function(e){
//	if (player.X + c.offsetLeft > e.pageX) {
//		player.moveLeft();
//	} else if (player.X + c.offsetLeft < e.pageX) {
//		player.moveRight();
//	}
//	
//}
document.onkeypress = function detectspecialkeys(e) {

    pressed = true;


    playerX = player.X;
    playerY = player.Y;

    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    //var character = String.fromCharCode(code);
    //alert('Character was ' + code);
    if (uniCode == code) {
        if (!holding) {
            holding = true;
            
            playerX = player.X;
            playerY = player.Y;
        }
    } else {
        holding = false;
        uniCode = code;
        //alert("press");
    }
    if (code == 97) {
        player.moveLeft();
    } else if (code == 100) {
        player.moveRight();
    } else if (code == 119) {
        gameSpeedUp();
        //player.moveUp();
    } else if (code == 115) {
        gameSpeedDown();
        //player.moveDown();
    }
}

document.onkeyup = function detectKeyUp(e) {
	//alert("up");
    uniCode = -1;
    //
    //    var code;
    //    if (!e) var e = window.event;
    //    if (e.keyCode) code = e.keyCode;
    //    else if (e.which) code = e.which;
    //    //var character = String.fromCharCode(code);
    //    //alert('Character was ' + code);
    player.image.src = "Car.png";

    adjustCarNormal();

}

var adjustCarNormal = function () {
        if (degree < 0 || degree > 0) {
            adjustment = true;


            ctx.save();


            //ctx.clearRect(that.X, that.Y, that.width, that.height);
            //alert("draw");
            //            ctx.moveTo(player.X, player.Y);
            //            ctx.translate(player.X, player.Y);
            //ctx.translate(that.width, that.height);
            if (degree < 0) {
                ctx.rotate(degree * Math.PI / 180);
                degree = degree + 1;

            } else if (degree > 0) {
                ctx.rotate(degree * Math.PI / 180);
                degree = degree - 1;
            }

            //ctx.drawImage(player.image, 0, 0, player.width, player.height, 0, 0, player.width, player.height);
            ctx.restore();

            gLoop = setTimeout(adjustCarNormal, 1000 / 20);
        } else adjustment = false;


    }

var nrOfPlatforms = 7,
    platforms = [],
    platformWidth = 70,
    platformHeight = 20;

//	var Platform = function(x, y, type){
//		var that=this;
//		
//		that.firstColor = '#FF8C00';
//		that.secondColor = '#EEEE00';
//		that.onCollide = function(){
//			player.fallStop();
//		};
//		
//		if (type === 1) {
//			that.firstColor = '#AADD00';
//			that.secondColor = '#698B22';
//			that.onCollide = function(){
//				player.fallStop();
//				player.jumpSpeed = 50;
//			};
//		}
//		
//		
//
//		that.x = ~~ x;
//		that.y = y;
//		that.type = type;
//		
//		//NEW IN PART 5
//		that.isMoving = ~~(Math.random() * 2);
//		that.direction= ~~(Math.random() * 2) ? -1 : 1;
//			
//		that.draw = function(){
//			ctx.fillStyle = 'rgba(255, 255, 255, 1)';
//			var gradient = ctx.createRadialGradient(that.x + (platformWidth/2), that.y + (platformHeight/2), 5, that.x + (platformWidth/2), that.y + (platformHeight/2), 45);
//			gradient.addColorStop(0, that.firstColor);
//			gradient.addColorStop(1, that.secondColor);
//			ctx.fillStyle = gradient;
//			ctx.fillRect(that.x, that.y, platformWidth, platformHeight);
//		};
//	
//		return that;
//	};
//	var generatePlatforms = function(){
//		var position = 0, type;
//		for (var i = 0; i < nrOfPlatforms; i++) {
//			type = ~~(Math.random()*5);
//			if (type == 0) 
//				type = 1;
//			else 
//				type = 0;
//			platforms[i] = new Platform(Math.random() * (width - platformWidth), position, type);
//			if (position < height - platformHeight) 
//				position += ~~(height / nrOfPlatforms);
//		}
//	}();
var checkCollision = function () {
//        platforms.forEach(function (e, ind) {
//            if (
//            (player.isFalling) && (player.X < e.x + platformWidth) && (player.X + player.width > e.x) && (player.Y + player.height > e.y) && (player.Y + player.height < e.y + platformHeight)) {
//                e.onCollide();
//            }
//        })

ctx.beginPath();
ctx.arc(localX, localY, 0, 0, 2 * Math.PI, false);
ctx.fillStyle = "#8ED6FF";
ctx.fill();
ctx.lineWidth = 5;
ctx.strokeStyle = "black";
ctx.stroke();


ctx.beginPath();
ctx.arc(player.X, player.Y, 0, 0, 2 * Math.PI, false);
ctx.fillStyle = "#8ED6FF";
ctx.fill();
ctx.lineWidth = 5;
ctx.strokeStyle = "black";
ctx.stroke();

ctx.beginPath();
ctx.arc(player.X+player.width, player.Y, 0, 0, 2 * Math.PI, false);
ctx.fillStyle = "#8ED6FF";
ctx.fill();
ctx.lineWidth = 5;
ctx.strokeStyle = "white";
ctx.stroke();


if(player.Y < localY + assImg.height){
	if(player.Y + 5 >= localY + assImg.height){
		colisionY = true;
	}
}else if(player.Y > localY + assImg.height){
	if(player.Y - 5 <= localY + assImg.height){
		colisionY = true;
	}
}

if(player.X < assImg.width){
	if(player.X + 10 >= localX){
		colisionX = true;
	}else colisionX = false;
}else if(player.X > localX){
	if(player.X - 10 <= localX){
		colisionX = true;
	}else colisionX = false;
}else colisionX = false;

//if(Math.round(player.Y) == Math.round(localY) && Math.round(player.X) == Math.round(localX)){
//	alert();
//}
//alert(Math.round(player.Y) +"  -  "+ Math.round(localY));
    }

var GameLoop = function () {

	
        clear();

        if (time > 230) time = time - 1 / 50;

       DrawCircles(road);

        DrawLeft();
        DrawRight();
        
        if(hasAss){
        	drawAss();
        	
        	 checkCollision();

//	            ctx0.fillStyle = "Black";
//            ctx0.font = "10pt Arial";
//            ctx0.fillText(Math.round(player.X) + " - "+Math.round(localX)+" | "+(Math.round(player.Y)-player.height+10) + " - "+Math.round(localY), 10 ,10);

            
if(colisionX && colisionY){
	assImg = null;
	
 tempSpeed = speed;
	speed = 200;
	
	$(document).ready(function () {

// if user clicked on button, the overlay layer or the dialogbox, close the dialog	
$('a.btn-ok, #dialog-overlay, #dialog-box').click(function () {		
	
	$('#dialog-overlay, #dialog-box').hide();	
	
	speed = tempSpeed;
	//GameLoop();
//UpdateRoad();

	return false;
});

// if user resize the window, call the same function again
// to make sure the overlay fills the screen and dialogbox aligned to center	
$(window).resize(function () {
	
	//only do it if the dialog box is not hidden
	if (!$('#dialog-box').is(':hidden')) popup();		
});	


});

//Popup dialog
function popup(message) {
	
// get the screen height and width  
var maskHeight = $(document).height();  
var maskWidth = $(window).width();

// calculate the values for center alignment
var dialogTop =  (maskHeight/2) - ($('#dialog-box').height());  
var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2); 

// assign values to the overlay and dialog box
$('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
$('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();

// display the message
$('#dialog-message').html(message);
		
}

popup('<p>Kolisjon</p><center><img border="0" src="crash.png" width="55" height="60" /></center>');

colision = false;

}
        }


        if (player.isJumping) player.checkJump();
        if (player.isFalling) player.checkFall();

        player.draw();

        //	platforms.forEach(function(platform, index){
        //		if (platform.isMoving) {
        //			if (platform.x < 0) {
        //				platform.direction = 1;
        //			} else if (platform.x > width - platformWidth) {
        //				platform.direction = -1;
        //			}
        //				platform.x += platform.direction * (index / 2) * ~~(points / 100);
        //			}
        //		platform.draw();
        //	});
       

//        ctx.fillStyle = "Black";
//        ctx.fillText("degree: " + (2 * Math.sin(uniDegree / 2)), 10, height - 10);
        if (state) {
            gLoop = setTimeout(GameLoop, 1000 / 50);
        }
    }

var UpdateRoad = function () {
        player.update();


        if (speed < 200) {
            MoveCircles();
        }
        var t = setTimeout(UpdateRoad, speed);
    }

var GameOver = function () {
        state = false;
        gameStarted = false;
        clearTimeout(gLoop);
        setTimeout(function () {
            clear();

            ctx.fillStyle = "Black";
            ctx.font = "10pt Arial";
            ctx.fillText("GAME OVER", width / 2 - 60, height / 2 - 50);
            ctx.fillText("YOUR RESULT:" + points, width / 2 - 60, height / 2 - 30);
        }, 100);

    };

function gameSpeedDown() {
    player.image.src = "Car_break.png";
    if (speed < 200) speed = speed + 2;
    //GameLoop();
}

function gameSpeedUp() {

    if (speed >= 8) speed = speed - 2;
    //GameLoop();
}

var DrawPlayer = function () {
        //player.draw();
    }

GameLoop();
UpdateRoad();

    function drawAss(){
    	
            if(assImg.src != ""){
            	if(speed != 200){
            		ctx.drawImage(assImg, localX, localY);
            		n = n - 0.001;
            		localY = localY-(speed-200) - n;
            	}else{
            		ctx.drawImage(assImg, localX, localY);
            		localY = localY-(speed-200);
            	}
            }
    }

window.onload = function(){
//	
//	localStorage.clear();

for (i=0; i<=localStorage.length-1; i++)  
    {  
        key = localStorage.key(i);  
        //alert(key);
        val = localStorage.getItem(key);  
        //alert(val);
        
        if(val.indexOf("png") != -1){
        	assImg = new Image();
        	assImg.onload = function() {
        		
        		//setTimeout(drawAss(), 1000 / 50);
                
//ctx.drawImage(assImg, localX, localY);

hasAss = true;

            };

            assImg.src = val;
        }else if(key.indexOf("XY") != -1){
            XY = localStorage.getItem(key); 
            separator = XY.indexOf(",");
            
            localX = XY.substring(0, separator);
            localY = XY.substring(separator+1, XY.length);
            
          //  alert(localX + " - " +localY);
            
        }
    }   
}
//DrawPlayer();