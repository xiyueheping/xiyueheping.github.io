/**
 * 实现地点信息，天气预报数据的处理的模块
 *
 * 模块变量：city json_data_weather
 * 成员函数：showcityweather showtianqi closexiangqing
 * 基本函数：getweather
 */

var module_city_weather = function() {

     //当前模块的全局变量
      var json_data_weather = null; //暂存天气数据

    /**
     * 模块的成员函数，供外层事件处理模块调用
     */
    // 获取当前地点天气信息并渲染
      this.showcityweather = function(){
           $.ajax({
            type: 'GET',
            url: 'https://www.tianqiapi.com/api/',
            dataType: 'json',
            data: 'city=',
            error: function () {
                // alert('请求失败');
                document.getElementById("top_weather").innerHTML = "Failed to load...";
            },
            success: function (res) {
                // alert('请求成功')
                console.log('获取天气数据成功:'+new Date())
                console.log(res)
                json_data_weather = res;
                var arr = res.data[0].date.split("-")  //获取当前日期 年月日
                var date = arr[1]+ '月' + arr[2] + '日';
                var week = res.data[0].week; //获取当前星期
                var city = res.city;  //获取当前城市
                var wendu = res.data[0].tem1 + '~' + res.data[0].tem2 //获取今天温度
                var todayweather = res.data[0].wea + '  ' + wendu; //获取今天天气
                
            

                document.getElementById('top_date').innerHTML = date
                document.getElementById('top_week').innerHTML = week
                document.getElementById('top_city').innerHTML = city
                document.getElementById('top_weather').innerHTML = todayweather
                document.getElementById('top_xiangqing').innerHTML = '天气详情'
            }
        });
      }

      // 点击页面天气详情按钮响应此函数
      this.showtianqi = function(event) {

             //若天气数据加载错误直接return；
             if (json_data_weather == null) {
                 alert('showtianqi：天气信息加载失败');
                 return;
             }
             // console.log(json_data_weather);
             //显示天气详情窗口
             $("#none_tianqixiangqing").slideDown(300);
             $("#window_bg").fadeIn(300);
             console.log('打开了天气详情窗口');



             //根据天气详情数据渲染整个表格
             var obj = json_data_weather.data;

             var array_datedom = document.getElementsByClassName('date');
             var array_weather = document.getElementsByClassName('weather');
             var array_wendu = document.getElementsByClassName('wendu');
             var array_fengxiang = document.getElementsByClassName('fengxiang');
             var array_fengli = document.getElementsByClassName('fengli');
             for(var i = 0; i < 7; i++){
                 array_datedom[i].innerHTML = obj[i].date;
                 array_weather[i].innerHTML = obj[i].wea;
                 array_wendu[i].innerHTML = obj[i].tem1+'~'+obj[i].tem2;
                 array_fengxiang[i].innerHTML = obj[i].win[0];
                 array_fengli[i].innerHTML = obj[i].win_speed;
             }
                //阻止事件冒泡，防止第一次点击详情就关闭子窗口
                event.stopPropagation();

        }
     //点击天气详情关闭按钮响应此函数
    this.closexiangqing = function () {
        $("#window_bg").fadeOut(300);
        $("#none_tianqixiangqing").slideUp(300);
        console.log('---关闭天气详情窗口');
    }

}


 // var getweather = this.getweather;
            // $.ajax({
            //             type:"get",
            //             dataType:'jsonp ',
            //             data:{
            //                       key:"KIDBZ-MPOWG-GQAQL-I2YRY-OGFFQ-AHB42",
            //                       output:'jsonp'
            //         　　　　},
            //             jsonp:"callback",
            //             jsonpCallback:"QQmap",
            //             url:'https://apis.map.qq.com/ws/location/v1/ip',
            //             success:function(data){
            //                 console.log("---地点数据:");
            //                 console.log(data);
            //                 var s = data.result.ad_info.city;
            //                 s=s.substring(0,s.length-1);

            //                 //如果是手机热点获取不到城市直接return
            //                 if (s=='') {
            //                 // console.log("---无效的地点数据:");
            //                 // console.log(data);
            //                 document.getElementById("top_weather").innerHTML = "Failed to load...";

            //                  return;
            //                 }
                           
            //                 //否则继续执行
            //                  city = s;

            //                  // console.log("---地点信息加载成功:");
            //                  // console.log(data.result.ad_info);
                            
            //                  getweather(); //刷新页面时获取天气预报数据

            //             },
            //             error : function(err){

            //               console.log("---当前地点信息加载失败");
            //               console.log(err);
            //               var div_tianqi = document.getElementById("top_weather");
            //               div_tianqi.innerHTML = "Failed to load..";

            //             }
 
            //     });


            
    /**
     * 模块内部的工具函数，供上层成员函数调用
     */
        // 获取当前城市天气预报信息
    //   this.getweather = function(){
    //     //从API接口获取天气数据
    //     $.ajax({
    //         url:'https://api.jisuapi.com/weather/query',
    //         type:'GET',
    //         dataType:'jsonp',
    //         data: {
    //             city: city,
    //             appkey: 'f30ea145de0e8d22'
    //         },
    //         success:function(data){
    //             console.log("---天气信息加载成功\n")
    //             console.log(data.result.daily);

    //             // 把天气信息保存到模块全局对象中
    //             json_data_weather = data.result.daily;

    //             //地点城市信息与天气信息一起渲染
    //             document.getElementById('top_city').innerHTML = city;




    //             // 解析今天天气数据
    //             taday_weather=data.result.weather;
    //             taday_wendu=data.result.temphigh+'℃~'+data.result.templow+'℃';
    //             taday_fengxiang=data.result.winddirect;




    //             //渲染今天的天气数据
    //             var div_tianqi = document.getElementById("top_weather");
    //             div_tianqi.innerHTML = taday_weather+'&nbsp;'+taday_wendu;

    //             //渲染详情链接
    //             document.getElementById("top_xiangqing").innerHTML = '更多详情';
    //         },
    //         error:function(xhr){
    //             console.log("---天气信息加载失败");
    //             console.log(xhr);


    //             var div_tianqi = document.getElementById("top_weather");
    //             div_tianqi.innerHTML = "Failed to load....";
    //         }
    //     });
    // }