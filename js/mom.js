/**
 * Created by Administrator on 2016/5/22.
 */
//大鱼
var momObj=function(){
    this.x;
    this.y;
    this.angle;
    //this.bigEye=new Image();
    //this.bigBody=new Image();
    //this.bigTail=new Image();
    //大鱼尾巴计数器和控制器
    this.bigTailTimer=0;
    this.bigTailCount=0;
    //大鱼眨眼睛
    this.bigEyeTimer=0;
    this.bigEyeCount=0;
    this.bigEyeInterval=1000;
    //大鱼身体
    this.bigBodyCount=0;
};
momObj.prototype.init=function(){
    this.x=canWidth*0.5;
    this.y=canHeight*0.5;
    this.angle=0;
    //this.bigEye.src="./src/bigEye0.png";
    //this.bigBody.src="./src/bigSwim0.png";
    //this.bigTail.src="./src/bigTail0.png";
};
momObj.prototype.draw=function(){

    //lerp x,y——大鱼的位置趋向于鼠标的位置
    this.x=lerpDistance(mx,this.x,0.98);
    this.y=lerpDistance(my,this.y,0.98);
    //delta angle
    //Math.atan2(y,x)
    var deltaY=my-this.y;
    var deltaX=mx-this.x;
    //beta——鼠标与大鱼之间的角度差
    var beta=Math.atan2(deltaY,deltaX)+ Math.PI;//因为Math.atan2值域[-PI,PI]，所以要加PI修正
    //lerp angle——大鱼的角度趋向于鼠标的角度
    this.angle=lerpAngle(beta,this.angle,0.6);//目标值，当前值，百分比

    //大鱼摆动尾巴
    this.bigTailTimer+=deltaTime;
    if(this.bigTailTimer>50){
        this.bigTailCount=(this.bigTailCount+1)%8;//因为图片是7张循环，所以不希望超过7，所以对8取模
        this.bigTailTimer%=50;//回到初始状态
    }
    //大鱼眨眼睛
    this.bigEyeTimer+=deltaTime;
    if(this.bigEyeTimer>this.bigEyeInterval){
        this.bigEyeCount=(this.bigEyeCount+1)%2;
        this.bigEyeTimer%=this.bigEyeInterval;

        if(this.bigEyeCount==0){
            this.bigEyeInterval=Math.random()*1500+2000;
        }else{
            this.bigEyeInterval=200;
        }
    }

    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    var bigTailCount=this.bigTailCount;
    ctx1.drawImage(bigTail[bigTailCount],-bigTail[bigTailCount].width*0.5+30,-bigTail[bigTailCount].height*0.5);

    var bigBodyCount=this.bigBodyCount;
    if(data.double==1){
        ctx1.drawImage(bigBodyOra[bigBodyCount],-bigBodyOra[bigBodyCount].width*0.5,-bigBodyOra[bigBodyCount].height*0.5);
    }else{
        ctx1.drawImage(bigBodyBlue[bigBodyCount],-bigBodyBlue[bigBodyCount].width*0.5,-bigBodyBlue[bigBodyCount].height*0.5);
    }

    var bigEyeCount=this.bigEyeCount;
    ctx1.drawImage(bigEye[bigEyeCount],-bigEye[bigEyeCount].width*0.5,-bigEye[bigEyeCount].height*0.5);
    ctx1.restore();
};