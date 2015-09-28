---
layout: post
title:  "sublime安装package control代理"
---

sublime的package control的相关网络接口在国内不是很稳定，所以想到了利用shadowsocks
作为代理。

1. 安装[nodejs](https://nodejs.org/)

2. 安装[shadowsocks](https://www.npmjs.com/package/shadowsocks)

{% highlight bash %}

  npm install -g shadowsocks

{% endhighlight %}

3. 创建一个config.json， 设置shadowsocks配置

{% highlight javascript %}

{
    "server":"xxx",
    "server_port":1000,
    "local_port":1000,
    "password":"1000",
    "timeout":600,
    "method":"table",
    "local_address":"127.0.0.1"
}

{% endhighlight %}

4. 开启本地的shadowsocks客户端

{% highlight bash %}

  sslocal

{% endhighlight %}

5. sublime安装[package control](https://packagecontrol.io/)。你可以下载本地文档，
  解压缩到sublime选项``preferences > browse packages``对应的目录，然后重启sublime，
  即安装完成了package control。

6. 配置sublime的package control的网络代理。打开package control的配置选项``preferences > package settings > package control > settings - user``

{% highlight javascript %}

{
	"http_proxy": "http://127.0.0.1:1080",
	"https_proxy": "http://127.0.0.1:1080"
}

{% endhighlight %}
