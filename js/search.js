/**
 * 实现搜索引擎切换功能的模块
 * 
 ***/
function module_serch(){
     // 初始化本地存储中的搜索信息
     this.setsearch = function(){
               if(window.localStorage.getItem('search')==null){
                      window.localStorage.setItem('search','百度搜索');
                                                              }
               else{
                  document.getElementById('button_search').value=window.localStorage.getItem('search');

            
               if (window.localStorage.getItem('search')=='百度搜索') {
                   console.log('---本地搜索信息为：百度搜索');
                   document.getElementById('form_search').action='http://www.baidu.com/s';
                   document.getElementById('input_search').name='wd'  
               }
               else if(window.localStorage.getItem('search')=='搜狗搜索'){
                   console.log('---本地搜索信息为：搜狗搜索');
                   document.getElementById('form_search').action='http://sogou.com/web';
                   document.getElementById('input_search').name='query'  
               }
               else if(window.localStorage.getItem('search')=='谷歌搜索'){
                   console.log('---本地搜索信息为：谷歌搜索');
                   document.getElementById('form_search').action='https://www.google.com.hk';
                   document.getElementById('input_search').name='q'  
               }
               else if(window.localStorage.getItem('search')=='必应搜索'){
                   console.log('---本地搜索信息为：必应搜索');
                   document.getElementById('form_search').action='http://cn.bing.com/search';
                   document.getElementById('input_search').name='wd'  
               }
            }
         }

     // 切 换 搜 索 引 擎 的 函 数
     this.search_qiehuan = function(){
                
               document.getElementById('button_search').onmouseenter = function(){
                           
                           document.getElementById('search_nav').style.display="block";
                   
             
               }
               document.getElementById('button_search').onmouseleave = function(){
             
                           document.getElementById('search_nav').style.display="none";
                   
             
               }
               document.getElementById('search_nav').onmouseenter = function(){
             
                           document.getElementById('search_nav').style.display="block";
                   
             
               }
               document.getElementById('search_nav').onmouseleave = function(){
             
                    document.getElementById('search_nav').style.display="none";
                   
             
               }
               
               
               document.getElementById('abd').onclick = function(){
                    document.getElementById('button_search').value=this.innerHTML;  
                    document.getElementById('search_nav').style.display="none"; 
                    document.getElementById('form_search').action='http://www.baidu.com/s';
                    document.getElementById('input_search').name='wd';
                    window.localStorage.setItem('search','百度搜索');
               }
               
               document.getElementById('asg').onclick = function(){
                    document.getElementById('button_search').value=this.innerHTML;  
                    document.getElementById('search_nav').style.display="none"; 
                    document.getElementById('form_search').action='http://sogou.com/web';
                    document.getElementById('input_search').name='query';
                    window.localStorage.setItem('search','搜狗搜索');
               }
             
               document.getElementById('agg').onclick = function(){
                    document.getElementById('button_search').value=this.innerHTML;   
                    document.getElementById('search_nav').style.display="none";
                    document.getElementById('form_search').action='https://www.google.com.hk';
                    document.getElementById('input_search').name='q';
                    window.localStorage.setItem('search','谷歌搜索');
               }
             
               document.getElementById('aby').onclick = function(){
                   document.getElementById('button_search').value=this.innerHTML;  
                   document.getElementById('search_nav').style.display="none"; 
                   document.getElementById('form_search').action='http://cn.bing.com/search';
                   document.getElementById('input_search').name='q';
                   window.localStorage.setItem('search','必应搜索');
               }

     }



}
