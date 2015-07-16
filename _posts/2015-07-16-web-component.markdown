---
layout: post
title:  "web component 入门"
---

今天我们来探讨下如何创建自定义的元素，这个元素有它自己的功能和交互，比如创建一个
``count-down``标签，它可以实现倒计时功能。

要实现这个目标，我们需要使用web component（web组件）这种技术，这个技术包含4个内容：

- custom element
- shadow dom
- template
- html import

## custom element 自定义元素

简而言之就是自定义元素标签，自定义元素的行为和交互。我们可以使用``document.registerElement(tag-name, tag-prototype)``
方法来自定义元素。

{% highlight javascript %}

  // 创建一个input-range的自定义函数
  var InputRange = document.registerElement('input-range');
  // 接下来可以像标签一样使用
  document.appendChild(new InputRange);

{% endhighlight %}

