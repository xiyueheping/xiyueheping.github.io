/**
 * 实现搜索引擎切换功能的模块
 * 
 ***/
function module_serch(){
     // 初始化本地存储中的搜索信息
     this.setsearch = function(){
               //如果刚开始本地搜索信息为空 设置为百度搜索
               if(window.localStorage.getItem('mylink_search')==null){
                   window.localStorage.setItem('mylink_search','百度搜索');
                   document.getElementById('top_from_button').value = '百度搜索';
                   document.getElementById('top_form').action='https://www.baidu.com/s';
                   document.getElementById('top_from_search').name='wd'
                               }
               //如果不为空 根据本地信息进行渲染
               else{
                  document.getElementById('top_from_button').value=window.localStorage.getItem('mylink_search');

            
               if (window.localStorage.getItem('mylink_search')=='百度搜索') {
                   // console.log('---本地搜索信息为：百度搜索');
                   document.getElementById('top_form').action='https://www.baidu.com/s';
                   document.getElementById('top_from_search').name='wd'
               }
               else if(window.localStorage.getItem('mylink_search')=='搜狗搜索'){
                   // console.log('---本地搜索信息为：搜狗搜索');
                   document.getElementById('top_form').action='https://sogou.com/web';
                   document.getElementById('top_from_search').name='query'
               }
               else if(window.localStorage.getItem('mylink_search')=='谷歌搜索'){
                   // console.log('---本地搜索信息为：谷歌搜索');
                   document.getElementById('top_form').action='https://www.google.com.hk';
                   document.getElementById('top_from_search').name='q'
               }
               else if(window.localStorage.getItem('mylink_search')=='必应搜索'){
                   // console.log('---本地搜索信息为：必应搜索');
                   document.getElementById('top_form').action='https://cn.bing.com/search';
                   document.getElementById('top_from_search').name='wd'
               }
            }
         }

     // 切 换 搜 索 引 擎 的 函 数
     this.search_qiehuan = function(){
                
               document.getElementById('top_from_button').onmouseenter = function(){
                           
                           document.getElementById('none_search_nav').style.display="block";
                   
             
               }
               document.getElementById('top_from_button').onmouseleave = function(){
             
                           document.getElementById('none_search_nav').style.display="none";
                   
             
               }
               document.getElementById('none_search_nav').onmouseenter = function(){
             
                           document.getElementById('none_search_nav').style.display="block";
                   
             
               }
               document.getElementById('none_search_nav').onmouseleave = function(){
             
                    document.getElementById('none_search_nav').style.display="none";
                   
             
               }
               
               
               document.getElementById('abd').onclick = function(){
                    document.getElementById('top_from_button').value=this.innerHTML;
                    document.getElementById('none_search_nav').style.display="none";
                    document.getElementById('top_form').action='https://www.baidu.com/s';
                    document.getElementById('top_from_search').name='wd';
                    window.localStorage.setItem('mylink_search','百度搜索');
               }
               
               document.getElementById('asg').onclick = function(){
                    document.getElementById('top_from_button').value=this.innerHTML;
                    document.getElementById('none_search_nav').style.display="none";
                    document.getElementById('top_form').action='https://sogou.com/web';
                    document.getElementById('top_from_search').name='query';
                    window.localStorage.setItem('mylink_search','搜狗搜索');
               }
             
               document.getElementById('agg').onclick = function(){
                    document.getElementById('top_from_button').value=this.innerHTML;
                    document.getElementById('none_search_nav').style.display="none";
                    document.getElementById('top_form').action='https://www.google.com.hk';
                    document.getElementById('top_from_search').name='q';
                    window.localStorage.setItem('mylink_search','谷歌搜索');
               }
             
               document.getElementById('aby').onclick = function(){
                   document.getElementById('top_from_button').value=this.innerHTML;
                   document.getElementById('none_search_nav').style.display="none";
                   document.getElementById('top_form').action='https://cn.bing.com/search';
                   document.getElementById('top_from_search').name='q';
                   window.localStorage.setItem('mylink_search','必应搜索');
               }

     }



}
var m_search = new module_serch();
export { m_search }