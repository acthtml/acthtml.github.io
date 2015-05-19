// 模块模式

var testModule = (function(){
  var count = 0;

  return {
    setCount : function(i){
      count = i;
      return i;
    },
    getCount : function(){
      return count;
    },
    incrementCount : function(){
      return ++count;
    },
    resetCount : function(){
      count = 0;
    }
  }
})();
