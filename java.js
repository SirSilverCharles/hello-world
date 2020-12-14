function myRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

myCanvas=document.getElementById('canvas');
myContext=myCanvas.getContext("2d");


var pointsA=[];
function addPoints(n){
  for(var i=0;i<n;i++){
    pointsA.push({x:myRand(-20000,-250),y:myRand(-250,250)})
  }
}
addPoints(1000);


var v0=2; //velocidad inicial
var l=1000; //intencidad de dipolo
var dt=0.0001;

function phyStep(){
  for(var i=0;i<pointsA.length;i++){
    var point=pointsA[i];
    var x=point.x;
    var y=point.y;
    var r=Math.sqrt(x*x+y*y);
    var a=Math.atan2(y,x);

    var vr=(v0*r-(l/r))*Math.cos(a);
    var va=-(v0+(l/(r*r)))*Math.sin(a);

    var rf=r+vr*dt;
    var af=a+va*dt;

    var xf=rf*Math.cos(af);
    var yf=rf*Math.sin(af);


    // var xf=r*Math.cos(a);
    // var yf=r*Math.sin(a);

    if(xf>500){
      xf=myRand(-400,-250);
      yf=myRand(-300,300);

      fast--;
    }

    point.x=xf;
    point.y=yf;

    // console.log({x,y,r,a,vr,va,rf,af,xf,yf});
  }
}

var angulo=0;
var backgroundColor="rgba(50,50,120,0.1)";
var particleColor="rgba(150,255,255,1)";

function plott(){
  // myContext.clearRect(0,0,500,500);

  myContext.fillStyle = backgroundColor;
  myContext.fillRect(0,0,500,500);
  myContext.fillStyle = particleColor;

  for(var i=0;i<pointsA.length;i++){
    // myContext.fillRect(pointsA[i].x+250,pointsA[i].y+250,2,2);
    myContext.beginPath();
    myContext.arc(pointsA[i].x+250,pointsA[i].y+250, 0.5, 0, 2 * Math.PI);
    myContext.fill();
  }

}

// for(var i=0;i<1000;i++){
//     phyStep();
// }

var ph=2000;
var fast=600;
var fastFlag=true;
function timeLoop(){
  for(var i=0;i<ph;i++){
      phyStep();
  }
  if(fastFlag && fast<0){
    fastFlag=false;
    ph=10;
    myContext.clearRect(0,0,500,500);
  }
  plott();
}
setInterval(timeLoop,10);




var myCanvas=document.getElementById("canvas");
myCanvas.addEventListener("click",function(){
  var r=myRand(0,pointsA.length-1);
  pointsA[r].x=event.clientX-250;
  pointsA[r].y=event.clientY-250;


});
