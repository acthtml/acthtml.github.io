// 一种是直接字面量
var obj = {};

// 另一种则是通过构造函数加关键词``new``的形式。
var obj = new Object();

// 我们通常采用字面量的形式来创建对象，接下来是字面量模式的典型场景：

var Page = {
  // 初始化
  init : function(){
    this.methodA();
    this.methodB();
  },

  methodA : function(){},
  methodB : function(){}
};

Page.init();
