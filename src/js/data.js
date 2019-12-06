import { m_http } from "./http";
import { m_setbg } from "./setbg";
import { m_search } from "./search";
import { m_shezhi } from "./shezhi";

/**
 * 关于本地数据处理功能的模块
 * 所有与本地localStorage有关的功能都要放到此模块
 */
var module_data = function() {
   //默认所有全局数据
   this.mylink_globaldata = {
       //当前网址类型页
       thistype:   "编程学习",
       //当前使用搜索引擎
       thissearch: "百度搜索",
       //当前使用背景图片
       imgpath:    "1.jpg",
       //网址数据
       httpdata: [
                    { type:'编程学习',
                      data:[{name:"a慕课网",href:"https://www.imooc.com/"},
                            {name:"b网易云课堂",href:"http://study.163.com/my"},
                            {name:"c牛客网",href:"https://www.nowcoder.com/"},
                            {name:"dcsdn",href:"http://blog.csdn.net/"},
                            {name:"eGithub",href:"https://github.com/"},]
                    },
                    {
                     type:'休闲娱乐',
                     data:[{name:"知乎",href:"https://www.zhihu.com/"},
                           {name:"虎牙直播",href:"https://www.huya.com"},
                           {name:"哔哩哔哩",href:"https://www.bilibili.com/"},
                           {name:"京东",href:"https://www.jd.com/"},
                           {name:"虎扑",href:"https://bbs.hupu.com/"},]
                    }
                 ]
   }
   
   //从本地加载全局数据
   this.loaddata = function(){
         //如果本地数据为空  向本地写入默认全局数据
         if(localStorage.getItem("mylink_globaldata")==null){
              console.log("本地数据为空");
              
              this.savedata();
         }
         //否则，加载本地数据，更新当前对象默认全局数据
         else{
           var str = localStorage.getItem("mylink_globaldata");
           this.mylink_globaldata = JSON.parse(str);
         }
   }
   //将全局数据写入到本地
   this.savedata = function(){
       console.log("将全局数据写入到本地");
       var str = JSON.stringify(this.mylink_globaldata);//把全局json对象转换成字符串
       localStorage.setItem("mylink_globaldata",str);
   }

   //由事件层调用 打开导出数据窗口 导出本地数据
   this.outputdata = function(){
       //打开导出窗口之前先判断导入窗口和主题背景窗口是否打开，如果打开先关闭它们
       if(document.getElementById('none_input').style.display!='none'){
           m_data.closeinputwindow();
       }
       if(document.getElementById('none_setbg').style.display!='none'){
           m_setbg.closesetbgwindow();
       }

       var jsonstr = JSON.stringify(m_data.mylink_globaldata);
      //  $("#window_bg").fadeIn(300);
       $("#none_output").slideDown(300);
       document.getElementById('output_data').value = jsonstr;
   }

   //由事件层调用 关闭导出数据窗口 
   this.closeoutputwindow = function(){
    //   $("#window_bg").fadeOut(300);
      $("#none_output").slideUp(300);
   }

   //由事件层调用 打开导入数据窗口
   this.openinputwindow = function(){
     //打开导入窗口之前先判断导出窗口和主题背景窗口是否打开，如果打开先关闭它们
     if(document.getElementById('none_output').style.display!='none'){
         m_data.closeoutputwindow();
     }
     if(document.getElementById('none_setbg').style.display!='none'){
         m_setbg.closesetbgwindow();
     }
    $("#none_input").slideDown(300);
   }
   //获取导入的数据重新加载相关数据并渲染页面 点击确认导入执行
   this.doinputdata = function(){
      var jsonstr = document.getElementById('input_data').value.Trim();
      if(jsonstr.length==0){
            alert('数据不能为空');
            return false;
      }
      if(!m_data.checkjsonstr(jsonstr)){    
            alert('数据有误');
            return false;
      }
      if(window.confirm("是否确认覆盖原有数据，该操作不可恢复！")){
          //将新导入数据保存到本地
          localStorage.setItem("mylink_globaldata",jsonstr);  
          //重新加载数据 渲染页面
          m_data.loaddata();
          m_http.http_chushihua();
          m_setbg.loadbg();
          m_search.setsearch();
          m_data.closeinputwindow();  //关闭导入数据窗口
          m_shezhi.closerightmenu();  //关闭右侧菜单
          m_event.moveinout();        //重新注册鼠标移入移出事件
      }
      
      return false;
   }
   //由事件层调用 关闭导入数据窗口 
   this.closeinputwindow = function(){
    //    $("#window_bg").fadeOut(300);
       $("#none_input").slideUp(300);
   }

   //对导入的json字符串进行检验
   this.checkjsonstr = function(jsonstr){
        //如果导入数据不能转化为合法js对象则return false
        var jsonobj = null;
        try{
           jsonobj = JSON.parse(jsonstr);
        }catch(e){
            return false;
        }
        //如果全局对象的一级属性不存在 return false
        if(
            jsonobj.thistype===undefined
          ||jsonobj.thissearch===undefined
          ||jsonobj.imgpath===undefined
          ||jsonobj.httpdata===undefined
          ){
            return false;
          }
       return true;
   }
}

var m_data = new module_data();
export { m_data }