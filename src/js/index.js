//导入jQuery模块
import { $ } from "./jquery.js"

//导入事件处理模块
import { m_event } from "./event_listen.js"

//将事件处理模块导入到全局作用域，便于HTML中的代码去使用
window.m_event = m_event;

// 导出本地数据
window.daochu = function(){
    var data1 = window.localStorage.getItem('mylink_http_data');
    var data2 = window.localStorage.getItem('thistype');
    var data4 = window.localStorage.getItem('mylink_search');
    var str = `window.localStorage.setItem('mylink_http_data','${data1}');
               window.localStorage.setItem('thistype','${data2}');
               window.localStorage.setItem('mylink_search','${data4}');`
    console.log(str)
}


//主入口函数 调用事件处理模块的函数
$(function(){
    m_event.onloadevent();  //注册onload事件

    m_event.moveinout(); //响应主体内容框中所有图标的鼠标移入移出事件

    m_event.onclickevent(); //处理所有的点击事件

    m_event.keydown(); //处理所有回车事件

    m_event.youjian(); //处理所有鼠标右键事件

    m_event.scroll();  //鼠标滚动事件响应
})
