
//导入事件处理模块
var m_event = new module_event();

// 导出本地数据
function daochu(){
    var data1 = window.localStorage.getItem('mylink_http_data');
    var data2 = window.localStorage.getItem('thistype');
    var data3 = window.localStorage.getItem('mylink_remember');
    var data4 = window.localStorage.getItem('mylink_search');
    var str = `window.localStorage.setItem('mylink_http_data','${data1}');
               window.localStorage.setItem('thistype','${data2}');
               window.localStorage.setItem('mylink_remember','${data3}');
               window.localStorage.getItem('mylink_search','${data4}');`
 
    console.log(str)
}


//主入口函数 调用事件处理模块的函数
window.onload = function () {

    m_event.onloadevent();  //注册onload事件

    m_event.moveinout(); //响应主体内容框中所有图标的鼠标移入移出事件

    m_event.onclickevent(); //处理所有的点击事件

    m_event.keydown(); //处理所有回车事件

    m_event.youjian(); //处理所有鼠标右键事件

    m_event.scroll();  //鼠标滚动事件响应
}