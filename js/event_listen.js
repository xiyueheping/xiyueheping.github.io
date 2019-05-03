
/****

   与事件处理有关的函数

****/
var module_event = function() {
     // 响 应 回 车 事 件
     this.keydown = function(){

        
          document.getElementById('input_name').onkeydown = function(event) {
                   
                   if((event.keyCode||event.which)==13){
                     http_add();
                   }
              } 

          document.getElementById('input_href').onkeydown = function(event) {
                   
                   if((event.keyCode||event.which)==13){
                     http_add();
                   }
              } 
        }
     // 当捕获到点击事件关闭子窗口
     this.closewindow = function(){
              document.onclick = function(){
                
                //如果是子窗口，直接关闭
                       if (newwindow!=null) {
                              console.log('---捕获到点击事件关闭子窗口');
                              newwindow.close();
                             }        
                        }
       }
     //鼠标右键自定义菜单功能
     this.youjian = function(){

                    //点击鼠标右键响应函数
                     window.oncontextmenu = function(e){
                           
                           // alert(e.target.className);
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
                    
                           //如果点击的是分类
                           if(e.target.className == 'td_title'){
                                fenlei_name = e.target.innerHTML;
                                document.getElementById('menu_fenlei').style.left=x+'px';
                                document.getElementById('menu_fenlei').style.top=y+'px';
                                document.getElementById('menu_fenlei').style.display='block';
                    
                                // console.log('---右键点击了分类');
                                //取消默认的浏览器自带右键
                                e.preventDefault();
                                return;
                    
                           }
                    
                           //如果点击的是超链接
                           else if(e.target.getAttribute("flag") == 'a'){
                                globe_http_type = e.target.type;
                                globe_http_name = e.target.innerHTML;
                              
                                
                                document.getElementById('menu_a').style.left=x+'px';
                                document.getElementById('menu_a').style.top=y+'px';
                                document.getElementById('menu_a').style.display='block';
                                // console.log('---右键点击了超链接');
                           
                                //取消默认的浏览器自带右键
                                e.preventDefault();
                                return;
                           }
                          //如果点击的是其他对象则什么都不做
                          return;
                           
                        
                        }

                    
                       /****************触发事件隐藏右键菜单函数**********************/
                         document.getElementById('menu_fenlei').onclick = function(){
                           document.getElementById('menu_fenlei').style.display='none';
                         }
                         document.getElementById('menu_fenlei').onmouseleave = function(){
                           document.getElementById('menu_fenlei').style.display='none';
                         }
                         document.getElementById('menu_a').onclick = function(){
                           document.getElementById('menu_a').style.display='none';
                         }
                         document.getElementById('menu_a').onmouseleave = function(){
                           document.getElementById('menu_a').style.display='none';
                         }


        }
    //滚动事件监听
    this.scroll_listen = function(){
               window.onscroll = function(){ 
                        var backtop= document.getElementsByClassName('actGotop')[0];
                        var x = document.documentElement.scrollTop || document.body.scrollTop;  
                        if(x<10){
                            $('#top').slideDown(200);
                        }
                        else{
                            $('#top').fadeOut(200);
                        }
                        if(x>420){

                            document.getElementById('foot').className='foot_absolute';
                        }
                        else{

                            document.getElementById('foot').className='foot_fixed';
                           }              
                        if(x>50){ 
                          $('.actGotop').slideDown(300);
                        }else{    
                          $('.actGotop').slideUp(300); 
                        }  
                         backtop.onclick=function(){
                               $('body,html').animate({ scrollTop: 0 }, 500);
                          }    
                                   
                        }

     }


}
