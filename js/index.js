
//导入事件处理模块
var m_event = new module_event();

//主入口函数 调用事件处理模块的函数
window.onload = function () {

    m_event.onloadevent();  //注册onload事件

    m_event.moveinout(); //响应主体内容框中所有图标的鼠标移入移出事件

    m_event.onclickevent(); //处理所有的点击事件

    m_event.keydown(); //处理所有回车事件

    m_event.youjian(); //处理所有鼠标右键事件

    m_event.scroll();  //鼠标滚动事件响应
}