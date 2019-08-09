//随机切换背景图片模块

function module_setbg(){
    //随机切换背景图片(页面刷新调用)
    this.set = function(){

        //获取随机数
        var x =  Math.ceil(Math.random()*10);
        //读取dom元素
        var body = document.getElementsByTagName('body')[0];
        //根据随机数设置背景
        body.style.background = `url("./src/images/bg/${x}.jpg") no-repeat`;
        body.style.backgroundSize = '100% 100%'

    }
    //根据图片名称切换背景图片
    this.setbyname = function(name){
        //未传参表示随机切换
        if (name==undefined){
            this.set();
            return;
        }
        //否则根据name切换
        var body = document.getElementsByTagName('body')[0];
        body.style.background = `url("./src/images/bg/${name}") no-repeat`;
        body.style.backgroundSize = '100% 100%'
        
    }
}
var m_setbg = new module_setbg();
export { m_setbg }
