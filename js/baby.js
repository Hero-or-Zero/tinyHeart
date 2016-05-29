/**
 * Created by Administrator on 2016/5/23.
 */
var babyObj=function(){
    this.x;
    this.y;
    this.angle;
    //this.babyEye=new Image();
    //this.babyBody=new Image();
    //this.babyTail=new Image();

    //小鱼尾巴摆动计数器和控制器
    this.babyTailTimer=0;
    this.babyTailCount=0;
    //小鱼眨眼睛计数器和控制器
    this.babyEyeTimer=0;
    this.babyEyeCount=0;
    this.babyEyeInterval=1000;//表示当前图片需要持续多长时间
    //小鱼身体
    this.babyBodyTimer=0;
    this.babyBodyCount=0;
};
babyObj.prototype.init=function(){
    this.x=canWidth*0.5-50;
    this.y=canHeight*0.5+50;
    this.angle=0;
    //this.babyEye.src="./src/babyEye0.png";
    //this.babyBody.src="./src/babyFade0.png";
    //this.babyTail.src="./src/babyTail0.png";
};
babyObj.prototype.draw=function(){
    //lerp x,y-让小鱼跟着大鱼移动
    this.x=lerpDistance(mom.x,this.x,0.98);
    this.y=lerpDistance(mom.y,this.y,0.98);

    //lerp angle
    //Math.atan2(y,x)
    var deltaY=mom.y-this.y;
    var deltaX=mom.x-this.x;
    //beta——大鱼与小鱼之间的角度差
    var beta=Math.atan2(deltaY,deltaX)+ Math.PI;//因为Math.atan2值域[-PI,PI]，所以要加PI修正
    //lerp angle——小鱼的角度趋向于大鱼的角度
    this.angle=lerpAngle(beta,this.angle,0.6);//目标值，当前值，百分比

    //babyTail count-小鱼尾巴摆动计数工作
    this.babyTailTimer+=deltaTime;
    if(this.babyTailTimer>50){
        this.babyTailCount=(this.babyTailCount+1)%8;//因为图片是7张循环，所以不希望超过7，所以对8取模
        this.babyTailTimer%=50;//回到初始状态
    }
    //baby eye
    this.babyEyeTimer+=deltaTime;
    if(this.babyEyeTimer>this.babyEyeInterval){
        this.babyEyeCount=(this.babyEyeCount+1)%2;
        this.babyEyeTimer%=this.babyEyeInterval;

        if(this.babyEyeCount==0){
            this.babyEyeInterval=Math.random()*1500+2000;//[2000,3500)
        }else{
            this.babyEyeInterval=200;
        }
    }
    //baby body
    this.babyBodyTimer+=deltaTime;
    if(this.babyBodyTimer>300){
        this.babyBodyCount=this.babyBodyCount+1;
        this.babyBodyTimer%=300;
        if(this.babyBodyCount>19){
            this.babyBodyCount=19;
            //判断game over
            data.gameOver=true;
        }
    }

    //ctx1
    ctx1.save();
    //转换原点
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    var babyTailCount=this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);

    var babyBodyCount=this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);

    var babyEyeCount=this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);

    ctx1.restore();
};