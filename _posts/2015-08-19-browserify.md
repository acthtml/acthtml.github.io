---
layout: post
title:  "Browserify：将以CommonJS标准管理依赖的文件打包成一个文件"
---

Nodejs以CommonJS标准管理依赖文件，但是浏览器环境不支持这种管理方式，所以，如果要
做到服务器和浏览器代码同构的话，就需要将这些依赖文件打包，browserify就是这么一个
工具，它使用起来非常简单。

## 1. 安装browserify

{% highlight bash %}

npm install -g browserify

{% endhighlight %}

## 2. 将包含``require("modules")``的文件打包成一个

{% highlight bash %}

browserify app.js -o bundle.js

{% endhighlight %}

下面是上面示例中用到的文件，app.js：

{% highlight javascript %}

var uniq = require("unique"),
    data = [1, 2, 2, 3, 4, 5, 5, 5, 6];

console.log(uniq(data));

{% endhighlight %}

最终，运行2中的命令，会将app.js中依赖的文件也引用进来，并生成最终的文件bundle.js。

Just try it.


参考地址：

- [browserify](http://browserify.org/)

