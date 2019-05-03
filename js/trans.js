var module_trans = function(){

	
	//点击翻译按钮响应此函数
	this.trans = function(e){
		     url = 'trans.html';

             var set = 'height=480px,width=600px,left=350px,top=100px';
             newwindow = window.open(url,'_blank ',set);
             console.log('---打开了翻译窗口');
            //阻止事件冒泡，防止第一次点击备忘录就关闭子窗口
             e.stopPropagation();
	         }
}