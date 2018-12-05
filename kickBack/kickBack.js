var body = document.querySelector('body');
    var kickBack = document.querySelector('.kickBack'); //只能找到一个元素
    var $kickBack=$(".kickBack");
    
    var toph = '';
    
    var moveTouch = function(el) {
        this.webType = null;
        this.lastY = ''; //最后一次y坐标点
        this.flag = false;
        this.initY = '';  
        
        if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i)) {
            //alert(navigator.userAgent);
            this.webType = "mobile";
        } else {
           // console.log(navigator.userAgent);
            this.webType = "PC";
        }
        this.startEvent = this.webType == "mobile" ? "touchstart" : "mousedown";
        this.moveEvent = this.webType == "mobile" ? "touchmove" : "mousemove";
        this.endEvent = this.webType == "mobile" ? "touchend" : "mouseup";
        this.startFun = function(event) {
            this.lastY  =  event.pageY || event.touches[0].clientY; //点击屏幕时记录最后一次Y度坐标。
            this.initY = parseInt(el.css("top"));  
            //console.log(2, this.lastY); 
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
                el.css("top", parseInt((this.initY + moveY) * 1.5) + "px");
            }
        }
        this.endFun = function(event) {
            el.animate({
                top: '0px'
            }, 500);
            this.flag = false;
        }

    } 
    var  kickBackfun=function(){
    changeCSS($kickBack);  
    if (navigator.userAgent.match(/(phone|pad|pod|iPhone)/i)) {
        // //如果是ios移动端
        //禁止下拉  
        overscroll(kickBack);
        document.body.addEventListener('touchmove', function(evt) {
            //In this case, the default behavior is scrolling the body, which  
            //would result in an overflow.  Since we don't want that, we preventDefault.  
            if (!evt._isScroller) {
                evt.preventDefault()
            }
        })
    } else if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone)/i))) { //如果不是ios系统,即andriod手机和PC端
        //alert("非ios");
        movetouch = new moveTouch($kickBack);
        kickBack.addEventListener(movetouch.startEvent, movetouch.startFun, false);
        kickBack.addEventListener(movetouch.moveEvent, movetouch.moveFun, false);
        kickBack.addEventListener(movetouch.endEvent, movetouch.endFun, false);
    }
}
    function changeCSS(el1) {
              var el2=el1.find("div:first-child");
              if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad)/i))) {
                el1.removeClass("kickBackNOIOS");
                el2.removeClass("kickBack-contentNOIOS");
                el1.addClass("kickBackIOS");
                el2.addClass("kickBack-contentIOS");
              } else {
                el1.removeClass("kickBackIOS");
                el2.removeClass("kickBack-contentIOS");
                el1.addClass("kickBackNOIOS");
                el2.addClass("kickBack-contentNOIOS");
              }
    }
    function overscroll(el) { //前提是该元素下的子元素的内容高度比该元素的内容高度高
        el.addEventListener('touchstart', function() {
                var top = el.scrollTop,
                    totalScroll = el.scrollHeight,
                    currentScroll = top + el.offsetHeight;
                //If we're at the top or the bottom of the kickBacks  
                //scroll, push up or down one pixel.  
                //  
                //this prevents the scroll from "passing through" to  
                //the body.  
                if (top === 0) {
                    el.scrollTop = 1
                } else if (currentScroll === totalScroll) {
                    el.scrollTop = top - 1
                }
        })
        el.addEventListener('touchmove', function(evt) {
                //if the content is actually scrollable, i.e. the content is long enough  
                //that scrolling can occur  
            if (el.offsetHeight < el.scrollHeight)
                evt._isScroller = true
        })
    }     