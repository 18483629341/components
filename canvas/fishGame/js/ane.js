 var aneObj = function() {
     this.rootx = [];
     this.headx = [];
     this.heady = [];
     this.len = [];
     this.alpha = 0;
 }
 aneObj.prototype.num = 50;
 aneObj.prototype.init = function() {

     for (let i = 0; i < this.num; i++) {
         this.rootx[i] = i * 15 + Math.random() * 20;
         this.headx[i] = this.rootx[i];
         this.heady[i] = canh - 200 + Math.random() * 50;
         this.len[i] = 150 + Math.random() * 50;
         // console.log(i);
     }

 }
 aneObj.prototype.draw = function() {
     console.log(deltaTime * 0.001);
     this.alpha = parseInt(deltaTime * 0.001);
     //  console.log(Math.sin(this.alpha));
     var l = Math.sin(this.alpha);
     ctx2.save();
     ctx2.strokeStyle = "#3b154e";

     ctx2.globalAlpha = 0.6;
     ctx2.lineWidth = 13;
     ctx2.lineCap = "round";

     for (var i = 0; i < this.num; i++) {

         ctx2.beginPath();
         ctx2.moveTo(this.rootx[i], canh);
         ctx2.quadraticCurveTo(this.rootx[i], canh - 150, this.headx[i] + l * 40, this.heady[i]);


         ctx2.stroke(); //
         ctx2.closePath();
     }
     ctx2.restore();

 }