---
layout: post
title:  "ES6语法精选"
---

# 怎么使用ES6

es6标准大多数浏览器还未支持，nodejs的话也要0.11版本以上，但是我们可以通过google开
发的``Traceur``编译器将es6编译成es5，从而在低版本的浏览器和服务器上使用。

{% highlight shell %}

# 安装traceur
npm install -g traceur
# 将文件es6.js的es6语法编译成es5语法，并输出到文件es5.js
traceur --script es6.js --out es5.js

{% endhighlight %}

在node.js环境中使用

{% highlight javascript %}

var traceur = require('traceur'),
    fs = require('fs');

var content = fs.readFileSync('es6.js').toString(),
    result = traceur.compile(content, {
      filename : 'es6.js'
    })

if(result.error) throw result.error;

// result的js属性是转换后的es5代码
fs.writeFileSync('es5.js', result.js);

{% endhighlight %}


# 变量声明的扩展

新增两个关键词``let``和``const``，``let``使声明的变量限制在局部作用域中，避免像``var``
那样会引起作用域提升。

{% highlight javascript %}

if(true){
  let a = 'a';
  var b = 'b';
}

console.log(a); // 报错 a is not definded

{% endhighlight %}

而``const``则增加js所没有的常量声明，常量则在后续程序中值都不能更改。

{% highlight javascript %}

// 声明常量
const A = 'A';

// 常量不能重新赋值
A = 'B'; // TypeError: Assignment to constant variable.

// 常量需要在声明的时候直接赋值;
const B; // SyntaxError: Unexpected token ;
B = 'B';

{% endhighlight %}
