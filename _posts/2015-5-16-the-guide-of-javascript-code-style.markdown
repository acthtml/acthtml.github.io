---
layout: post
title:  "js代码风格指南"
---

我一直有这样的一个想法，团队间成员的代码风格一致，并且我们编写的js能够自动生产开
发文档。今天，我就朝着这个想法来迈进一步。

## 1. 代码风格

代码风格一致势必要有一套代码规范，而且这套规范应该是最佳实践，而不是教条主义。

### 1.1 空白与缩进

永远使用两个空格作为缩进，这样会让你的代码在各个编辑器里看起来一致。如果你习惯使
用tab作为缩进，请将其绑定成等同于两个空格键。

例如在sublime text中可以这么设置：

{% highlight javascript %}
  // Preferences => Settings - User
  {
    // tab大小为2个
    "tab_size": 2,
    // 将tab转换成空格
    "translate_tabs_to_spaces": true
  }

  // 下面是sublime的最佳编写方案
  {
    "color_scheme": "Packages/Color Scheme - Default/Monokai.tmTheme",
    "default_line_ending": "unix",
    "ensure_newline_at_eof_on_save": true,
    "fallback_encoding": "UTF-8",
    "ignored_packages":
    [
      "Vintage"
    ],
    "rulers":
    [
      80
    ],
    "shift_tab_unindent": true,
    "tab_size": 2,
    "translate_tabs_to_spaces": true,
    "trim_automatic_white_space": true,
    "trim_trailing_white_space_on_save": true,
    "use_tab_stops": true,
    "word_separators": "./\\()\"'-:,.;<>~!@#%^&*|+=[]{}`~?"
  }
{% endhighlight %}

### 1.2 变量

所有声明的变量必须加上``var``关键词，并且变量的赋值尽可能的延迟。

如果不加var声明，则变量就暴露在全局上下文中，这就有可能造成变量冲突，另外因为js的
链式作用域，变量会从局部逐级往上，直到找到对应的值，有性能消耗。变量赋值的话，就
开始占内存了，也有性能消耗。

再说说变量的命名。除了常规的用最简洁的命名来体现这个变量是做什么的，还能通过其写
法来体现数据结构。

{% highlight javascript %}
  // 命名普通变量采用下划线
  variable_name_like_this;
  // 命名函数、对象、实例采用小驼峰形式
  functionNameLikeThis();
  // 命名构建器、原型采用大驼峰形式
  ConstructorNamesLikeThis;
  // 正则表达式
  rNameLikeThis = /d/i;
  // 常量采用大写下划线形式
  SYMBOLIC_CONSTANTS_LIKE_THIS;
{% endhighlight %}

变量的数据类型检测。

{% highlight javascript %}
  // string
  typeof variabel === 'string';
  // number
  typeof variable === 'number';
  // boolean
  typeof variable === 'boolean';
  // object
  typeof variable === 'object';
  // array
  Array.isArray([]);
  [] instanceof Array;
  // Node
  elem.nodeType === 1;
  // null
  variable === null;
  // null or undefined
  variable == null;
  // undefined
  typeof variable === 'undefined';
{% endhighlight %}

### 1.3 引号和分号

引号默认优先采用单引号``'``，当你碰到需要引用带属性的html的时候就知道它的好处了。

分号，作为js语句的明确结束符，你不想有麻烦就不要漏掉它。

{% highlight javascript %}

  // A.
  var getSquare = function(num){
    return num * num;
  }// 这儿错误的省略了分号

  (function(){
    // do something
    return 2;
  })();

  // A中代码被压缩后，你会发现会变成这样的逻辑，然后我们逐步分解
  var getSquare = function(num){return num*num}(function(){return 2})();
  // 匿名函数会当成getSquare函数的参数。
  var getSquare = function(num){return num * num}(2)();
  // 这个参数传递给前面的函数，最终以下面的逻辑运行，并报错。
  var getSquare = 4();

  // B.
  var obj = {
    a : 'a',
    b : 'b'
  }// 这儿错误的省略了分号

  // 接下来你写了下面结构的代码就会有歧义了。
  // 想在ie下执行ieVersion函数，其他执行normalVersion函数，你也许这么写：
  [normalVersion, ieVersion][isIE]();

  // B中代码在压缩后，同样逻辑会有问题，它会按这样的顺序执行，接着会报没有指定属性的错误。
  var obj = ({...}[...])[]();

  // C.
  var index = 2 // 这儿错误的省略了分号

  // 当num为-1时，程序关闭
  -1 == num || die();

  // C中的代码压缩会变成下面的逻辑了
  var index = 2 -1 == num || die();

{% endhighlight %}

### 1.4 函数

函数不能在块内声明一个函数，例如：

{% highlight javascript %}
  if(true){
    function foo(){} // 不能在块中声明一个函数。s
    foo();
  }

  // 如果采用var这种形式声明函数的话，需要在函数调用前就声明好。
  bar(); // 这里的bar是undefined，所以会报错。
  var bar = function(){};
  bar(); // 这里可以调用到。
{% endhighlight %}

### 1.5 闭包

闭包也许是js最有意思的特性了，这里有一个好且简洁的[文档](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)。

闭包可以使用，但要小心使用。闭包保留了一个指向它作用域的指针，所以它可能会引起循环引用，导致内
存泄露。

{% highlight javascript %}
  function foo(elem, a, b){
    elem.onclick = function(){
      /* uses a and b */
    };
  }
  // 这里即使没有使用elme，闭包也保留着elem，a的引用，由于elem也保留着闭包的引用，这就产生
  循环引用，无法被垃圾回收机制（garbage collection）回收，这种情况可以用下面这种形式重构。

  function foo(element, a, b) {
    element.onclick = bar(a, b);
  }

  function bar(a, b) {
    return function() { /* uses a and b */ }
  }
{% endhighlight %}

### 1.6 for-in循环

不适用对数组的遍历。因为它并不是从0到length-1进行遍历的，而是遍历出现对象及其对象原型链中所有
的键值。

下面对array结构使用for-in的例子。

{% highlight javascript %}

  function printArray(arr) {
    for (var key in arr) {
      console.log(key);
    }
  }

  printArray([0,1,2,3]);  // This works.

  var a = new Array(10);
  printArray(a);  // This is wrong.

  a = document.getElementsByTagName('*');
  printArray(a);  // This is wrong.

  a = [0,1,2,3];
  a.buhu = 'wine';
  printArray(a);  // This is wrong again.

  a = new Array;
  a[3] = 3;
  printArray(a);  // This is wrong again.

{% endhighlight %}


参考文档：
- [书写具备一致风格、通俗易懂 JavaScript 的原则](https://github.com/rwaldron/idiomatic.js/tree/master/translations/zh_CN)
- [Google JavaScript 编码规范指南](http://alloyteam.github.io/JX/doc/specification/google-javascript.xml)
- [JSDoc 语法](http://usejsdoc.org/)
- [JS文档生成工具：JSDoc 介绍](http://www.jianshu.com/p/6c49e2a0cebe)

