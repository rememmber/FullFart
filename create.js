var canvas;
var context;
var canvas, ctx, mouseX = 9999,
    mouseY = 9999,
    distX, distY, circle, objectReference;
var imageObj;
var firstDrop = true;
var dropX, dropY;
var dragging = false;
var imageObjects = new Array();
var circlesArray = new Array();
var dropXArray = new Array();
var dropYArray = new Array();
var imageIndex = 0;
var circle;
var activeImage;

function handleDragStart(e) {
    this.style.opacity = '0.4'; // this / e.target is the source node.
}

var cols = document.querySelectorAll('#col1 .column');
[].forEach.call(cols, function (col) {
    col.addEventListener('dragstart', handleDragStart, false);
});

var view = document.querySelectorAll('#col2');
[].forEach.call(view, function (v) {
    v.addEventListener('dragstart', handleDragStart, false);
    v.addEventListener('dragenter', handleDragEnter, false)
    v.addEventListener('dragover', handleDragOver, false);
    v.addEventListener('dragleave', handleDragLeave, false);
    v.addEventListener('drop', handleDrop, false);
    v.addEventListener('dragend', handleDragEnd, false);
});


function handleDragStart(e) {
    this.style.opacity = '0.4'; // this / e.target is the source node.
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
    return false;
}

function handleDragEnter(e) {
    dragging = true;
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over'); // this / e.target is previous target element.
}

var cols = document.querySelectorAll('#col1 .column');
[].forEach.call(cols, function (col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false);
    col.addEventListener('dragover', handleDragOver, false);
    // col.addEventListener('dragleave', handleDragLeave, false);
});

///Competing the drag
function handleDrop(e) {
    var pos = findOffset(canvas);

    dropX = e.pageX - pos.x;
    dropY = e.pageY - pos.y;

    // alert(mouseX + " : "+mouseY);

    //  // this/e.target is current target element.
    //
    //  if (e.stopPropagation) {
    //    e.stopPropagation(); // Stops some browsers from redirecting.
    //  }
    //
    //  // Don't do anything if dropping the same column we're dragging.
    //  if (dragSrcEl != this) {
    //    // Set the source column's HTML to the HTML of the columnwe dropped on.
    //    //dragSrcEl.innerHTML = this.innerHTML;
    //    this.innerHTML += e.dataTransfer.getData('text/html'); 
    //  }
    //  
    setImageObject(e.dataTransfer.getData('text/html'));

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    this.style.opacity = '1';

    [].forEach.call(cols, function (col) {
        col.classList.remove('over');
    });
}

var cols = document.querySelectorAll('#col1 .column');
[].forEach.call(cols, function (col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false)
    col.addEventListener('dragover', handleDragOver, false);
    //col.addEventListener('dragleave', handleDragLeave, false);
    //col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
});



var dragSrcEl = null;

function handleDragStart(e) {
    // Target (this) element is the source node.
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

//function draw (src) {
//	
//	var imageObj = new Image();
//	imageObj.src = src.substring(src.indexOf("src=")+5, src.length-6);
//	
//    canvas = document.getElementById('rectangle');
//    if (canvas.getContext) {
//      context = canvas.getContext('2d');
//      
//      //context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height);
//      
//    } else {
//      // put code for browsers that don’t support canvas here
//      alert("This page uses HTML 5 to render correctly. Other browsers may not see anything.");
//    }
//    
//    
//  }
function setImageObject(src) {
    imageObj = new Image();
    
    imageObj.src = src.substring(src.indexOf("src=") + 5, src.length - 7);
    
    imageObjects[imageIndex] = imageObj;
    
        circle = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: 50,
        mouse: false,
        drag: false
    }
    
    circlesArray[imageIndex] = circle;
    
    dropXArray[imageIndex] = dropX;
    dropYArray[imageIndex] = dropY;
    
    activeImage = imageIndex;
    
    imageIndex = imageIndex + 1;
    
            document.getElementsByClassName("sign_settings")[0].style.display = "block";
            
            document.getElementsByTagName('input')[2].value = imageObjects[activeImage].height;
            
           document.getElementsByClassName("label")[0].innerHTML = imageObjects[imageIndex - 1].src.substring(imageObjects[imageIndex - 1].src.lastIndexOf("/")+1, imageObjects[imageIndex - 1].src.lastIndexOf("."));
}

function showValue(value){
if(activeImage != null){
	if (imageObjects[activeImage] != null) {
		imageObjects[activeImage].height =  value;
		imageObjects[activeImage].width =  value * 1.13513514;
		
		drawCanvas();
	}
	}
}


