/*大图片的懒加载*/
function loadImg(){
    $('img[data-src]').each(function(i, obj){
        var _src=$(this).attr("data-src");
        $(this).attr("src",_src);

    });
}

/*body等比缩放*/
// <body class="flexBlock body1">
// 	<script>
	$(function () {HautoFit();})//一定要放在body下面
// 	</script>
// </body>
window.onresize = function () {
	HautoFit();
}
function Hresize() {
    var winratio = $(window).width() / 1920;
    //var height = $(window).height();
    //console.log(winratio);
    if(winratio<1){
        $('.body1').css({
            transform: "scale("+winratio+")",
            transformOrigin: "left top"
        });
    }
}
function HautoFit() {
   var swidth = $(window).width();
    if (swidth > 1320 || swidth === 1320) {
        Hresize();
    }
}

