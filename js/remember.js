var module_remember = function(){
	//点击页面备忘录按钮响应此函数
	this.remember = function(e){
		     url = 'remember.html';

             var set = 'height=483px,width=590px,left=350px,top=100px';
             newwindow = window.open(url,'_blank ',set);
             console.log('---打开了备忘录窗口');
         
            //阻止事件冒泡，防止第一次点击备忘录就关闭子窗口
             e.stopPropagation();

	         }


}
