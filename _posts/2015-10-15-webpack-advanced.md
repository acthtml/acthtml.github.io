---
layout: post
title:  "webpack进阶"
---

[上一篇](/2015/08/25/webpack.html)是基于命令行的，但是我们在同构化的过程中，需要
在nodejs环境中动态生成。

这个需求也是一句话可以搞定的，通过``webpack()``加载配置，进行预处理：

{% highlight javascript %}

var webpack = require('webpack'),
    config = {
        entry : './src/entry',
        output : './build/build.js'
}

webpack(config, function(err, status){
    console.log('webpack processed');
})

{% endhighlight %}

就这些，接下来，做下配置的笔记。

{% highlight javascript %}

// webpack.config.js

export {
    // 需要处理的实体，
    // 当字符串时为处理的单个文件，
    // 当数组时则处理最后获取到的，
    // 当对象时则处理每一个对应的文件。
    entry : {
        pageA : './page1',
        pageB : ['./page2', './page3']
    },
    // 定义输出文件格式
    output : {
        // 输出文件夹
        path : __dirname + '/build',
        // 文件名，有占位符[name],[id],[hash]...
        filename : '[name].build.js'
    },
    // 定义处理模块
    module : {
      loaders : [
        {
            test : /\.css$/,
            loader : 'style!css'
        }
      ]
    }
}

{% endhighlight %}
