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

参考文档：
- [书写具备一致风格、通俗易懂 JavaScript 的原则](https://github.com/rwaldron/idiomatic.js/tree/master/translations/zh_CN)
- [Google JavaScript 编码规范指南](http://alloyteam.github.io/JX/doc/specification/google-javascript.xml)
- [JSDoc 语法](http://usejsdoc.org/)
- [JS文档生成工具：JSDoc 介绍](http://www.jianshu.com/p/6c49e2a0cebe)

