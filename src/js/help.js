import { m_setbg } from "./setbg.js"

//提示帮助信息
window.help = function(){
    console.log('daochu():    导出本地数据');
    console.log('setbg(name,0/1): 根据name切换背景图片');
}

// 导出本地数据
window.daochu = function(){
    var data1 = window.localStorage.getItem('mylink_http_data');
    var data2 = window.localStorage.getItem('thistype');
    var data4 = window.localStorage.getItem('mylink_search');
    var str = `window.localStorage.setItem('mylink_http_data','${data1}');
               window.localStorage.setItem('thistype','${data2}');
               window.localStorage.setItem('mylink_search','${data4}');`
    console.log(str);
}

//根据name切换背景图片
window.setbg = function(name){
    m_setbg.setbyname(name)
}
export {  }