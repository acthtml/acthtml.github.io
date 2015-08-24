---
layout: post
title:  "ES6标准的模块化语法"
---

## ES6标准的模块化语法

相比CommonJS而言，ES6标准的模块化语法更加紧凑。

下面是一个模块文件，moduleA.js

{% highlight javascript %}

  // moduleA.js
  exports var name = 'John';
  exports function hello(){
    console.log('Hello, ' + name);
  }

{% endhighlight %}

在moduleB.js中调用moudleA的方法属性：

{% highlight javascript %}

  // moduleB.js
  // 方法一，import ... from ...
  import {name, hello} from 'moduleA';
  // 方法二，import ... as ...
  import 'moduleA' as moduleA;
  moduleA.hello();

{% endhighlight %}
