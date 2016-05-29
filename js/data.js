/**
 * Created by Administrator on 2016/5/28.
 */
var dataObj=function(){
    this.fruitNum=0;
    this.double=1;
    this.score=0;
    this.gameOver=false;
    this.alpha=0;
}
dataObj.prototype.draw=function(){
    var w=can1.width;
    var h=can1.height;

    ctx1.save();
    ctx1.shadowBlur=10;
    ctx1.shadowColor="white";
    ctx1.fillStyle="white";
    //绘制字体放在主函数中，不放在这个循环中，影响代码效率
    ctx1.fillText("SCORE: "+this.score,w*0.5,h-20);
    if(this.gameOver){
        this.alpha+=deltaTime*0.0005;//“GAMEOVER”显示效果
        if(this.alpha>1){
            this.alpha=1;
        }
        ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
        ctx1.fillText("GAME OVER",w*0.5,h*0.5);
    }
    ctx1.restore();
}
dataObj.prototype.addScore=function(){
    this.score+=this.fruitNum*100*this.double;//一个100分
    this.fruitNum=0;
    this.double=1;
}