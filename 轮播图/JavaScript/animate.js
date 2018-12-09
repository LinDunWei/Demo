 /*返回当前样式属性*/
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];            //兼容IE浏览器
    }
    else
    {
        return window.getComputedStyle(obj,null)[attr];    //兼容W3C浏览器
    }
}

/*多属性缓动运动框架*/
function animate(obj,json){   // 给谁,属性值如何？     属性由json来遍历
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
    var flag = true;    //用来判断是否停止定时器
    //计算步长step  由（target 目标位置减去 current 当前位置）/10    缓动效果
    //开始遍历json以便得到需要的样式属性
    for(var attr in json){                          //遍历json的写法     attr 属性   in   json
        var current = parseInt(getStyle(obj,attr));

        var step = (json[attr] - current)/10;   //json[attr] 是属性值 

        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        obj.style[attr] = current + step + "px";

        if( current != json[attr]){   //如果其中有一个属性不到目标位置 则不停止定时器
            flag  =  false;
        }
        if(flag){
            clearInterval(obj.timer);
        }
    }    
    },30)
}