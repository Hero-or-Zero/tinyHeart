/**
 * Created by Administrator on 2016/5/23.
 */
/*大鱼"吃果实"*/
//原理:判断大鱼和果实的距离
function momFruitsCollision(){
    if(!data.gameOver){//只有gameOver为false，也就是游戏没有结束时，大鱼才可以吃到果实
        for(var i=0;i<fruit.num;i++){
            //先判断果实是否是alive状态
            if(fruit.alive[i]){
                //collision length-计算之间的距离
                var l=calLength2(fruit.x[i],fruit.y[i], mom.x, mom.y);
                if(l<900){
                    //fruit eaten:果实被吃掉
                    fruit.dead(i);
                    //分值
                    data.fruitNum++;
                    mom.bigBodyCount++;
                    if(mom.bigBodyCount>7){
                        mom.bigBodyCount=7;
                    }
                    if(fruit.fruitType[i]=="blue"){//蓝色果实加倍
                        data.double=2;
                    }
                    //发生碰撞的时候就出生小圈圈
                    wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }
    }
}
//mom baby collosion-大鱼与小鱼的距离
function momBabyCollision(){
    if(data.fruitNum>0&&!data.gameOver){//只有大鱼吃到果实，与小鱼碰撞才会是小鱼变色
        var l=calLength2(mom.x,mom.y,baby.x,baby.y);
        if(l<900){
            //baby recover-碰到小鱼后小鱼回到初始状态
            baby.babyBodyCount=0;
            //喂到小鱼后，序列帧恢复初始状态
            mom.bigBodyCount=0;
            //分值更新update
            data.addScore();
            //draw halo
            halo.born(baby.x,baby.y);
        }
    }
}