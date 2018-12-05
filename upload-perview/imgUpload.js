
/* uploadImg START*/
var tip = ''; // 设定提示信息 
var reg=''; 
var fileSize=null;
var isImgValid=false;
var imgData=null;
var imgName=null;
var  canshowImg=true;
var canUpload=false;
var obj={};
var ele = '';
function imgUpload(inputId,obj,uploadUrl){
        obj=obj;
        ele = $("#"+inputId)
        initLimitTip(obj);
        initRegTip(obj.filters);
        // console.log(reg);
}
    

function initLimitTip(obj){
    // console.log(1);
    if(obj.checkWHSet){
        str='max size '+obj.maxWidth+' x '+obj.maxHeight+" pixel";
        $(".limitSize").text(str);
    }
   
}
// $.fn.extend({
//     imgInput: function(event,obj) {
//         $(this).click(function() {
//             alert($(this).val());
//         });
//     }
// });

function selectImage(file,callback){
    console.log(file)
    console.log(file.value,reg);
    ele = $(file)
    fileSize =file.files[0].size/1024;
    if (window.FileReader) { // html5方案 
        var fr = new FileReader();
        fr.readAsDataURL(file.files[0]);
        fr.onload = function (e) {
             imgData = e.target.result;
             imgSrc=file.value;
             if(callback){
                callback(imgData)
             }
             
             console.log(reg.test(imgSrc));
             if (!reg.test(imgSrc)) {
                alert_error(tip);
            }else{
                console.log(15);
                checkSize(imgData);
            } 
        }
    } else { // 降级处理  不支持h5的写法   /
        if (!reg.test(file.value)) {
            alert_error(tip);
        }else{  
            //checkSize(imgData);
            canUpload=true;
            showPrvImg(file.value);
        }    
    }     
}      

function checkSize(data) {
    console.log(17);
    var image = new Image();
    image.src = data;
    image.onload = function () {
        // console.log(image.width,image.height,fileSize+'k');
        var width = image.width;
        var height = image.height;
        // console.log(18);
        if( obj.checkWHSet&&(width> obj.maxWidth||height> obj.maxHeight)){
            alert_error('图片太大了，尺寸最好在: '+ obj.maxWidth+' x '+ obj.maxHeight+" 以下") 
            canshowImg=false;
        }else if( obj.checkSizeSet&&(fileSize> obj.maxSize)){
             alert_error('图片太大了，大小最好在: '+ obj.maxSize+'以下') 
             canshowImg=false;
        }else{
            // console.log(19);
            canshowImg=true;
            showPrvImg(imgData,getFileName(imgSrc));
        }
    }; 
} 
function showPrvImg(data,name){
    if(canshowImg){
        
        imgName=name||'';
        // console.log(typeof(data));
        var imgBoxHtml='<div class=" img_preview">'+
                            '<span class="close">'+
                                '<span aria-hidden="true" onclick="cancel()">×</span>'+
                            '</span>'+
                            '<div class=" imgDiv " >'+
//                                '<img class="img180h" src="'+img_url+'/web/uploads/images/'+data+'" />'+
                                '<img class="img180h" src="'+data+'" />'+
                                '<p class="text-center">'+
                               // '<i  class="glyphicon glyphicon-upload  pull-left  text-primary" onclick="uploadImage()"></i>'+
                                //getFileName(imgSrc)+
                                '<i  class="glyphicon glyphicon-trash pull-right text-danger" onclick="cancel()"></i>'+
                                '</p>'+
                             '</div>'+
                        '</div>';    
       $('.js_imgBox').html(imgBoxHtml);
       $(".form-control[name='thumbnail_url']").val(imgName);
        canUpload=true;
    }
}
function getFileName(tmp_imgpath){
    var i = tmp_imgpath.lastIndexOf("\\");
			console.log(i);
			console.log(tmp_imgpath.slice(i+1));
			var tmp_imgname = tmp_imgpath.slice(i+1);
    return tmp_imgname
}
function initRegTip(arr){
    // console.log(arr);
   for(let i=0;i<arr.length;i++){
    // console.log([i]);
       if(i==0){
           reg+='.'+arr[i];
           tip='Only can upload '+arr[i];
       }else{
           reg+='|.'+arr[i];
           tip+=' or '+arr[i];
           
       }
   }
   reg=new RegExp(reg,'i');
}
function cancel(){
    $('.js_imgBox').html('');
    $(".form-control[name='thumbnail_url']").val('');
    ele.trigger('removeData')
    imgData='delete';
   
}

function uploadImage() { 
    if(canUpload){
        canUpload=false;
        $.ajax({
            type: 'POST',
            url: uploadUrl,
            data: {
                    image: imgData
            },
            async: false,
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    //alert('上传成功');
                    alert_success('上传成功')
                    var imgUrl=data.src;//此處添加需要拿到相應的 遠程圖片鏈接
                    $("#"+inputId).val(imgUrl);document.getElementById("inputFileValue").changedFile

                } else {
                 alert_error('上传失败') 
                }
            }
        })
    }        
       
}

/* uploadImg end*/

/**HTML
 *  <div class="form-group  m-t-10" >
        <label for="exampleInputFile">Logo</label>
        <span class="form-right limitSize"></span>
        <div class="js_imgBox"></div>
        <div  class="InputFileBox flex">
            <input type="text" class="InputFileValue form-control" name="thumbnail_url" disabled id="inputFileValue" />
            <div class="btn  btn-primary InputFilebtn">upload 
                <input type="file" data-type="uploadImg" class="InputFile" id="exampleInputFile" onchange="selectImage(this)">
            </div>
        </div>
    </div> 
 * 
 */
/*CSS

  .img_preview{
	border-radius: 5px;
	border: 1px solid #ddd;
	padding: 5px;
	width: 100%;
	margin-bottom: 5px;
	overflow: hidden;
}
.imgDiv{
	margin: 0 auto;
    margin-left: 50%;
    transform:translateX(-50%);
	border: 1px solid #ddd;
	box-shadow: 1px 1px 5px 0px #a2958a;
	padding: 5px;
	display: table;
	text-align: center;
	vertical-align: middle;
	height:180px;
}
.img_preview{
	border-radius: 5px;
	border: 1px solid #ddd;
	padding: 5px;
	width: 100%;
	margin-bottom: 5px;
	overflow: hidden;
}
.imgDiv{
	margin: 0 auto;
  margin-left: 50%;
	transform: translateX(-50%);
	border: 1px solid #ddd;
	box-shadow: 1px 1px 5px 0px #a2958a;
	padding: 5px;
	display: table;
	text-align: center;
	vertical-align: middle;
	height:180px;
}
.imgDiv:hover{	
	box-shadow: 1px 1px 5px 0px #000;
}
.img180h{
	height:160px;
	width:auto;
	margin-bottom: 5px;
}
.imgDiv:hover{	
	box-shadow: 1px 1px 5px 0px #000;
}
.img180h{
	height:160px;
	width:auto;
	margin-bottom: 5px;
} 
.InputFilebtn {
	position: relative;
    width: 104px;
    height: 100%;
    border-radius: 0;
    font-size: 14px;
    text-align: center;
    padding: 6px 0;
  }
  .InputFile {
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	opacity: 0;
	}
 */
/**  调用方法
 * var obj={
    maxWidth:800,
    maxHeight:800,
    maxSize:150,
    checkSizeSet:false,
    checkWHSet:true,
    filters:['png','jpg']
}
imgUpload('inputFileValue',obj,'url');
showPrvImg(data,name)
 */