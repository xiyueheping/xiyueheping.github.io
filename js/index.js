
//localStorage中的数据
//search: 默认搜索引擎  remember: 记事本 http: 网址   


/********************************定义全局变量*********************************/

var json_data_weather = null; //一个全局对象用来暂存天气数据

var newwindow = null; //全局的子窗口对象

var globe_http_type = null;  //用于记录当前右键点击的超链接是哪个分类

var globe_http_name = null;    //用于记录当前右键点击的超链接的name

var fenlei_name = null; //用于记录当前右键点击的是那个分类

var global_obj = null;  //保存正在编辑的网址对象

var http_data = {//一个全局的对象,暂存所有网址信息
       data:[{name:"慕课网",
             href:"https://www.imooc.com/",
             type:"分类一"},
             {name:"网易云课堂",
              href:"http://study.163.com/my",
              type:"编程学习"},
             {
               name:"菜鸟教程",
               href:"http://www.runoob.com",
               type:"编程学习"
             },
             {name:"我的博客",
              href:"http://blog.csdn.net/zuiziyoudexiao",
              type:"编程学习"},
              {name:"Github",
              href:"https://github.com/xiyueheping",
              type:"编程学习"}
             ],
       type:['编程学习','读书成长','娱乐休闲','分类四','分类五','分类六']
      }


/*-------------通过html页面注册的事件函数要放到全局作用域中-----------------------------*/

var r = new module_remember();
var remember = r.remember; //点击备忘录按钮执行的函数

var f = new module_trans();
var trans = f.trans;
//关于网址信息的所有功能
var h = new module_http();
var http_add = h.http_add;    //点击添加按钮执行函数
var fenlei_rename = h.fenlei_rename;  // 点击编辑分类按钮执行的函数
var leftmove = h.leftmove;  //点击左移执行的函数
var rightmove = h.rightmove; //点击右移执行的函数
var http_edit = h.http_edit; //点击网址编辑按钮执行函数
var http_xiugai = h.http_xiugai; //点击确认修改按钮执行函数
var http_edit_close = h.http_edit_close; //点击编辑框中关闭按钮触发事件
var http_del = h.http_del;  //点击删除网址按钮执行函数
var http_top_move = h.http_top_move;  //点击上移网址按钮执行函数
var http_bottom_move = h.http_bottom_move; //点击下移网址按钮执行函数


/***********************************主  函  数*******************************************/
window.onload=function(){

  //一些事件处理
  var event = new module_event();
  event.keydown();     // 响 应 回 车 事 件
  event.closewindow(); //监听点击事件关闭子窗口
  event.youjian();     //鼠标右键自定义菜单功能
  event.scroll_listen(); //滚动事件监听

  //城市信息与天气预报信息处理功能
  city_weather1 = new module_city_weather();
  city_weather1.getcity(); //获取城市与天气预报信息
  city_weather1.showtianqi(); //更多天气详情功能

  //关于网址信息的所有功能
  var h = new module_http();
  h.http_chushihua(); //加载页面默认执行 把本地信息更新到全局对象http_data 并进行渲染
  h.close_style();    //控制关闭按钮动画效果

  
  
  //切换搜索引擎功能
  var search = new module_serch();
  search.setsearch();     
  search.search_qiehuan();  
  


  //设置系统时间
  var time = new module_time();
  time.settime();



  //雪花特效
  var snow = new module_snow();
  snow.snow();

  
}

