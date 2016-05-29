/**
 * Created by Administrator on 2016/5/20.
 */
//果实
var fruitObj=function(){
    this.alive=[];//bool
    this.x=[];
    this.y=[];
    this.aneNO=[];
    this.l=[];
    this.spd=[];//速度
    this.fruitType=[];
    this.orange=new Image();
    this.blue=new Image();
};
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.alive[i]=false;
        this.x[i]=0;
        this.y[i]=0;
        this.aneNO[i]=0;
        //this.l[i]=0;
        this.spd[i]=Math.random()*0.017+0.003;//[0.003,0.02]
        this.fruitType[i]="";
    }
    this.orange.src="./src/fruit.png";
    this.blue.src="./src/blue.png";
};
fruitObj.prototype.draw=function(){
    for(var i=0;i<this.num;i++){
        //draw
        //find an ane,grow,fly up
        if(this.fruitType[i]=="blue"){
            var pic=this.blue;
        }else{
            var pic=this.orange;
        }
        if(this.alive[i]){
            if(this.l[i]<=14){//果实成长，限制果实的长度
                this.x[i]=ane.headx[this.aneNO[i]];//果实生长位置的x和y坐标
                this.y[i]=ane.heady[this.aneNO[i]];
                this.l[i]+=this.spd[i]*deltaTime;//*deltaTime使过渡更平滑
                ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
            }else{
                this.y[i]-=this.spd[i]*7*deltaTime;
                ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
            }
            if(this.y[i]<-10){
                this.alive[i]=false;
            }
        }
    }
};
fruitObj.prototype.born=function(i){
    this.aneNO[i]=Math.floor(Math.random()*ane.num);
    this.l[i]=0;
    this.alive[i]=true;
    var ran =Math.random();
    if(ran<0.2) {
        this.fruitType[i]="blue";//orange,blue
    }else{
        this.fruitType[i]="orange";
    }
};
fruitObj.prototype.update=function(){
    var num=0;
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            num++;
        }
    }

};
//果实"死亡"-被吃掉
fruitObj.prototype.dead=function(i){
    this.alive[i]=false;
};
//控制果实数量15个
function fruitMonitor(){
    var num=0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]){
            num++;
        }
    }
    if(num<15){
        //send fruit
        sendFruit();
        return;
    }
}
function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}