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

现代浏览器已经有提供注册、创建新html标签的接口。

{% highlight javascript %}

  // 注册
  document.registerElement('my-tag');
  // 创建
  document.createElement('my-tag');

{% endhighlight %}

当然标签有相应的[行为、属性需要定义](http://w3c.github.io/webcomponents/spec/custom/#registering-custom-elements)，
还有涉及到注册、创建还有一系列的[生命周期回调](http://w3c.github.io/webcomponents/spec/custom/#custom-element-lifecycle)。

### 2. Shodow Dom

在创建元素时，有些元素需要自带默认的html交互样式，而shadow dom就是用来定义这些默认
样式的，就像`<select>`的下拉选项，'input:search'的search icon。并且就像上面提到的
`select`和`input:search`那样，shodow dom的样式不会被页面中的其他元素污染，它也不会
去污染其他元素。

需要看到相应的标签的shadow dom先要让浏览器开启这个选项：
![浏览器开启shadow dom](/assets/start-polymer/shadow-dom-enable.png)

接下来看看原生`input:search` shdow dom 的样子：
![input:search标签](/assets/start-polymer/shadow-dom-input-search.png)
![input:search标签代码](/assets/start-polymer/shadow-dom-input-search-code.png)

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


参考文档：

- [web components](http://webcomponents.org/)
- [custom element](http://w3c.github.io/webcomponents/spec/custom/)
- [shadow dom](http://w3c.github.io/webcomponents/spec/shadow/)
