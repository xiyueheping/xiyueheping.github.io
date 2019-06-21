var module_remember = function(){
	//点击页面备忘录按钮响应此函数
	this.showremember = function(e){

             //显示备忘录窗口
             $("#window_bg").fadeIn(300);
             $("#none_remember").slideDown(300);

             console.log('---打开了备忘录窗口');
             //读取键为remember的本地信息
             var value = localStorage.getItem("mylink_remember");
             //如果本地没有信息，对本地初始化
             if (value == null){
                 //存储信息
                 window.localStorage.setItem("mylink_remember", "");
             }
             //把本地信息读取到窗口中
             value = window.localStorage.getItem("mylink_remember");
             document.getElementById('remember_textword').value = value;

             //阻止事件冒泡，防止第一次点击备忘录就关闭子窗口
             e.stopPropagation();

	         }

	//触发某个事件后 把备忘录信息保存到本地
    this.saveremember = function () {

        var str = document.getElementById('remember_textword').value;
        //存储信息
        window.localStorage.setItem("mylink_remember",str);
        //再次隐藏备忘录窗口
        $("#none_remember").slideUp(300);
        $("#window_bg").fadeOut(300);
        // document.getElementById('window_bg').style.display = 'none';
        console.log('---关闭了备忘录窗口');
    }

}
