 var map=[];
 var showmap=[];
 var clcikmap=[];
 var mapHeight=9;
 var mapWidth=9;
 var bombNumber=10;
 var firstClickBoolean=true;
 var t=1;
 var timer;
 var cells;
 var m=document.querySelector('.map');
 var bombs=document.querySelector('.bombs');
 var time=document.querySelector('.time'); 
 var emoji=document.querySelector('.emoji');
document.querySelector('.stage').style.width=(mapWidth+1)*5+'vmin';
document.querySelector('.level').style.width=(mapWidth+1)*5+'vmin';
emoji.addEventListener('click',function(){init();})
document.querySelector('.easy').addEventListener('click',function(){
	mapHeight=9;mapWidth=9;bombNumber=10;initGame();init();})
document.querySelector('.normal').addEventListener('click',function(){
	mapHeight=15;mapWidth=15;bombNumber=30;initGame();init();})
document.querySelector('.hard').addEventListener('click',function(){
	mapHeight=15;mapWidth=25;bombNumber=60;initGame();init();})
m.oncontextmenu=function(){
	return false;
}

initGame();
function initGame(){

	m.style.height=mapHeight*5+'vmin';
	m.style.width=mapWidth*5+'vmin';
	bombs.innerHTML=bombNumber;
	map=[];showmap=[];clcikmap=[];cells=[];
	m.innerHTML="";
	 for (var i = 0; i <mapHeight*mapWidth; i++) {
 	map.push(0);
 	showmap.push(0);
 	clcikmap.push(true);
 	var d=document.createElement("div");
 	d.className="cell button";
 	d.id=i;
	m.appendChild(d);
 	}

	cells=document.querySelectorAll(".cell");
 for (var i = 0; i < cells.length; i++) {
 	cells[i].addEventListener("mousedown",mouseEvent); 
 }

}

function mouseEvent(e){
 		var btnNum = e.button;
 		if (btnNum == 2) {flag(e); }
 		 else if (btnNum == 0) { bclick(e); }  
 	}


function init(){
	if (timer!=null) {
 		 clearInterval(timer);
 	}
	time.innerHTML="000";

	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener("mousedown",mouseEvent); 
		cells[i].addEventListener("mousedown",mouseEvent); 
	 	cells[i].className="cell button";
	 	cells[i].innerHTML="";
	 	map[i]=0;
		showmap[i]=0;
		clcikmap[i]=true;
 	}
 	firstClickBoolean=true;
 	t=1;
	emoji.className="emoji emoji_smile";

}


function flag(i){
	var number=i.target.id;
	if (showmap[number]!=1) {
	cells[number].classList.toggle("flag");
	clcikmap[number]=!clcikmap[number];
}}

function bclick(i) {
	//console.log(i.target.id);
	var number=i.target.id;
	if (clcikmap[number]) {
	
	if (firstClickBoolean) {firstClick(i.target.id);}
	

	if (showmap[number]!=1) {
		if (map[number]!=-1&&map[number]!=0) {
			show(number);
			cells[number].innerHTML=map[number];
			showmap[number]=1;
		}else if (map[number]==-1) {
		 	cells[number].classList.add("backgroundRed");
		 	emoji.classList.remove("emoji_smile");
		 	emoji.classList.add("emoji_cry");
		 	gameover();
		}else{ clickSpace(number);} 
	}

	if(win()){
		 	emoji.classList.remove("emoji_smile");
		 	emoji.classList.add("emoji_laugh");
		gameover();
	}
}}
function win(){
	 
	for (var i = 0; i < map.length; i++) {
		if (map[i]!=-1) {
			if (showmap[i]!=1) {
					return false;
			}
		}
	}
	return true;
}

