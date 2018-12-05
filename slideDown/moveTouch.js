 var moveTouch = function() {
     this.webType = null;
     this.lastY = ''; //最后一次y坐标点
     this.flag = false;
     this.initY = '';  
     if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i)) {
         alert(navigator.userAgent);
         this.webType = "mobile";
     } else {
         console.log(navigator.userAgent);
         this.webType = "PC";
     }
     this.startEvent = this.webType == "mobile" ? "touchstart" : "mousedown";
     this.moveEvent = this.webType == "mobile" ? "touchmove" : "mousemove";
     this.endEvent = this.webType == "mobile" ? "touchend" : "mouseup";
     this.startFun = function(event) {
         this.lastY  =  event.pageY || event.touches[0].clientY; //点击屏幕时记录最后一次Y度坐标。
         this.initY = parseInt($(".container").css("top"));  
         console.log(2, this.lastY); 
         this.flag = true;

     }
     this.moveFun = function(event) {
         if (!this.flag) {
             return false;
         }
         var  y  = event.pageY ||  event.touches[0].clientY;        
         var  st  =  $(this).scrollTop();  //滚动条高度  
         var moveY = y - this.lastY;
         console.log(moveY);
         if (moveY > 10 && moveY < 90) { //如果向下滑动10px到100px,则执行向下回弹
             console.log(1);
             $(".container").css("top", (this.initY + moveY) * 2 + "px");
         }
     }
     this.endFun = function(event) {
         $(".container").animate({
             top: '0px'
         }, 500);
         this.flag = false;
     }

 }