
/**
 * 实现地点信息，天气预报数据的处理的模块
 * 
 */

var module_city_weather = function() {
      this.city = '';

      // 获取当前地点的城市信息
      this.getcity = function(){

            

            $.ajax({
                        type:"get",
                        dataType:'jsonp ',
                        data:{
                                  key:"KIDBZ-MPOWG-GQAQL-I2YRY-OGFFQ-AHB42",
                                  output:'jsonp'
                    　　　　},
                        jsonp:"callback",
                        jsonpCallback:"QQmap",
                        url:'http://apis.map.qq.com/ws/location/v1/ip',
                        success:function(data){
                            
                            var s = data.result.ad_info.city;
                            s=s.substring(0,s.length-1);

                            //如果是手机热点获取不到城市直接return
                            if (s=='') {
                            console.log("---返回的地点数据不可用:\n");
                            document.getElementById("top_tianqi").innerHTML = "Failed to load...";

                             return;
                            }
                           
                            //否则继续执行
                             city = s;

                             console.log("---当前地点信息加载成功\n")
                             console.log(data);
                            
                             getweather(); //刷新页面时获取天气预报数据

                        },
                        error : function(err){

                          console.log("---当前地点信息加载失败\n");
                          var div_tianqi = document.getElementById("top_tianqi");
                          div_tianqi.innerHTML = "Failed to load..";

                        }
 
                });

           
      }

      // 获取当前城市天气预报信息
      var getweather = function(){
                 

                  //从API接口获取天气数据
                  $.ajax({
                  url:'http://api.jisuapi.com/weather/query',
                  type:'GET',
                  dataType:'jsonp',
                  data: {
                    city: city,
                    appkey: 'f30ea145de0e8d22'
                  },
                  success:function(data){
                    console.log("---天气信息加载成功\n")
                    console.log(data.result.daily);
                    

                    //地点城市信息与天气信息一起渲染
                    document.getElementById('select_city').innerHTML = city;


                    // 把天气信息保存到全局对象中
                    json_data_weather = data.result.daily;

                    // 解析今天天气数据
                     taday_weather=data.result.weather;
                     taday_wendu=data.result.temphigh+'℃~'+data.result.templow+'℃';
                     taday_fengxiang=data.result.winddirect;

                    
                    

                    //渲染今天的天气数据
                    var div_tianqi = document.getElementById("top_tianqi");
                    div_tianqi.innerHTML = taday_weather+'&nbsp;'+taday_wendu;
                    
                    //渲染详情链接
                    document.getElementById("xiangqing").innerHTML = '更多详情';
                  },
                  error:function(xhr){
                     console.log("---天气信息加载失败\n");
                     console.log(xhr);


                     var div_tianqi = document.getElementById("top_tianqi");
                     div_tianqi.innerHTML = "Failed to load....";
                  }
                });
      }

      // 点击页面天气详情按钮响应此函数
      this.showtianqi = function() {
                 document.getElementById('xiangqing').onclick = function(event){
                            //若天气数据加载错误直接return；
                            if (json_data_weather == null) {
                                 alert('天气信息加载失败');
                                 return;
                            }

                             // 把天气详情信息序列化为json字符串，追加到url后面
                             var weatner_str = JSON.stringify(json_data_weather);
                             url = 'xiangqing.html' + '?' + weatner_str;
                             url = encodeURI(url);

                             var set = 'height=290px,width=600px,left=350px,top=190px';
                             newwindow = window.open(url,'_blank ',set);

                             //阻止事件冒泡，防止第一次点击详情就关闭子窗口
                             event.stopPropagation();

                                          }
      }
}


