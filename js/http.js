//关于网址处理功能的模块

var module_http = function() {
    //加载页面默认执行 把本地信息更新到全局对象http_data 并进行渲染
	this.http_chushihua = function(){

                   
                    /***如果刚开始本地数据为空，向本地写入初始网址信息****/
                      if(window.localStorage.getItem("http")==null){
                         console.log('---初始化本地网址数据');
                         var str = JSON.stringify(http_data);//把json对象转换成字符串
                         window.localStorage.setItem('http',str);
                     }

                         


                    //然后把本地信息更新到全局对象中以便使用
                     var json_str = window.localStorage.getItem("http");
                     http_data = JSON.parse(json_str);
                     
                     
                    //根据更新的全局对象渲染页面
                    http_xuanran();

	}
   //点击添加按钮执行函数
   this.http_add = function() {


                    //对输入的网址信息格式验证    
                    var name= document.getElementById('input_name').value;
                    var href= document.getElementById('input_href').value;
                    var type= document.getElementById('fenlei').value;
                    var new_httpobj =  {
                     	     name:name,
                     	     href:href,
                     	     type:type
                     }
                    var flag = check_http(new_httpobj);
                    if (flag == false) {
                    	return;
                    }
                    
                   

                    
                      // 把localstorage中数据提取到全局对象中
                      var json_str = window.localStorage.getItem("http");
                      http_data = JSON.parse(json_str);

                      //提取出网址和分类数据
                      http_array = http_data.data;
                   type_array = http_data.type;
                      



                    /*****对网址信息比对，查看是否有同名，分类空间不足等情况***/

                    var count = 0;//用来统计当前分类已有网址数量
                    for (var i = 0; i < http_array.length; i++) {
                    	  if(name == http_array[i].name){
                    	  	  alert('网址名已存在');
                    	  	  return;
                    	  }
                    	  if(type == http_array[i].type){
                              count++;  
                         }
                      }
                     if(count>=14){
                     	alert('当前分类空间已满');
                     }
                     
                     

                     //把数据添加到全局对象中
                     http_data.data[http_data.data.length] = new_httpobj;
                     console.log('---网址数据添加成功:');
                     console.log(http_data);
                      
                         
                     // 把全局对象保存到本地.对页面重新渲染
                     http_save();
                     http_xuanran();   
   

   }

  // 点击编辑分类按钮执行的函数
   this.fenlei_rename = function(){
                      //接收新的分类名并进行格式验证
                      var newname = prompt("输入新的分类名:(3~5)");
                      if (newname == null){
                      	return;
                      }
                      if(newname.length<3||newname.length>5){
                      	alert('名称长度不符合');
                      	return;
                      }
                  
                      
                      // 把本地中数据提取到全局对象中
                        var json_str = window.localStorage.getItem("http");
                        http_data = JSON.parse(json_str);
                  
                        //提取出网址和分类数据
                        http_array = http_data.data;
	                    type_array = http_data.type;
                        
                        //检测是否具有命名冲突
                        for(var i = 0;i<type_array.length;i++){
                        	if((newname == type_array[i])&&(newname != fenlei_name)){
                               alert('该分类名已存在');
                               return;
                        	}
                        }
                  
                  
                       //把新修改的分类信息更新到全局对象中 包括超链接中type属性
                       for(var i = 0;i<type_array.length;i++){
                       	if(fenlei_name == type_array[i]){
                       		http_data.type[i] = newname;
                       		break;
                       	}
                       }
                       for(var j = 0;j< http_array.length;j++){
                       	if(fenlei_name == http_array[j].type){
                       		http_data.data[j].type = newname;
                       	}
                       }
                       console.log('---分类信息编辑成功:');
                  
                       //把当前全局对象http_data保存到本地
                       http_save();
                       
                       // 对页面重新渲染
                       http_xuanran();   
     
   }

   //点击左移执行的函数
   this.leftmove = function() {
                  // 把localstorage中数据提取到全局对象中
                  var json_str = window.localStorage.getItem("http");
                  http_data = JSON.parse(json_str);

                  //提取出分类数据
                  type_array = http_data.type;
                  var j = -1; //j表示当前分类位置
                  for(var i = 0;i<type_array.length;i++){
                	  if(fenlei_name == type_array[i]){
                		   j = i;
                	   }
                   }
                  if(j == 0){
                	    alert('无法移动，已经在最左边');
                   }
                  else{//交换位置
                	  var temp = http_data.type[j-1];
                	  http_data.type[j-1] = http_data.type[j];
                	  http_data.type[j] = temp;
                  }
                  console.log('---分类左移成功:');
                  //把当前全局对象http_data保存到本地
                  http_save();
                  //根据更新的全局对象渲染页面
                  http_xuanran();


   }

  //点击右移执行的函数
  this.rightmove = function() {
  	            // 把localstorage中数据提取到全局对象中
                var json_str = window.localStorage.getItem("http");
                http_data = JSON.parse(json_str);
          
                //提取出分类数据
                type_array = http_data.type;
                var j = -1; //j表示当前分类位置
          	    for(var i = 0;i<type_array.length;i++){
          		   if(fenlei_name == type_array[i]){
          			   j = i;
          		  }
          	    }

          	    if(j == 5){
          		    alert('无法移动，已经在最右边');
          	    }

          	    else{//交换位置
          		  var temp = http_data.type[j+1];
          		  http_data.type[j+1] = http_data.type[j];
          		  http_data.type[j] = temp;
              	}

               console.log('---分类右移成功');
          	   //把当前全局对象http_data保存到本地
            	 http_save();
          	   //根据更新的全局对象渲染页面
          	   http_xuanran();
  }
  
  //点击网址编辑按钮执行函数
  this.http_edit = function() {
  	            //显示网址编辑框
                document.getElementById('form_httpedit').style.display = 'block';  
           
           
                var name = globe_http_name;
                // 把localstorage中数据提取到全局对象中
                 var json_str = window.localStorage.getItem("http");
                 http_data = JSON.parse(json_str);
           
                //从全局对象提取出网址和分类数据
                var http_array = http_data.data;
                var type_array = http_data.type;
                 
                 
                 //根据选择网址的name检索对应网址对象
                 for (var i = 0; i < http_array.length; i++) {
                   if(name == http_array[i].name) {
                            global_obj = http_array[i];
                            console.log('正在编辑的网址是:\n');
                            console.log(global_obj);
                   }
                 }
                
                 //渲染下拉框中所有选项信息
                var xialakuang = document.getElementsByClassName('option_fsl');
                for(var i = 0;i<6;i++){     
                  xialakuang[i].innerHTML = type_array[i];
                  xialakuang[i].value = type_array[i];
                }
           
                //把对应的http三个属性渲染到页面
                document.getElementById('input_name_fsl').value = global_obj.name;
                document.getElementById('input_href_fsl').value = global_obj.href;
                document.getElementById('input_type_fsl').value = global_obj.type;
  }
  
  //点击确认修改按钮执行函
  this.http_xiugai = function() {
  	              //首先接收输入框中的数据
                  var name =   document.getElementById('input_name_fsl').value
                  var href =   document.getElementById('input_href_fsl').value
                  var type =  document.getElementById('input_type_fsl').value 
            
                  //若数据没有变化 直接关闭窗口
                  if ((name == global_obj.name) && (href == global_obj.href) && (type == global_obj.type)) {
                    
                    alert('数据未改动');
                    document.getElementById('form_httpedit').style.display = 'none';  
                    return false;
                  }
                  
                   
            
                  //对输入数据进行格式验证
                  var new_httpobj =  {
                       name:name,
                       href:href,
                       type:type
                   }
                  var flag = check_http(new_httpobj);
                  //若格式不对直接退出
                  if (flag == false) {
            
                        return false;
                  }
                  
            
                  // 把localstorage中数据提取出来
                  var json_str = window.localStorage.getItem("http");
                   http_data = JSON.parse(json_str);
            
                  //提取出网址和分类数据
                 var http_array = http_data.data;
                 var type_array = http_data.type;
                  
                 
            
                  //检索要修改的网址的下标位置
                  var index = -1;
                  for (var i = 0; i < http_array.length; i++) {
                    if(global_obj.name == http_array[i].name) {
                             index = i;
                    }
                  }
                  /*****查看是否有同名情况***/
                  for (var i = 0; i < http_array.length; i++) {
                	  if((name == http_array[i].name) && (name!= globe_http_name)){
                	  	  alert('网址名已存在');
                	  	  return;
                	  }
                	 
                  }
            
            
                  //修改http_data对象的数据
                  http_data.data[index] = new_httpobj;
                  console.log('编辑成功:\n');
                  console.log(new_httpobj);
                  
                   console.log('第一次打印http_data\n');
                   console.log(http_data);
            
            
                  // 把全局对象保存到本地
                  var str = JSON.stringify(http_data);//把json对象转换成字符串
                  window.localStorage.setItem('http',str);
                 
                  // 重新进行网址信息渲染
                  http_xuanran();
                  
                  //隐藏编辑框
                  alert('修改成功');
                  document.getElementById('form_httpedit').style.display = 'none';
                  return false;  
  }

  //点击编辑框中关闭按钮触发事件
  this.http_edit_close = function(){
  	            //显示编辑框
	            document.getElementById('form_httpedit').style.display = 'none';  
              console.log('---编辑框已关闭');
  }
  //点击删除网址按钮执行函数
  this.http_del = function(){

  	             // 把localstorage中数据提取到全局对象中
                 var json_str = window.localStorage.getItem("http");
                 http_data = JSON.parse(json_str);
           
                //从全局对象提取出网址和分类数据
                var http_array = http_data.data;
                var type_array = http_data.type;
                 
                 
                 //根据选择网址的name检索对应网址对象以及数组下标
                 for (var i = 0; i < http_array.length; i++) {
                   if(globe_http_name == http_array[i].name) {
                            
                            console.log('准备删除的网址是:\n');
                            console.log(http_array[i]);
                            // console.log('删除之前:\n');
                            // console.log(http_data);

                            http_data.data.splice(i,1); //从下标i开始删除一个元素
                            // console.log('删除之后:\n');
                            // console.log(http_data);                
                   }
                 }

                  //把当前全局对象http_data保存到本地
                  http_save();

                  //根据更新的全局对象渲染页面
                  http_xuanran();
  }
   //点击上移网址按钮执行函数
  this.http_top_move = function(){
  	            // 把localstorage中数据提取到全局对象中
                var json_str = window.localStorage.getItem("http");
                http_data = JSON.parse(json_str);
           
                //从全局对象提取出网址和分类数据
                var http_array = http_data.data;
                var type_array = http_data.type;
                 
                 
                
                var p = null; //准备上移的下标
                var q = null; //同分类的上一个元素的下标
                var count = 0; //记录同分类的元素个数
                //寻找准备上移元素的下标
                for (var i = 0; i < http_array.length; i++) {//for
                       
                       //每遇到一个元素属于当前分类就让count加一
                        if(globe_http_type == http_array[i].type){
                                 count ++;
                        }

                        if(globe_http_name == http_array[i].name) {//666
                                    
                            //如果count仍为1说明待移动元素就是当前分类第一个元素
                            //则直接return 后面的都不执行
                            if(count == 1){
                            	 alert('已经在最上方无法移动');
                            	 return;
                            }

                            else{
                                 p = i; //把待移动元素下标保存到p中
                            	 console.log('准备上移的网址是:'+http_array[i].name);
                                 
                            }    

                        }//666
                }//for
                
                //从下标p前一个元素开始往回找同分类的上一个元素的下标
                for(var j = p-1; j >= 0 ;j--){
                      
                      if(globe_http_type == http_array[j].type){

                      	 q = j; //把待移动元素上一个元素下标保存到p中
                      	 // console.log('待移动元素上一个元素为:'+http_array[j].name);
                         break;              	                	
                      }

                }
                 //交换两个元素
                 var temp = http_data.data[p];
                 http_data.data[p] = http_data.data[q];
                 http_data.data[q] = temp;
                  console.log('元素上移成功');
                
                //把当前全局对象http_data保存到本地
                http_save();

                //根据更新的全局对象渲染页面
                http_xuanran();

  }//fun
   //点击下移网址按钮执行函数
  this.http_bottom_move = function(){
  	// alert('下移');
                        // 把localstorage中数据提取到全局对象中
                        var json_str = window.localStorage.getItem("http");
                        http_data = JSON.parse(json_str);
                   
                        //从全局对象提取出网址和分类数据
                        var http_array = http_data.data;
                        var type_array = http_data.type;

                       
                         //统计当前分类的元素个数
                         var type_length = 0;
                        for(var i = 0; i < http_array.length; i++){
                          if(globe_http_type == http_array[i].type){
                          	 type_length ++;
                          }
                        }

                        //寻找要交换的两个元素的下标
                        var p = null; //准备下移的下标
                        var p_next = null; //同分类的下一个元素的下标
                        var count = 0;
                        for(var j = 0; j < http_array.length; j++){
                            if(globe_http_type == http_array[j].type){
                          	    count++;
                            }
                            if(globe_http_name == http_array[j].name){
                          	      //如果count值等于该分类元素个数说明待移动元素在最下方
                                  if (count == type_length) {
                                       alert('已经在最下方无法移动');
                                       return;
                                  }
                                  //如果count值<该分类元素个数说明可以移动
                                  else if(count < type_length) {
                                       console.log('待下移元素为: '+http_array[j].name);
                                       p = j;
                                       
                                  }

                            }

                        }//for
                        //从准备下移的元素的下一个元素开始往后找
                        for(var k = p+1;k<http_array.length;k++){
                              if(globe_http_type == http_array[k].type){

                              	   p_next = k; //把k赋给准备下移的元素的下一个元素
                              	   // console.log('待下移元素下一个元素为: '+http_array[k].name);
                                   break;
                              }
                        }

                         //交换两个元素
                      	 var temp = http_data.data[p];
                      	 http_data.data[p] = http_data.data[p_next];
                      	 http_data.data[p_next] = temp;
                         console.log('元素下移成功');
                         
                          //把当前全局对象http_data保存到本地
                          http_save();
          
                          //根据更新的全局对象渲染页面
                          http_xuanran();

  }
  //控制关闭按钮动画效果
  this.close_style = function(){

                /*****************鼠标移动到关闭按钮时按钮变大**********************************/
                document.getElementById('edit_close').onmouseenter = function(){
                	this.style.width = '25px';
                	this.style.height = '25px';
                }
                
                /*****************鼠标移动到关闭按钮时按钮恢复**********************************/
                
                document.getElementById('edit_close').onmouseleave = function(){
                	this.style.width = '20px';
                	this.style.height = '20px';
                }
                
    }


          
     /*****基本函数，供上层函数调用******/
     
     //根据更新的全局对象渲染页面
     function http_xuanran(){
        
         console.log('---开始渲染网址信息\n');
         console.log(http_data);
        //在渲染之前先把以前的渲染信息清空
         //获取第一个分类的dom对象数组
     	var class1_dom = document.getElementsByClassName('td_local1');
     	//获取第2个分类的dom对象数组
     	var class2_dom = document.getElementsByClassName('td_local2');
     	//获取第3个分类的dom对象数组
     	var class3_dom = document.getElementsByClassName('td_local3');
     	//获取第4个分类的dom对象数组
     	var class4_dom = document.getElementsByClassName('td_local4');
     	//获取第5个分类的dom对象数组
     	var class5_dom = document.getElementsByClassName('td_local5');
     	//获取第6个分类的dom对象数组
     	var class6_dom = document.getElementsByClassName('td_local6');
     
         for(var i = 0;i<14;i++){
         	class1_dom[i].innerHTML = '';
         	class2_dom[i].innerHTML = '';
         	class3_dom[i].innerHTML = '';
         	class4_dom[i].innerHTML = '';
         	class5_dom[i].innerHTML = '';
         	class6_dom[i].innerHTML = '';
         }
     
     
     
     
         //从全局对象获取网址，分类信息
     	http_array = http_data.data;
     	type_array = http_data.type;
     	
     
     	//首先渲染表格顶部分类信息   渲染下拉框中分类信息
     	var array_fenlei = document.getElementsByClassName('td_title');
     	var xialakuang = document.getElementsByTagName('option');
     	for(var i = 0;i<6;i++){
     		
     		array_fenlei[i].innerHTML = type_array[i];
     		xialakuang[i].innerHTML = type_array[i];
     		xialakuang[i].value = type_array[i];
     	}
     	
     	
         
     
     	
     
         
         //然后渲染所有网址信息
         var count1=0,count2=0,count3=0,count4=0,count5=0,count6 = 0;//表示当前分类有多少个网址
     	for(var i = 0;i<http_array.length;i++){
     		      
             if(http_array[i].type == type_array[0]){
                   class1_dom[count1].innerHTML ="<a target='_blank' flag = 'a' type ="+http_array[i].type+"  href="+http_array[i].href+">"+http_array[i].name;+"</a>";
                       count1++;
                       // alert(http_array[i].name)
                   }
             else if(http_array[i].type == type_array[1]){
                   class2_dom[count2].innerHTML ="<a target='_blank' flag = 'a' type ="+http_array[i].type+"  href="+http_array[i].href+">"+http_array[i].name;+"</a>";
                       count2++;
                       // alert(http_array[i].name)
                   }
             else if(http_array[i].type == type_array[2]){
                   class3_dom[count3].innerHTML ="<a target='_blank' flag = 'a' type ="+http_array[i].type+"  href="+http_array[i].href+">"+http_array[i].name;+"</a>";
                       count3++;
                       // alert(http_array[i].name)
                   }
             else if(http_array[i].type == type_array[3]){
                   class4_dom[count4].innerHTML ="<a target='_blank' flag = 'a' type ="+http_array[i].type+"  href="+http_array[i].href+">"+http_array[i].name;+"</a>";
                       count4++;
                   }
             else if(http_array[i].type == type_array[4]){
                   class5_dom[count5].innerHTML ="<a target='_blank' flag = 'a' type ="+http_array[i].type+"  href="+http_array[i].href+">"+http_array[i].name;+"</a>";
                       count5++;
                   }
             else if(http_array[i].type == type_array[5]){
                   class6_dom[count6].innerHTML ="<a target='_blank' flag = 'a' type ="+http_array[i].type+"  href="+http_array[i].href+">"+http_array[i].name;+"</a>";
                       count6++;
                   }
     	} 
     	// console.log('第三次打印http_data\n');
         // console.log(http_data);
     }
     
     //把当前全局对象http_data保存到本地
     function http_save(){
           var str = JSON.stringify(http_data);//把json对象转换成字符串
           window.localStorage.setItem('http',str);
     }
     
     //网址信息验证 传入网址信息，返回验证结果
     function check_http(new_httpobj){
            /****表单验证部分*****/
            if(new_httpobj.name==""||new_httpobj.name=="输入名称"||new_httpobj.href==""||new_httpobj.href=="http://"){
                 alert("请输入有效数据");
                  return false;}
     
            //正则表达式判断网址格式
             var box=/^http:\/\/.*$|^https:\/\/.*$/
             if(!box.test(new_httpobj.href)){
                new_httpobj.href="http://"+new_httpobj.href;}
     
            //控制名称长度 若name太长直接return
             if(new_httpobj.name.length>10){
              alert('网址名称过长');
               return false;
             }
     
           return true;
     }

}

