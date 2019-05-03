
var module_time = function(){

   // 获 取 系 统 时 间并渲染到页面上
   this.settime = function(){

                      var top_time = document.getElementById("top_time");
                      var date = new Date();//获取表示当前时间的date对象
                      var month = date.getMonth()+1;//获取当前月份
                      if(month<=9){
                        month="0"+month;
                      }
                      var day = date.getDate();//获取当前日份
                      if(day<=9){
                        day="0"+day;
                      }
                      var hour = date.getHours();//获取当前小时
                      var minute = date.getMinutes();//获取当前分钟
                      if(minute<=9){
                        minute="0"+minute;
                      }
                      var xingqi = date.getDay(); //获取表示星期的数字

                      var day_name=new Array(7);
                        day_name[0]="星期日"
                        day_name[1]="星期一"
                        day_name[2]="星期二"
                        day_name[3]="星期三"
                        day_name[4]="星期四"
                        day_name[5]="星期五"
                        day_name[6]="星期六"

                        //设置对应div中的html内容    hour+"时"+minute+"分"+"<br/>"+
                      top_time.innerHTML= month+"月"+day+"日 "+day_name[xingqi];
                      console.log('---获取到系统时间：');
                      console.log(month+"月"+day+"日 "+day_name[xingqi]);
                      
                      }
}


