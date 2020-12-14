function myRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

myCanvas=document.getElementById('canvas');
myContext=myCanvas.getContext("2d");


var n=100;
var angulo=0;
function plott(){
  var circlePointsI=[];
  var circlePointsF=[];
  angulo+=0.01;


  // myContext.clearRect(0,0,500,500);


  for(var i=0;i<n;i++){
     var x=100*Math.cos(2*Math.PI*(i/n));
     var y=100*Math.sin(2*Math.PI*(i/n));
     circlePointsI.push({x:x,y:y})

     var vx=x*(Math.cos(angulo)-1)-y*Math.sin(angulo);
     var vy=x*Math.sin(angulo)-y*(Math.cos(angulo)-1);

     x=x+vx;
     y=y+vy;
    circlePointsF.push({x:x,y:y})
  }

  for(var i=0;i<circlePointsI.length;i++){
    myContext.fillRect(circlePointsI[i].x+250,circlePointsI[i].y+250,1,1);
    myContext.fillRect(circlePointsF[i].x+250,circlePointsF[i].y+250,1,1);
  }
}
setInterval(plott,100);
