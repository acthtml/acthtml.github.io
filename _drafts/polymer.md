---
layout: post
title:  "polymer 技术介绍"
---

polymer是google出品的基于[web component技术](/2015/07/16/web-component.html)的一个框
架，帮助我们快速自定义元素。

## 快速开始

1. 使用bower安装polymer框架。

{% highlight bash %}

  # polymer basic, webcomponents
  bower install Polymer/polymer#^1.0.0
  # polymer iron elements
  bower install PolymerElements/iron-elements
  # polymer paper elements
  bower install PolymerElements/paper-elements

{% endhighlight %}

2. 在页面中引用webcomponets框架，用html import引用元素，直接使用它。

{% highlight html %}

  <!-- 引用web component基础框架 -->
  <script src="bower_components/webcomponentsjs/webcomponents.js"></script>
  <!-- 引用想用的页面元素 -->
  <link rel="import" href="elements/super-button/super-button.html">

  <!-- 直接使用 -->
  <super-button>A Super Button</super-button>

{% endhighlight %}

## 用polymer自定义元素
