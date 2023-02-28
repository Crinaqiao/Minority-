//页面加载完成后再执行
window.addEventListener('load',function(){
     //鼠标经过列表向下滑动，鼠标离开列表滑回原位
     var menu = document.querySelector('.menu');
     var sliding1 = document.querySelector('.sliding1');
     var sliding2 = document.querySelector('.sliding2');
     var sliding3 = document.querySelector('.sliding3');
     menu.children[0].addEventListener('mouseover',function(){
         animatetop(sliding1,-530)
     })
     menu.children[0].addEventListener('mouseout',function(){
        animatetop(sliding1,-660)
    })
    menu.children[3].addEventListener('mouseover',function(){
        animatetop(sliding3,-530)
    })
    menu.children[3].addEventListener('mouseout',function(){
       animatetop(sliding3,-660)
    })
    menu.children[2].addEventListener('mouseover',function(){
     animatetop(sliding2,-530)
    })
    menu.children[2].addEventListener('mouseout',function(){
     animatetop(sliding2,-720)
    })
     //鼠标经过显示左右按钮，离开时隐藏左右按钮
    var arrowleft = document.querySelector('.arrow-left');
    var arrowright = document.querySelector('.arrow-right');
    var shuffling = document.querySelector('.shuffling');
    shuffling.addEventListener('mouseleave',function(){
        animate(arrowleft,115,function(){
            arrowleft.style.display = 'none';
        })
        animate(arrowright,1190,function(){
            arrowright.style.display = 'none';
        })
        //鼠标离开定时器继续执行，图片开始自动轮播
        timer = setInterval(function(){
            arrowright.click()
        },4000)
    });
    shuffling.addEventListener('mouseenter',function(){
        arrowleft.style.display = 'block';
        arrowright.style.display = 'block';
        arrowleft.style.left = '115px';
        arrowright.style.left = '1190px';
        animate(arrowleft,135);
        animate(arrowright,1170);
        //鼠标经过同时清除定时器，图片停止自动轮播
        clearInterval(timer);
        timer = null;
    })     
    //动态生成底部小圆圈
    var ul = shuffling.querySelector('ul');
    var ol = shuffling.querySelector('ol');
    for(i = 0;i < ul.children.length;i++){
        var li = document.createElement('li');
        li.setAttribute('index',i);
        ol.appendChild(li);
        //点击底部小圆圈，图片呈现轮播效果
        li.addEventListener('click',function(){
            for(i = 0;i < ol.children.length;i++){
                ol.children[i].className = '';
            }
            this.className = 'circle-bc';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            //调用动画函数，使图片左右移动
            animate(ul, -index * 1500); 
        })
    }
    //给第一个小圆圈添加白色背景
    ol.children[0].className = 'circle-bc';
    //复制第一张图片并放在最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    //设置节流阀 防止连续点击图片轮播过快
    var flag = true;
    //点击右侧按钮图片往右移动
    arrowright.addEventListener('click', function() {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果走到了最后一张图片，立马切换到第一张图
            if (num == ul.children.length -1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * 1500, function() {
                flag = true; // 打开节流阀
            });
            // 点击右侧按钮，图片向右移动，同时底部小圆圈跟随一起变化
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });
    //点击左侧按钮图片向左移动
    arrowleft.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * 1500 + 'px';
            }
            num--;
            animate(ul, -num * 1500, function() {
                flag = true;
            });
            circle--;
            //当白色背景处于第一个小圆圈时点击左侧按钮，白色背景立马转移到第五个小圆圈
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });
    function circleChange() {
        // 先清除其余小圆圈的背景颜色
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的白色背景
        ol.children[circle].className = 'circle-bc';
    }
    //设置定时器，每隔4秒图片自动开始轮播
    var timer = setInterval(function(){
        arrowright.click()
    },4000)
    //页面往下滚动导航栏进行切换
    var header = document.querySelector('.header');
    var nav1 = document.querySelector('.nav1');
    var nav2 = document.querySelector('.nav2');
    document.addEventListener('scroll',function(){
        if (window.pageYOffset > 750) {
            nav1.style.display = 'none';
            nav2.style.display = 'block';
            header.className = 'header2';
        } else {
            nav1.style.display = 'block';
            sliding1.style.top = '-120px';
            sliding2.style.top = '-180px';
            sliding3.style.top = '-120px';
            nav2.style.display = 'none';
            header.className = 'header';
        }
    })
    //顶部导航栏搜索按钮
    var bodyshadow = document.querySelector('.body-shadow');
    var searchbtn = document.querySelector('.search');
    var searchbtn2 = document.querySelector('.search2');
    var searchface = document.querySelector('.search-face');
    var sear = document.querySelector('.sear');
    var sear2 = document.querySelector('.sear2');
    var flage = 0;
    //点击搜索按钮是搜索界面出现，再次点击按钮搜索界面隐藏
    searchbtn.addEventListener('click',function(){
        if (flage == 0) {
            searchface.style.display = 'block';
            bodyshadow.style.display = 'block';
            sear.src = 'images/头部/叉.png';
            flage = 1;
        } else {
            bodyshadow.style.display = 'none';
            searchface.style.display = 'none';
            sear.src = 'images/头部/搜索.png';
            flage = 0;
        }
    })
    searchbtn2.addEventListener('click',function(){
        if (flage == 0) {
            searchface.style.display = 'block';
            bodyshadow.style.display = 'block';
            sear2.src = 'images/头部/叉.png';
            flage = 1;
        } else {
            bodyshadow.style.display = 'none';
            searchface.style.display = 'none';
            sear2.src = 'images/头部/搜索.png';
            flage = 0;
        }
    })
    //搜索界面的文本框修饰
    var searchtext = document.querySelector('.search-text');
    //文本框获得焦点
    searchtext.addEventListener('focus',function(){
        if (this.value == '热门搜索') {
            this.value ='';
        }
        this.style.color = '#333';
    })
    //文本框失去焦点
    searchtext.addEventListener('blur',function(){
        if (this.value == '') {
            this.value = '热门搜索';
        }
        this.style.color = 'gray';
    })
    //登录界面的第一个文本框修饰
    var firstinput = document.querySelector('.firstinput');
    //文本框获得焦点
    firstinput.addEventListener('focus',function(){
        if (this.value == '手机号码') {
            this.value ='';
        }
        this.style.color = '#333';
    })
    //文本框失去焦点
    firstinput.addEventListener('blur',function(){
        if (this.value == '') {
            this.value = '手机号码';
        }
        this.style.color = 'gray';
    })
    //登录界面的第二个文本框修饰
    var secondinput = document.querySelector('.secondinput');
    //文本框获得焦点
    secondinput.addEventListener('focus',function(){
        if (this.value == '密码') {
            this.value ='';
        }
        this.type = 'password';
        this.style.color = '#333';
    })
    //文本框失去焦点
    secondinput.addEventListener('blur',function(){
        if (this.value == '') {
            this.value = '密码';
            this.type = 'text';
        }
        this.style.color = 'gray';
    })
    //点击钢笔图标出现登录界面
    var pen = document.querySelector('.pen');
    pen.addEventListener('click',function(){
        login.style.display = 'block';
        login.style.top = '50px';
        animatetop(login,70);
        bodyshadow.style.display = 'block';
    })
    //点击箭头图标页面滚动到顶部
    var upward = document.querySelector('.upward');
    upward.addEventListener('click',function(){
        var timer1;
        var position;
        var m = 1;
        timer1 = setInterval(function(){
            position = document.documentElement.scrollTop;
            position = position - m;
            m++;
            if(position > 0){
                window.scrollTo(0,position);
            }else{
                window.scrollTo(0,0);
                clearInterval(timer1);
            }
        },8);
    })
    //点击登录按钮登录界面显示
    var login = document.querySelector('.login');
    var loginbtn1 = document.querySelector('.login-btn1');
    var loginbtn2 = document.querySelector('.login-btn2');
    loginbtn1.addEventListener('click',function() {
        login.style.display = 'block';
        login.style.top = '50px';
        animatetop(login,70);
        bodyshadow.style.display = 'block';
    })
    loginbtn2.addEventListener('click',function() {
        login.style.display = 'block';
        login.style.top = '50px';
        animatetop(login,70);
        bodyshadow.style.display = 'block';
    })
    //点击关闭按钮登录界面隐藏
    var loginclose = document.querySelector('.login-close');
    loginclose.addEventListener('click',function() {
        animatetop(login,50,function(){
            login.style.display = 'none';
            bodyshadow.style.display = 'none';
        })
    })
    //登录界面的滑块拖动效果实现
    //获取变量
    var loginmiddlebox3 = document.querySelector('.login-middle-box3');
    var thirdboximg = document.querySelector('.thirdbox-img');
    var thirdbox = document.querySelector('.thirdbox')
    var loginmiddlebox32 = document.querySelector('.login-middle-box32');
    //鼠标按下时盒子随着鼠标移动
    loginmiddlebox3.addEventListener('mousedown',function(e){
        var x = e.pageX - loginmiddlebox3.offsetLeft;
        document.addEventListener('mousemove', move)
        function move(e) {
            var tx = e.pageX - x;
            //设置条件盒子只能在父级盒子内部移动
            if (tx <= 0) {
                tx = 0;
            } else if (tx >= 300) {
                //盒子移动到最右端时盒子发生变化
                tx = 300;
                thirdboximg.src = 'images/头部/勾.png';
                loginmiddlebox3.className = 'login-middle-box31';
                thirdbox.innerHTML = '验证通过';
                loginmiddlebox32.style.display = 'block'; 
            }
            loginmiddlebox3.style.left = tx + 'px';
        }
        //鼠标弹起时移除盒子移动事件，盒子停止移动
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', move);
            animate(loginmiddlebox3,0);
        }) 
    })
    //手机号提示框的弹出
    var loginbtn = document.querySelector('.login-btn');
    var loginprompt = document.querySelector('.login-prompt');
    var loginshadow = document.querySelector('.login-shadow');
    var loginpromptbtn = document.querySelector('.login-prompt-btn');
    //若文本框中字数少于11个或者多于11个则弹出提示框
    loginbtn.addEventListener('click',function(){
        if (firstinput.value.length < 11 || firstinput.value.length > 11){
            loginprompt.style.display = 'block';
            loginshadow.style.display = 'block';
            loginprompt.style.top = '155px';
            animatetop(loginprompt,175);
        }        
    })
    //点击确定按钮提示框隐藏
    loginpromptbtn.addEventListener('click',function(){
        animatetop(loginprompt,155,function(){
            loginprompt.style.display = 'none';
            loginshadow.style.display = 'none';
        })
    })
    //注册界面的第一个文本框修饰
    var registerinput1 = document.querySelector('.register-input1');
    registerinput1.addEventListener('focus',function(){
        if (this.value == '手机号码') {
            this.value ='';
        }
        this.style.color = '#333';
    })
    registerinput1.addEventListener('blur',function(){
        if (this.value == '') {
            this.value = '手机号码';
        }
        this.style.color = 'gray';
    })
    //注册界面的第二个文本框修饰
    var registerinput2 = document.querySelector('.register-input2');
    registerinput2.addEventListener('focus',function(){
        if (this.value == '昵称（2-15个字符，中英文，数字下划线）') {
            this.value ='';
        }
        this.style.color = '#333';
    })
    registerinput2.addEventListener('blur',function(){
        if (this.value == '') {
            this.value = '昵称（2-15个字符，中英文，数字下划线）';
        }
        this.style.color = 'gray';
    })
    //注册界面的第三个文本框修饰
    var registerinput3 = document.querySelector('.register-input3');
    registerinput3.addEventListener('focus',function(){
        if (this.value == '密码（不少于6位）') {
            this.value ='';
        }
        this.type = 'password';
        this.style.color = '#333';
    })
    registerinput3.addEventListener('blur',function(){
        if (this.value == '') {
            this.value = '密码（不少于6位）';
            this.type = 'text';
        }
        this.style.color = 'gray';
    })
    //注册界面的第四个文本框修饰
    var registerinput4 = document.querySelector('.register-input4');
    registerinput4.addEventListener('focus',function(){
        if (this.value == '请确认密码') {
            this.value ='';
        }
        this.type = 'password';
        this.style.color = '#333';
    })
    registerinput4.addEventListener('blur',function(){
        if (this.value == '') {
            this.value = '请确认密码';
            this.type = 'text';
        }
        this.style.color = 'gray';
    })
    //注册界面的第五个文本框修饰
    var registerinput5 = document.querySelector('.register-input5');
    registerinput5.addEventListener('focus',function(){
        if (this.value == '输入验证码') {
            this.value ='';
        }
        this.style.color = '#333';
    })
    registerinput5.addEventListener('blur',function(){
        if (this.value == '') {
            this.value = '输入验证码';
        }
        this.style.color = 'gray';
    })
    //点击注册按钮出现注册页面,点击右上角注册页面隐藏
    var registerbtn = document.querySelector('.register-btn');
    var register = document.querySelector('.register');
    var registerclose = document.querySelector('.register-close');
    registerbtn.addEventListener('click',function(){
        register.style.display = 'block';
        register.style.top = '10px';
        login.style.display = 'none';
    })
    registerclose.addEventListener('click',function(){
        animatetop(register,-10,function(){
            register.style.display = 'none';
            bodyshadow.style.display = 'none';            
        })
    })
    //点击注册页面中的注册按钮若复选框没有被选中则出现注册提示框
    var registerregisterbtn = document.querySelector('.register-register-btn');
    var agreebtn = document.querySelector('.agree-btn');
    var registerprompt = document.querySelector('.register-prompt');
    var registershadow = document.querySelector('.register-shadow');
    registerregisterbtn.addEventListener('click',function(){
        if (agreebtn.checked !== true) {
            registershadow.style.display = 'block';
            registerprompt.style.display = 'block';
            registerprompt.style.top = '200px';
            animatetop(registerprompt,220);
        }
    })
    //点击确定按钮注册提示框消失
    var registerpromptbtn = document.querySelector('.register-prompt-btn');
    registerpromptbtn.addEventListener('click',function(){
        animatetop(registerprompt,200,function(){
            registershadow.style.display = 'none';
            registerprompt.style.display = 'none';
        })
    })
    //点击返回登录按钮注册页面切换为登录页面
    var loginreturnbtn = document.querySelector('.login-return-btn');
    loginreturnbtn.addEventListener('click',function(){
        register.style.display = 'none';
        login.style.display = 'block';
    })
    //当页面向下滚动一定距离，主体右侧底部部分变为固定定位
    var footer = document.querySelector('.footer');
    window.addEventListener('scroll',function(){
        if(window.pageYOffset > 1757){
            footer.style.position = 'fixed';
            footer.style.top = '40px';
        } else {
            footer.style.position = '';
            footer.style.top = '';
        }
    })
    //中部导航栏切换效果
    var navul = document.querySelector('.nav-ul');
    var main = document.querySelector('.main');
    for(i = 0;i < 3; i++ ){
        navul.children[i].setAttribute('index', i+1);
        navul.children[i].addEventListener('click',function(){
            for (i = 0;i < 3;i++){
                navul.children[i].className = '';
                navul.children[i].style.color = '#8a8383';
            }
            for (i = 1;i < 4;i++){
                main.children[i].style.display = 'none';
            }
            this.className = 'nav-li';
            this.style.color = 'red';
            var index = this.getAttribute('index');
            main.children[index].style.display = 'block';
        })
    }

})