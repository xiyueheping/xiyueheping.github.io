
/**
 * 与事件处理有关的函数 调用所有功能模块，为主入口模块提供服务
 *
 * 模块变量：所有功能模块实例对象
 * 功能函数：onloadevent onclickevent moveinout keydown youjian
 * 基本函数：无
 */
var module_event = function() {
    //导入雪花效果模块
    var m_snow = new module_snow();
    //导入系统时间模块
    var m_time = new module_time();
    //导入地点天气模块
    var m_cityweather = new module_city_weather();
    //导入搜索引擎模块
    var m_search = new module_serch();
    //导入网址数据处理模块
    var m_http = new module_http();
    //导入备忘录模块
    var m_remember = new module_remember();
    //导入翻译模块
    var m_trans = new module_trans();
    //主onload事件注册
    this.onloadevent = function () {

           m_snow.snow();                      //执行雪花效果
           m_cityweather.showcityweather(); //加载地点天气信息进行渲染
           m_time.settime();               //获取系统时间并渲染
           m_search.setsearch();           //加载页面执行设置搜索引擎函数
           m_search.search_qiehuan();      //注册与搜索引擎有关的事件
           m_http.http_chushihua();         //初始化本地网址数据 进行渲染


    }


    //由网址标题html元素注册的点击事件
    this.httptitle_click = function (event) {
        // console.log(event.target.style.color);
        //如果点击的标题不是当前页面分类执行httptitleclick函数
        if(event.target.style.color == 'black'){

            m_http.httptitleclick(event.target.innerText);
            this.moveinout(); // 重新注册移入移出事件
        }
    }
    //由网址删除按钮注册的点击事件
    this.http_del = function (event) {
        // alert(event.target.parentNode.name);
        // 把网址name值做为参数传进去
        m_http.http_del(event.target.parentNode.name);
        this.moveinout(); // 重新注册移入移出事件
        return false;

    }
    //由添加网址分类标题按钮注册的点击事件
    this.addtitle = function () {
        m_http.addtitle();
    }

    //由网址图标注册的加载成功事件
    this.imgonload = function (event) {
        //显示当前图片并隐藏备用样式
        event.target.style.display= 'inline-block';
        event.target.nextElementSibling.style.display= 'none';
    }

    //由网址编辑框确认修改按钮响应函数
    this.http_querenxiugai = function () {
        //如果修改成功重新注册移入移出事件
        if(m_http.http_querenxiugai()===true){
            this.moveinout();//重新注册移入移出事件
        }
        return false;
    }
    //处理所有的点击事件
    this.onclickevent = function () {

         var moveinout = this.moveinout;//把移入移出事件处理函数保存到当前变量

        //点击天气详情按钮响应事件
        document.getElementById('top_xiangqing').onclick = m_cityweather.showtianqi;
        //点击备忘录按钮响应事件
        document.getElementById('top_remember').onclick = m_remember.showremember;
        //点击翻译按钮响应事件
        document.getElementById('top_translate').onclick = m_trans.showtrans;
        //点击备忘录窗口关闭按钮响应事件
        document.getElementById('remember_close').onclick = m_remember.saveremember;
        //点击翻译窗口关闭按钮响应事件
        document.getElementById('trans_close').onclick = m_trans.close;
        //点击天气详情窗口关闭按钮响应事件
        document.getElementById('tianqixiangqing_close').onclick = m_cityweather.closexiangqing;
        //点击网址编辑窗口关闭按钮响应事件
        document.getElementById('none_edit_close').onclick = function(){
            document.getElementById('none_httpedit').style.display = 'none';
        }

        //点击底部添加网址按钮
        document.getElementById('foot_addhttp').onclick = function(){
            m_http.http_add();
            moveinout(); // 重新注册移入移出事件
        }

        //点击右键菜单编辑标题响应函数
        document.getElementById('none_edittitle').onclick = function(event){
            //获取当前页面网址分类标题并做为参数传入
             var type = document.getElementById('none_menu_fenlei').title;
             m_http.edittitle(type);
        }
        //点击右键菜单删除标题响应函数
        document.getElementById('none_deltitle').onclick = function(event){
            //获取当前页面网址分类标题并做为参数传入
            var type = document.getElementById('none_menu_fenlei').title;
            m_http.deltitle(type);
            moveinout();
        }
        //点击右键菜单上移标题响应函数
        document.getElementById('none_upmovetitle').onclick = function(event){
            //获取当前页面网址分类标题并做为参数传入
            var type = document.getElementById('none_menu_fenlei').title;
            m_http.moveuptitle(type);

        }
        //点击右键菜单下移标题响应函数
        document.getElementById('none_downmovetitle').onclick = function(event){
            //获取当前页面网址分类标题并做为参数传入
            var type = document.getElementById('none_menu_fenlei').title;
            m_http.movedowntitle(type);

        }

        //点击右键菜单编辑网址按钮
        document.getElementById('youjian_http_edit').onclick = function(event){
             var name = document.getElementById('none_menu_a').title;
             m_http.http_edit(name);
             event.stopPropagation(); //阻止冒泡，防止第一次点击就关闭窗口
        }
        //点击右键菜单删除网址按钮
        document.getElementById('youjian_http_del').onclick = function(event){
            var name = document.getElementById('none_menu_a').title;
            // 把网址name值做为参数传进去
            m_http.http_del(name);
            moveinout(); // 重新注册移入移出事件

        }
        //点击右键菜单上移网址按钮
        document.getElementById('youjian_http_top_move').onclick = function(event) {
            var name = document.getElementById('none_menu_a').title;
            // 把网址name值做为参数传进去
            m_http.http_moveup(name);
            moveinout(); // 重新注册移入移出事件

        }
        //点击右键菜单下移网址按钮
        document.getElementById('youjian_http_bottom_move').onclick = function(event) {
            var name = document.getElementById('none_menu_a').title;
            // 把网址name值做为参数传进去
            m_http.http_movedown(name);
            moveinout(); // 重新注册移入移出事件

        }
        //点击主文档对象响应事件
        document.onclick = function (event) {
            //如果备忘录窗口处于打开状态并且点击了窗口之外的元素 就将其关闭
            if(document.getElementById('none_remember').style.display=='block'){
                if(event.target.id == 'none_remember'||event.target.id == 'remember_textword'||event.target.id == 'remember_title'){
                    return;
                }
                m_remember.saveremember();
            }
            //如果翻译窗口处于打开状态并且点击了窗口之外的元素 就将其关闭
            if (document.getElementById('none_trans').style.display=='block'){
                if(event.target.id == 'trans_from'||event.target.id == 'trans_to'||event.target.id == 'none_trans'
                ||event.target.id == 'trans_title'){
                    return;
                }
              m_trans.close();
            }
            //如果网址编辑窗口处于打开状态并且点击了窗口之外的元素 就将其关闭
            if (document.getElementById('none_httpedit').style.display=='block'){

               //如果点在窗口内部直接返回
                if(event.target.id == 'none_httpedit'||
                    document.getElementById('none_httpedit').contains(event.target)){
                    return;
                }
                //否则执行关闭操作
                document.getElementById('none_httpedit').style.display = 'none';


            }
        }



    }

    //响应主体内容框中所有图标的鼠标移入移出事件
     this.moveinout = function () {
        var arr = document.querySelectorAll('#content a');

        for(var i = 0;i<arr.length;i++){
            arr[i].onmouseenter = function (event) {

                this.children[3].style.display = 'inline-block';
            }
            arr[i].onmouseleave = function (event) {
                this.children[3].style.display = 'none';
            }
        }


     }

     // 响 应 回 车 事 件
     this.keydown = function(){
          var moveinout = this.moveinout;//把移入移出事件处理函数保存到当前变量
          //在网址框中点击回车响应添加网址函数
          document.getElementById('foot_input_name').onkeydown = function(event) {
                   
                   if((event.keyCode||event.which)==13){
                       m_http.http_add();
                       moveinout(); // 重新注册移入移出事件
                   }
              }
          document.getElementById('foot_input_href').onkeydown = function(event) {
                   
                   if((event.keyCode||event.which)==13){
                       m_http.http_add();
                       moveinout(); // 重新注册移入移出事件
                   }
              }


          //在翻译文本框点击回车后进行翻译
          document.getElementById('trans_from').onkeydown = function (event) {
              if((event.keyCode||event.which)==13){
                  m_trans.gettrans();
              }
          }

        }

     //注册鼠标右键事件处理程序
     this.youjian = function(){

                    //点击鼠标右键响应函数
                     window.oncontextmenu = function(e){

                           //对右键菜单进行定位
                           if(e.clientX+100<=innerWidth){
                               var x = e.clientX - 2;
                           }
                           else{
                               var x = e.clientX - 98;
                           }
                           if(e.clientY+140<=innerHeight){
                               var y = e.clientY - 2;
                           }
                           else{
                               var y = e.clientY - 138;
                           }
                    
                           //如果点击的是分类标题 显示对应操作分类标题菜单
                           if(e.target.className == 'httptitle'){
                                document.getElementById('none_menu_fenlei').title = e.target.innerText; //在title属性中记录当前右键哪个分类
                                document.getElementById('none_menu_fenlei').style.left=x+'px';
                                document.getElementById('none_menu_fenlei').style.top=y+'px';
                                document.getElementById('none_menu_fenlei').style.display='block';
                    
                                // console.log('---右键点击了分类');
                               //取消默认的浏览器自带右键
                                e.preventDefault();
                                return;
                    
                           }


                           //如果点击的是网址图标或网址名称或网址本身或网址图标替代样式
                           else if(e.target.className == 'httpimg'
                               ||e.target.className == 'httpname'
                               ||e.target.className == 'httpabox'
                               ||e.target.className == 'http_del'
                               ||e.target.className == 'httpimg2'){

                               //把当前点击的网址名称记录在菜单的title属性中
                               if(e.target.className == 'httpabox'){
                                   // console.log('---右键点击了网址')
                                   // console.log(e.target.name);
                                   document.getElementById('none_menu_a').title = e.target.name;
                               }
                               else{
                                   // console.log('---右键点击了网址')
                                   // console.log(e.target.parentNode.name);
                                   document.getElementById('none_menu_a').title = e.target.parentNode.name;
                               }

                                
                                document.getElementById('none_menu_a').style.left=x+'px';
                                document.getElementById('none_menu_a').style.top=y+'px';
                                document.getElementById('none_menu_a').style.display='block';
                                // console.log('---右键点击了超链接');
                           
                                //取消默认的浏览器自带右键
                                e.preventDefault();
                                return;
                           }

                         //如果点击的是其他对象则只取消默认的浏览器自带右键
                         e.preventDefault();
                          return;
                           
                        
                        }

                    
                       /****************触发事件隐藏右键菜单函数**********************/
                         document.getElementById('none_menu_fenlei').onclick = function(){
                           document.getElementById('none_menu_fenlei').style.display='none';
                         }
                         document.getElementById('none_menu_fenlei').onmouseleave = function(){
                           document.getElementById('none_menu_fenlei').style.display='none';
                         }
                         document.getElementById('none_menu_a').onclick = function(){
                           document.getElementById('none_menu_a').style.display='none';
                         }
                         document.getElementById('none_menu_a').onmouseleave = function(){
                           document.getElementById('none_menu_a').style.display='none';
                         }


        }



}