function drawCanvas() {

    if (imageObjects[imageIndex - 1] != null) {


        circlesArray[imageIndex - 1].r = imageObjects[imageIndex - 1].width / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        // ctx.drawImage(imageObj, circle.x,circle.y, imageObj.width, imageObj.height);

for(var index=0; index < imageObjects.length; index++){
        ctx.arc(circlesArray[index].x + imageObjects[index].width / 2, circlesArray[index].y + imageObjects[index].height / 2, circlesArray[index].r, 0, Math.PI * 2, false);
        
        }
        

        drawBackground();

        if (dragging) {
        
        
            ctx.drawImage(imageObjects[imageIndex - 1], dropXArray[imageIndex - 1], dropYArray[imageIndex - 1], imageObjects[imageIndex - 1].width, imageObjects[imageIndex - 1].height);

            circlesArray[imageIndex - 1].x = dropXArray[imageIndex - 1];
            circlesArray[imageIndex - 1].y = dropYArray[imageIndex - 1];

            dragging = false;

        } else {
       	 	for(var index=0; index<imageObjects.length; index++){
          	  	ctx.drawImage(imageObjects[index], circlesArray[index].x, circlesArray[index].y, imageObjects[index].width, imageObjects[index].height);
            }
        }



        //var pattern = ctx.createPattern(imageObj, 'no-repeat');	 

        //  ctx.save();
        //ctx.fillStyle = pattern;

        //ctx.fillRect(circle.x,circle.y, imageObj.width, imageObj.height);
        // ctx.restore();

        //ctx.isPointInPath(mouseX, mouseY) ? circle.mouse = true : circle.mouse = false;     samething as under
        for(var index = 0; index < imageObjects.length; index++){

        	if(ctx.isPointInPath(mouseX, mouseY)){
        		
	   		     	if(approximatelyEquals(index, mouseX, mouseY)){
		   		 		///alert();
		   		 		circlesArray[index].mouse = true;
		   		 		
		   		 		activeImage = index;
		   		 	}else{
			   		 	circlesArray[index].mouse = false;
		   		 	}
		   	     
		   	}else{
	       		circlesArray[index].mouse = false;
	       	}
	       	}
        // ctx.fill();
        } else {
        //    ctx.clearRect(0,0,canvas.width,canvas.height);
        //    ctx.beginPath();
        //    ctx.arc(circle.x,circle.y,circle.r,0,Math.PI*2,false);
        // 
        //    
        //    ctx.isPointInPath(mouseX,mouseY) ? circle.mouse = true : circle.mouse = false;
        //    ctx.fill();
    }
}


function approximatelyEquals(/* float */ index, /* float */ x, /* float */ y) {

    var X = Math.abs(x), Y = Math.abs(y), Z = Math.abs(circlesArray[index].x), M = Math.abs(circlesArray[index].y);
    
    if((X < Z) && (Y < M)){
    //alert("1");
    	if((X + 50 > Z) && (Y + 50 > M)){
    	//alert(index);
    		return true;
    	}else{
	    	return false;
    	}
    }else if((X > Z) && (Y > M)){
    //alert("2");
    	if((X - 50 < Z) && (Y - 50 < M)){
    	//alert(index);
    		return true;
    	}else{
	    	return false;
    	}

    }
/*
    alert(X);
    alert(Y);
    alert(Z);
    alert(M);
*/
}


function findOffset(obj) {
    var curX = curY = 0;
    if (obj.offsetParent) {
        do {
            curX += obj.offsetLeft;
            curY += obj.offsetTop;
            
        } while (obj = obj.offsetParent);
        return {
            x: curX,
            y: curY
        };
    }
}

function updateCanvas(e) {

    var pos = findOffset(canvas);

    mouseX = e.pageX - pos.x;
    mouseY = e.pageY - pos.y;


for(var index = 0; index < circlesArray.length; index++){
    if (circlesArray[index].drag) {
        circlesArray[index].x = mouseX - distX;
        circlesArray[index].y = mouseY - distY;
    }
}

    drawCanvas();
}

function startDrag() {
/* alert(); */
    //alert("start drag");
    for(var index = 0; index < circlesArray.length; index++){
    if (circlesArray[index].mouse == true) {
    
   // alert(index);
       document.getElementsByClassName("label")[0].innerHTML = imageObjects[index].src.substring(imageObjects[index].src.lastIndexOf("/")+1, imageObjects[index].src.lastIndexOf("."));
       
        circlesArray[activeImage].drag = true;
        distX = mouseX - circlesArray[activeImage].x;
        distY = mouseY - circlesArray[activeImage].y;

        ctx.save();
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = "rgba(0,0,0,.3)";
        ctx.shadowBlur = 5;

        drawCanvas();
    } else {
    document.getElementsByClassName("label")[0].innerHTML = "";

        distX = mouseX - circlesArray[activeImage].x;
        distY = mouseY - circlesArray[activeImage].y;

        ctx.save();
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = "rgba(0,0,0,.3)";
        ctx.shadowBlur = 5;

        drawCanvas();
    }
    
    }
}

function stopDrag() {
    //alert("stop drag");
    for(var index=0; index < circlesArray.length; index++){
    if (circlesArray[index].drag == true) {
        circlesArray[index].drag = false;
        ctx.restore();
        drawCanvas();
    }
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBackground() {
    var canvasBg = new Image();
    canvasBg.src = "road1.png";

    var bg_pattern = ctx.createPattern(canvasBg, 'no-repeat');
    ctx.fillStyle = bg_pattern;
    ctx.fillRect(0, 0, canvasBg.width, canvasBg.height);
}

function save() {

    var assName = document.forms(0).elements(0).value;

    localStorage.setItem("name" + localStorage.length, assName);

    localStorage.setItem(assName + "-img" + localStorage.length, imageObj.src);

    localStorage.setItem(assName + "-XY" + localStorage.length, circle.x + "," + circle.y);
}

window.onload = function (images) {
    canvas = document.getElementById("c");
    ctx = canvas.getContext('2d');

    canvas.addEventListener('mousemove', updateCanvas, false);
    canvas.addEventListener('mousedown', startDrag, false);
    canvas.addEventListener('mouseup', stopDrag, false);

    canvas.addEventListener('selectstart', function (e) {
        e.preventDefault();
    }, false);
    //canvas.style.MozUserSelect = "none";    
    drawBackground();

    drawCanvas();
};