// AMD 模式


// A.1 定义模块
define(
  [module_id],
  [dependence_module_a, dependence_module_b],
  function(module_a, module_b){
    // do something with module_a, module_b

    // exports
    return {
      name : 'name',
      get : function(){
        module_a.get();
      }
    }
  }
)

// A.2 获取模块
require('jquery', function($){
  // do thing with $.
})


// B. requirejs
