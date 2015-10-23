---
layout: post
title:  "ES6语法精选"
---

# 怎么使用ES6

es6标准大多数浏览器还未支持，nodejs的话也要0.11版本以上，但是我们可以通过google开
发的``Traceur``编译器将es6编译成es5。

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
