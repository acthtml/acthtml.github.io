---
layout: post
title:  "git设置代理"
---

git如果不能访问，只能使用代理进行。访问git有两种形式http协议和ssh协议。

对于http协议可如此设置代理：

{% highlight bash %}

git config http.proxy http://user:pwd@server.com:port

{% endhighlight %}

对于ssh协议的，找到文件``~/.ssh/config``，windows在用户目录下，没有就在对应目录
下生成一个。此文件是git的配置文件。

{% highlight text %}

Host github.com *.github.com
    ProxyCommand connect -H 127.0.0.1:1080 %h %p   #设置代理
    IdentityFile ~/.ssh/id_rsa
    User git

{% endhighlight %}