function timeCounter(){
	
	if (t<10) {
	time.innerHTML='00'+t;
	}else if(t<100){
	time.innerHTML='0'+t;
	}else{
	time.innerHTML=t;}
	t++;
}
function firstClick(n){
	timer=setInterval(timeCounter,1000);
	/*設炸彈*/
	if (n>mapHeight*mapWidth/2) {
		for (var i = 0; i < bombNumber; i++) {
			map[i]=-1;
		}
	}else{
		for (var i = mapHeight*mapWidth-1; i >  mapHeight*mapWidth-1-bombNumber; i--) {
			map[i]=-1;
		}

	}
	/*隨機交換*/
var tmp,tmp1,tmp2;
	for (var i = 0; i < mapHeight*mapWidth ; i++) {
		tmp1=Math.floor(Math.random()*mapHeight*mapWidth);
		tmp2=Math.floor(Math.random()*mapHeight*mapWidth);
		if (tmp1!=n&&tmp2!=n) {
		tmp=map[tmp1];
		map[tmp1]=map[tmp2];
		map[tmp2]=tmp;
		}
	}
	
	//寫入數字
	 for (var i = 0; i < map.length; i++) {
	 		 if (map[i]!=-1) { 
	 		 	if (i%mapWidth!=0&&i>=mapWidth) {if (map[i-1-mapWidth]==-1) { map[i]++;}}
	 		 	if (i>=mapWidth) {if (map[i-mapWidth]==-1) { map[i]++;}}
	 		 	if (i%mapWidth!=mapWidth-1&&i>=mapWidth) {if (map[i+1-mapWidth]==-1) { map[i]++;}}
	 		 	if (i%mapWidth!=0&&mapHeight*mapWidth-i>mapWidth) {if (map[i-1+mapWidth]==-1) { map[i]++;}}
	 		 	if (mapHeight*mapWidth-i>mapWidth) {if (map[i+mapWidth]==-1) { map[i]++;}}
	 		 	if (i%mapWidth!=mapWidth-1&&mapHeight*mapWidth-i>mapWidth) {if (map[i+1+mapWidth]==-1) { map[i]++;}}
	 		 	if (i%mapWidth!=0) {if (map[i-1]==-1) { map[i]++;}}
	 		 	if (i%mapWidth!=mapWidth-1) {if (map[i+1]==-1) { map[i]++;}}
	 		 }
	 	}	


	 	firstClickBoolean=false;
}
function gameover(){
 clearInterval(timer);
	for (var i = 0; i < cells.length; i++) {
		if(map[i]==-1){
		cells[i].classList.remove('button'); 
		cells[i].classList.add('bomb'); 
		}else if(!clcikmap[i]&&showmap[i]==0){
		cells[i].classList.remove('flag'); 
		cells[i].classList.add('flagX'); 
		}
	}

	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener("mousedown",mouseEvent); 
	}

}


function clickSpace(number){

	var space=[]; 
		space.push(number);
		showmap[number]=1;show(number);
		do{
		var i=parseInt(space[0]);
				if (i>=mapWidth) {if (showmap[i-mapWidth]!=1){ show(i-mapWidth); showmap[i-mapWidth]=1;if (map[i-mapWidth]==0){space.push(i-mapWidth);}}}
	 		 	if (mapHeight*mapWidth-i>mapWidth) {if (showmap[i+mapWidth]!=1){ show(parseInt(i)+parseInt(mapWidth));showmap[i+mapWidth]=1;if (map[i+mapWidth]==0){ space.push(i+mapWidth);}}} 	
	 		 	if (i%mapWidth!=0) {if ( showmap[i-1]!=1) { show(i-1);showmap[i-1]=1; if (map[i-1]==0){space.push(i-1);}}}
	 		 	if (i%mapWidth!=mapWidth-1) {if (showmap[i+1]!=1) { show(i+1);showmap[i+1]=1; if (map[i+1]==0){space.push(i+1);}}}


	 		 	if (i%mapWidth!=mapWidth-1&&mapHeight*mapWidth-i>mapWidth){if (showmap[i+1+mapWidth]!=1&&map[i+1+mapWidth]!=0){ show(i+1+mapWidth); showmap[i+1+mapWidth]=1;}}
	 		 	if (i%mapWidth!=mapWidth-1&&i>=mapWidth){if (showmap[i+1-mapWidth]!=1&&map[i+1-mapWidth]!=0){ show(i+1-mapWidth); showmap[i+1-mapWidth]=1;}}
	 		 	if (i%mapWidth!=0&&mapHeight*mapWidth-i>mapWidth){if (showmap[i-1+mapWidth]!=1&&map[i-1+mapWidth]!=0){ show(i-1+mapWidth); showmap[i-1+mapWidth]=1;}}
	 		 	if (i%mapWidth!=0&&i>=mapWidth){if (showmap[i-1-mapWidth]!=1&&map[i-1-mapWidth]!=0){ show(i-1-mapWidth); showmap[i-1-mapWidth]=1;}}


			space.shift();
		}while(space.length!=0);
}
function show(number){
		 
		cells[number].classList.remove('button');
		cells[number].classList.remove("flag");

		if (map[number]!=0) {
			cells[number].innerHTML=map[number];

			if (map[number]==1) {
				cells[number].classList.add('blue');
			}else if (map[number]==2) {
				cells[number].classList.add('green');
			}else if (map[number]==3) {
				cells[number].classList.add('red');
			}else {
				cells[number].classList.add('orange');
			} 
		}
		 
}