var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic=new Image();

var ane;//海葵对象

var fruit;//果实对象

var mom;//大鱼对象

var mx;//鼠标位置
var my;

//小鱼尾巴摆动动画图片数组
var babyTail=[];
//小鱼眨眼睛
var babyEye=[];
//小鱼身体
var babyBody=[];

//大鱼尾巴
var bigTail=[];
//大鱼眼睛
var bigEye=[];
//大鱼身体
var bigBodyOra=[];
var bigBodyBlue=[];

//分值计算
var data;

//圈圈特效，物体池
var wave;

//大鱼喂小鱼
var  halo;

//漂浮物
var dust;
var dustPic=[];

//游戏状态
var STATE=0;//0-未开始，1-游戏开始

document.body.onload=game;
function game(){
	document.getElementById("btn").onclick=function(){
		document.getElementById("cover").style.zIndex=-1;
		this.STATE=1;//点击开始按钮，游戏状态为开始
		if(this.STATE==1){
			init();
			lastTime=Date.now();
			deltaTime=0;
			gameloop();
		}
	}
}
function init(){
	//获得canvas content
	//fishes,dust,UI,circle
	can1 = document.getElementById("canvas1");
	ctx1 = can1.getContext("2d");
	//background,ane,fruits
	can2 = document.getElementById("canvas2");
	ctx2 = can2.getContext("2d");

	//绑定鼠标移动事件
	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src="./src/background.jpg";
	canWidth=can1.width;
	canHeight=can1.height;

	ane = new aneObj();
	ane.init();

	fruit=new fruitObj();
	fruit.init();

	mom=new momObj();
	mom.init();

	baby=new babyObj();
	baby.init();

	mx=canWidth*0.5;
	my=canHeight*0.5;

	//初始化小鱼尾巴图片
	for(var i=0;i<8;i++){
		babyTail[i]=new Image();
		babyTail[i].src="./src/babyTail"+i+".png";
	}
	//初始化小鱼眼睛图片
	for(var i=0;i<2;i++){
		babyEye[i]=new Image();
		babyEye[i].src="./src/babyEye"+i+".png";
	}
	//小鱼身体
	for(var i=0;i<20;i++){
		babyBody[i]=new Image();
		babyBody[i].src="./src/babyFade"+i+".png";
	}

	//加载大鱼尾巴图片数组
	for(var i=0;i<8;i++){
		bigTail[i]=new Image();
		bigTail[i].src="./src/bigTail"+i+".png";
	}
	//加载大鱼眼睛图片
	for(var i=0;i<2;i++){
		bigEye[i]=new Image();
		bigEye[i].src="./src/bigEye"+i+".png";
	}
	//大鱼身体
	for(var i=0;i<8;i++){
		bigBodyOra[i]=new Image();
		bigBodyBlue[i]=new Image();
		bigBodyOra[i].src="./src/bigSwim"+i+".png";
		bigBodyBlue[i].src="./src/bigSwimBlue"+i+".png";
	}
	//初始化果实
	data=new dataObj();
	//设置绘制字体
	ctx1.font="30px Verdana";
	ctx1.textAlign="center";

	//实例化wave
	wave=new waveObj();
	wave.init();

	//实例化halo
	halo=new haloObj();
	halo.init();

	//初始化漂浮物
	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src="./src/dust"+i+".png";
	}
	dust=new dustObj();
	dust.init();
}
function gameloop(){
	//需要根据不同浏览器配适，导入的commonFunction就是配适的js文件
	window.requestAnimFrame(gameloop);//setInterval,setTimeout
	var now =Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	//因为chrome浏览器的机制，防止标签页切出去果实无限变大
	if(deltaTime>40){
		deltaTime=40;
	}
	//

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	//画大鱼之前先清除
	ctx1.clearRect(0,0,800,600);
	mom.draw();

	//绘制小鱼
	baby.draw();

	//大鱼吃掉果实
	momFruitsCollision();
	//大鱼喂小鱼
	momBabyCollision();

	//绘制分值
	data.draw();

	//画圈圈
	wave.draw();

	//喂小鱼
	halo.draw();

	//画漂浮物
	dust.draw();
}
//检测鼠标位置
function onMouseMove(e){
	if(!data.gameOver){//同理，只有游戏没有结束时，鼠标才能控制大鱼的移动
		if(e.offSetX|| e.layerX){
			mx= e.offSetX==undefined? e.layerX: e.offSetX;
			my= e.offSetY==undefined? e.layerY: e.offSetY;
		}
	}
}