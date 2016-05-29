/**
 * Created by Administrator on 2016/5/29.
 */
var dustObj=function(){
    this.x=[];
    this.y=[];
    this.amp=[];//振幅
    this.NO=[];
    this.alpha;//三角函数需要的角度
}
dustObj.prototype.num=30;//定义物体池有30个
dustObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.x[i]=Math.random()*canWidth;
        this.y[i]=Math.random()*canHeight;
        this.amp[i]=20+Math.random()*25;
        this.NO[i]=Math.floor(Math.random()*7);//[0,7)
    }
    this.alpha=0;
}
dustObj.prototype.draw=function(){
    this.alpha+=deltaTime*0.0008;//这个角度要与海葵的摆动一致你，不然显得不协调
    var l=Math.sin(this.alpha);
    for(var i=0;i<this.num;i++){
        var no=this.NO[i];
        ctx1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]);
    }
}