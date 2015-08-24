---
layout: post
title:  "webpack：前端开发打包工具"
---

## 1. 安装webpack

{% highlight bash %}

npm install -g webpack

{% endhighlight %}

## 2. 简单打包js文件

{% highlight javascript %}

// entry.js
document.write('entry.js works');
document.write(require('./content'))

// content.js
module.exports = 'content.js works'

{% endhighlight %}

{% highlight bash %}

// 将entry.js和其依赖的content.js一起打包成bundle.js
webpack ./entry.js bundle.js

{% endhighlight %}

## 3. 使用加载器（loader）打包其他资源

webpack的另一个重要特性就是有加载器这个概念。他能使你需要处理的文件先通过加载器
处理再进行下一步，并且加载还支持链式处理，意思是同一个文件可以依次通过加载器加工
处理。

例如下面，先使用``css-loader``去读css文件，再使用``style-loader``将样式文件添加到
文档中。

{% highlight javascript %}

// entry.js
require('!style!css!./style.css')
document.write('entry.js works');
document.write(require('./content'))

{% endhighlight %}

webpack的[loader列表](https://github.com/webpack/docs/wiki/list-of-loaders)。

## 4. 使用webpack.config.js配置文件

使用配置文件可以使命令简化，列如：

{% highlight javascript %}

// webpack.config.js
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};

{% endhighlight %}

{% highlight bash %}

# 在命令上中直接使用命令可以通过配置文件中的配置自动执行操作。
webpack

{% endhighlight %}

### 5. 查看编译进程并在修改时自动编译。

{% highlight bash %}

# --process能查看编译进程，--colors改进输出排版，--watch则文件有修改就重新编译
webpack --progress --colors --watch

{% endhighlight %}

npm install webpack-dev-server -g
webpack-dev-server --progress --colors
