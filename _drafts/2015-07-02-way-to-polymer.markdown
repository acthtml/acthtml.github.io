---
layout: post
title:  "Polymer 入门"
---

前端UI组件能否像`<select>`标签那样，到哪里表现都一致，而且页面上的其他元素也不会
影响它的行为，它也不会污染其他页面元素的行为，这就是我们常说的封装性。

我们先来列举一下原生html标签带来的好处：

- 封装性。每个浏览器都知道这个标签该干什么，并且可复用。
- 可配置。直接通过html属性配置，通过DOM API就能直接访问这些属性的值了。
- 事件发布。每个元素都能委托事件。
- 支持数据双向绑定。

那html标签有这么多好处，我们为什么不自定义标签，并且定义标签的行为呢。我们这里可
以通过 web components（web 组件化）这个技术来实现。

web components技术比较超前，暂时safari和ie还支持的不够好。它由4中技术构成：

### 1. Custom Element 自定义元素

元素的注册和创建

{% highlight javascript %}

  // 注册
  document.registerElement('my-tag');
  // 创建
  document.createElement('my-tag');

{% endhighlight %}

### 2. Shodow Dom

- light dom
- shadow dom
- composed dom

### 3. html import

{% highlight html %}

  <link rel="import" href="path-to-resource.html">

{% endhighlight %}

### 4. template

{% highlight html %}

  <tempate>
    <p>Here is template...</p>
  </template>

{% endhighlight %}

