//封装动画函数上下滑动
function animatetop(obj, target, callback){
    clearInterval(obj.timer);     //清除以前的定时器
    obj.timer = setInterval(function(){
        var step = (target - obj.offsetTop) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);      //将step的值取整
        if(obj.offsetTop == target){
            clearInterval(obj.timer);
            if(callback){      //回调函数
                callback();
            }
        }
        obj.style.top = obj.offsetTop + step + 'px';
    },15)
}