//随机切换背景图片模块

function module_setbg(){
    //随机切换背景图片(页面刷新调用)
    this.set = function(){

        //获取随机数
        var x =  Math.ceil(Math.random()*10);
        //读取dom元素
        var body = document.getElementsByTagName('body')[0];
        //读取本地背景主题设置
        var flag = window.localStorage.getItem('mylink_deep_flag');

        //如果本地没有背景颜色设置记录，就初始化设置为深度主题
        if(flag==null){
            window.localStorage.setItem('mylink_deep_flag','1');
            body.style.background = `url("./src/images/bg/w${x}.jpg") no-repeat`;
        }
        //否则根据本地设置进行主题设定
        else if(flag=='1'){
            body.style.background = `url("./src/images/bg/w${x}.jpg") no-repeat`;
            document.getElementById('top').style.color = '#ffffff';
            var arr = document.getElementsByClassName('httpname');
            for(var i = 0;i<arr.length;i++){
                arr[i].style.color = '#ffffff';
            }
        }
        else if(flag=='0'){
            body.style.background = `url("./src/images/bg/b${x}.jpg") no-repeat`;
            document.getElementById('top').style.color = '#333333';
            var arr = document.getElementsByClassName('httpname');
            for(var i = 0;i<arr.length;i++){
                arr[i].style.color = '#333333';
            }
        }
    }
    //根据图片名称切换背景图片
    this.setbyname = function(name,flag){
        //读取dom元素
        var body = document.getElementsByTagName('body')[0];
        body.style.background = `url("./src/images/bg/${name}") no-repeat`;
        
        //如果调用函数时有flag参数，根据参数设置字体颜色
        if(flag=='1'){
            window.localStorage.setItem('mylink_deep_flag','1');
            document.getElementById('top').style.color = '#ffffff';
            var arr = document.getElementsByClassName('httpname');
            for(var i = 0;i<arr.length;i++){
                arr[i].style.color = '#ffffff';
            }
        }
        else if(flag=='0'){
            window.localStorage.setItem('mylink_deep_flag','0');
            document.getElementById('top').style.color = '#333333';
            var arr = document.getElementsByClassName('httpname');
            for(var i = 0;i<arr.length;i++){
                arr[i].style.color = '#333333';
            }
        }
    }
}
var m_setbg = new module_setbg();
export { m_setbg }
