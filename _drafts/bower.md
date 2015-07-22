---
layout: post
title:  "使用bower进行前端包管理"
---

现在的前端开发依赖很多第三方的资源：包、库、框架、字体...，我们可以利用bower来进行这些资源的
自动下载、更新，还能自动处理这些资源的各种依赖。

## 安装bower

bower依赖于node，npm，git，所以先确保你系统里有这些工具。

{% highlight bash %}

  # 使用npm全局环境下安装bower
  npm install -g bower

{% endhighlight %}

## 使用bower来安装包

通过下面的命令，就会把相应的包安装在``bower_components``目录下。

{% highlight bash %}

  # 直接通过包名称来安装
  bower install jquery
  # 通过github资源的缩写
  bower install jquery/jquery
  # 通过git的资源链接
  bower install git://github.com/jquery/jquery.git
  # 通过url
  bower install path-to-jquery.js

{% endhighlight %}

bower的其他常用命令：

{% highlight bash %}

  # 帮助命令
  bower help
  # 环境初始化，生成bower.json文件。
  bower init
  # 自定更新
  bower update
  # 搜索
  bower search <keywords>
  # 本地缓存操作
  bower cache clean
  bower cache list
  # 将包注册至远程服务器
  bower registry

{% endhighlight %}

## 使用bower.json进行包配置

通过在根目录下的bower.json可配置包的属性、依赖，用于包的注册和安装。

{% highlight javascript %}

  {
    // 包的名称，注册的名称，用户可通过这个名称找到你。
    "name" : "my-element",
    // 版本
    "version" : "1.0.0",
    // 对包的描述
    "description" : "我的第一个包。",
    // 包的主要文件，项目构建时使用的文件，bower list列出的文件
    "main" : [
      'element/my-element.html'
    ],
    // 项目依赖，在bower install时，bower会自动下载这些依赖。
    "dependencies" : {
      "polymer" : "Polymer/polymer#^1.0.0",
      "jquery" : null
    },
    // 开发时所需的依赖，配置同dependencies
    "devDependencies" : {},
    // 模块类型
    moduleType : [
      "globals", // 全局变量形式
      "amd", // AMD模式，例如requirejs
      "node", // Commonjs形式
      "es6", // ES6标准新式 export,import
      "yui" // yahoo形式
    ],
    // 包的关键词
    keywords : [
      "test",
      "element",
      "polymer"
    ],
    author : [
      'Nobody no@expamle.com'
    ]
  }

{% endhighlight %}

## 使用.bowerrc进行bower工具配置

{% highlight javascript %}
{% endhighlight %}

