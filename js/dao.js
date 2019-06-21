/**
 *  关于数据读取的模块
 *  本次使用localStorage存储数据
 *  本模块供业务层调用
 */
var module_dao = function () {
    //根据键获取数据
    this.getdata = function (key) {
          return JSON.parse(window.localStorage.getItem(key));
    }
    //根据键值对保存数据
    this.setdata = function (key,data) {
          return window.localStorage.setItem(key,JSON.stringify(data));
    }
    //根据键删除数据
    this.deldata = function(key){
       return window.localStorage.removeItem(key);
    }

}