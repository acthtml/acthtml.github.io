---
layout: post
title:  "使用rem进行响应式开发"
---

根据[``rem``](http://isux.tencent.com/web-app-rem.html)进行响应式开发。

假设我们的设计稿宽度为``640px``，那我们的元素宽度计算公式为：

``html font-size = 当前视窗大小 / 6.4 (px)``

``元素宽度 = 设计稿宽度 / 100 (rem)``

通过css的样式表达式可以实时计算``font-size``：

{% highlight css %}

html {
  font-size: calc(100vw/6.4)!important;
  -webkit-text-size-adjust: none;
}

{% endhighlight %}

另外我们优化下，在小屏不太小，大屏不太大：

{% highlight css %}

html {
    font-size: calc(100vw/6.4)!important;
    -webkit-text-size-adjust: none;
}

@media screen and (min-width: 640px) {
    html {
        font-size: calc(640px/6.4)!important;
    }
}

@media screen and (max-width: 320px) {
    html {
        font-size: calc(320px/6.4)!important;
    }
}

{% endhighlight %}

对于不支持样式表达式的客户端，在样式前使用js设置``font-size``大小：

{% highlight html %}

<script>
  document.documentElement.style.fontSize = window.innerWidth / 6.4 + "px";
</script>
<link rel="stylesheet" href="path/to/style.css">

{% endhighlight %}

最后，对于不支持rem的可以使用脚本进行实时计算，页面中只要添加这个脚本[rem polyfill](https://github.com/chuckcarpenter/REM-unit-polyfill/tree/master/js)就行了。

[demo](/assets/responsive-develop-with-rem/rem.html)
