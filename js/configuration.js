var checked;
var tabBody;
var totalTime = 0;
var totalSeconds = 0;
var A = -1;
var B = 0;
var storageNames = new Array();

function populateFromStorage(){
	//alert(localStorage.length);
	
	for (i=0; i<=localStorage.length-1; i++)  {  
        key = localStorage.key(i);  
        
        if(key.indexOf("name") != -1){
        	storageNames[i] = localStorage.getItem(key);
        }
        
       // alert(key);
        val = localStorage.getItem(key);  
        //alert(val);
        
        name = localStorage.getItem("name");
        
        
    }
	for(y=0; y<storageNames.length; y++){
		if(storageNames[y] != null)
		addRow(y, storageNames[y], "");
	}
}


function addRow(index, content,morecontent)
{
         if (!document.getElementsByTagName) return;
         tabBody=document.getElementsByTagName("TBODY").item(0);
         row=document.createElement("TR");
         cell1 = document.createElement("TD");
         cell2 = document.createElement("TD");
         cell3 = document.createElement("TD");
         cell4 = document.createElement("TD");
         cell4.innerHTML = "<input name='"+index+"' type='checkbox' onclick='validate()';>";
         cell5 = document.createElement("TD");
         cell5.innerHTML = "<table style='display:none;'><tr><td><select id='time' class='span1' style='height: 20px' onchange='updateTotal();'><option value='0'>0</option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option></select></td><td><div class='input-append'><span class='add-on'>min</span></div></td><td><select id='time' class='span1' style='height: 20px' onchange='updateTotalSeconds();'><option value='0'>0</option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option><option value='11'>11</option><option value='12'>12</option><option value='13'>13</option><option value='14'>14</option><option value='15'>15</option><option value='16'>16</option><option value='17'>17</option><option value='18'>18</option><option value='19'>19</option><option value='20'>20</option><option value='21'>21</option><option value='22'>22</option><option value='23'>23</option><option value='24'>24</option><option value='25'>25</option><option value='26'>26</option><option value='27'>27</option><option value='28'>28</option><option value='29'>29</option><option value='30'>30</option><option value='31'>31</option><option value='32'>32</option><option value='33'>33</option><option value='34'>34</option><option value='35'>35</option><option value='36'>36</option><option value='37'>37</option><option value='38'>38</option><option value='39'>39</option><option value='40'>40</option><option value='41'>41</option><option value='42'>42</option><option value='43'>43</option><option value='44'>44</option><option value='45'>45</option><option value='46'>46</option><option value='47'>47</option><option value='48'>48</option><option value='49'>49</option><option value='50'>50</option><option value='51'>51</option><option value='52'>52</option><option value='53'>53</option><option value='54'>54</option><option value='55'>55</option><option value='56'>56</option><option value='57'>57</option><option value='58'>58</option><option value='59'>59</option></select></td><td><div class='input-append'><span class='add-on'>sec</span></div></td></tr></table>";
         
         textnode1=document.createTextNode(index);
         textnode2=document.createTextNode(content);
         textnode3=document.createTextNode(morecontent);
         //textnode4=document.createTextNode(morecontent);

         cell1.appendChild(textnode1);
         cell2.appendChild(textnode2);
         cell3.appendChild(textnode3);
         row.appendChild(cell1);
         row.appendChild(cell2);
         row.appendChild(cell3);
         row.appendChild(cell4);
         row.appendChild(cell5);
         
         tabBody.appendChild(row);
}
    
function validate(cell){
	
	checked = new Array();
	
	inputs = document.getElementsByTagName('input');
	
	for(i=0; i<inputs.length; i++){
		if(inputs[i].checked){
			checked[i] = true;
		}else{
			table=document.getElementsByTagName("table").item(i+1).style.display="none";
		}
	}
	
//	for(i=0; i<checked.length; i++){
//		alert(i + " : " +checked[i]);
//	}
addTime();

updateTotal();
updateTotalSeconds();
}

function addTime(){
	for(i=0; i<checked.length; i++){
		if(checked[i] == true){
			//alert(document.getElementsByTagName("table").length); 7
			document.getElementsByTagName("table").item(i+1).style.display="block";
			//alert();
		}
	}
}

function updateTotal(){
	A= - 1;
	
	totalTime = 0;
	
	 var selects = document.getElementsByTagName('select');
	 
	 for(i=0; i<selects.length; i=i+2){
		 //alert("A : "+(i-A) + "  i: "+(i));
		 
		 if(checked[(i-A)-1] == true){
			 //alert("true "+i);
		 totalTime += parseInt(selects[i].value);
		 }
		 
		 A = A + 1;
	 }
	 
	 //alert(parseInt(totalTime));
	 
	 var total_time = document.getElementById('total_time');
	// alert(total_time);
	 total_time.innerHTML = totalTime + ","+totalSeconds;
}

function updateTotalSeconds(){
	B = 0;
	
	totalSeconds = 0;
	
var selects = document.getElementsByTagName('select');

for(i=1; i<selects.length; i=i+2){
	//alert("B : "+(i-B)+ "  i: "+(i));
	 if(checked[(i-B)-1] == true){
		// alert("true "+i);
	 totalSeconds += parseInt(selects[i].value);
	 }
	 
	 B = B + 1;
}

//alert(parseInt(totalTime));

var total_time = document.getElementById('total_time');
// alert(total_time);
total_time.innerHTML = totalTime+","+totalSeconds;
}