window.onload = function(){

    function $(id){ return document.getElementById(id);}
    var iNow = 0;   //控制播放张数
    var banner = $("banner");
    var ul = $("bannerul");
    
    var ulLis = ul.children; //获得全部要做动画的图片

    var scrollWidth = banner.clientWidth; //得到大盒子宽度，也是图片要走的距离

    //第一张图留在中央，其他图片移至720位置
    for(var i=1;i<ulLis.length;i++){
        ulLis[i].style.left = scrollWidth + "px";
    }


    var btn = $("arr").children;
    
    for(var k in btn){
        /*当点击(左)右侧按钮时，当前图片慢慢走到(右)左侧，下一张图片无论在左侧还是在右侧，
        都先快速地移动到(左)右侧，再从(左)右侧慢慢进入舞台。
        */
        btn[k].onclick = function(){
            if(this.className == "l-btn"){
                //alert("左");
                animate(ulLis[iNow],{left:scrollWidth}); //当前图片向右边出去
                iNow--;
                if(iNow < 0){
                    iNow = ulLis.length-1;
                }
                ulLis[iNow].style.left = -scrollWidth + "px";  //无论在左在右，都先回到左侧-720px的位置
                animate(ulLis[iNow],{left:0});  //下一张再从左边往中间进来
                setColor();
            }
            else if(this.className == "r-btn"){
                //alert("右");
            /*    animate(ulLis[iNow],{left:-scrollWidth}); //当前图片向左边出去
                iNow++;
                if(iNow > ulLis.length - 1){
                    iNow = 0;
                }
                ulLis[iNow].style.left = scrollWidth + "px";  //无论在左在右，都先回到右侧720px的位置
                animate(ulLis[iNow],{left:0});  //下一张再从右边往中间进来    */
                autoplay();
                
            }

        }
    }

    var jcontrol = document.getElementById("j-control");
    var olLis = jcontrol.children;
    for(var j in olLis){
        olLis[j].onmouseover = function(){
            var that = this.innerHTML-1;  //获取当前索引号：我需要知道点击的是第几张
            //console.log(typeof that);
            //alert(this.innerHTML);
            if(that > iNow){              //如果点击的张数索引大于当前舞台图片的张数
                animate(ulLis[iNow],{left:-scrollWidth});      //舞台图片移动到左侧
                ulLis[that].style.left = scrollWidth + "px";   //点击的张数瞬间到右侧
                //animate(ulLis[that],{left:0});
            }else if(that < iNow){
                animate(ulLis[iNow],{left:scrollWidth});
                ulLis[that].style.left = -scrollWidth + "px";
                //animate(ulLis[that],{left:0});
            }
            iNow = that;
            animate(ulLis[that],{left:0});
            /*给当前圆圈设置class*/
            for(var i=0;i<olLis.length;i++){
                olLis[i].className = "";
            }
            this.className = "j-crt";
        }
    }
    /*最后加定时器，注意，定时器与右侧按钮逻辑一样*/
    var timer = null;
    timer = setInterval(autoplay,3000);
    function autoplay(){
        animate(ulLis[iNow],{left:-scrollWidth}); //当前图片向左边出去
            iNow++;
            if(iNow > ulLis.length - 1){
                iNow = 0;
            }
            ulLis[iNow].style.left = scrollWidth + "px";  //无论在左在右，都先回到右侧720px的位置
            animate(ulLis[iNow],{left:0});  //下一张再从右边往中间进来
            for(var i=0;i<olLis.length;i++){
                olLis[i].className = "";
            }
            olLis[iNow].className = "j-crt";
            
    }
    /*鼠标进出入banner关闭/开启定时器以及左右两侧按钮的浮现/隐藏*/
    var arr = $("arr");
    banner.onmouseover = function() {
        clearInterval(timer);
        arr.style.display = "block";
    }
    banner.onmouseout = function() {
        clearInterval(timer);  // 要执行定时器 先清除定时器
        timer = setInterval(autoplay,3000);  // 开启定时器
        arr.style.display = "none";
    }

    function setColor(){
        for(var i=0;i<olLis.length;i++){
            olLis[i].className = "";
        }
        olLis[iNow].className = "j-crt";
    }
}