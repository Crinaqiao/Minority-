//封装动画函数左右滑动
function animate(obj, target, callback){
    clearInterval(obj.timer);     //清除以前的定时器
    obj.timer = setInterval(function(){
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);      //将step的值取整
        if(obj.offsetLeft == target){
            clearInterval(obj.timer);
            if(callback){      //回调函数
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    },15)
}
