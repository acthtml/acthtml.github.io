---
layout: post
title:  "web component 技术介绍"
---

今天我们来探讨下如何创建自定义的元素，这个元素有它自己的功能和交互，比如创建一个
``input-range``标签，它可以实现一个类似``input:range``的功能。

要实现这个目标，我们需要注册自定义标签，给自定义标签添加样式和div，以及对应的行为。并且能够简
便的引用这个自定义标签所需依赖的样式、脚本、和HTML。这几个需求正好对应下面四种技术：

- custom element
- shadow dom
- template
- html import

这四种技术之后就是web component技术。接下来，我们依次了解下这4种技术。

## custom element 自定义元素

简而言之就是自定义元素标签，自定义元素的行为和交互。我们可以使用``document.registerElement(tag-name, tag-prototype)``
方法来自定义元素。

{% highlight javascript %}

  // 创建一个input-range的自定义函数
  var InputRange = document.registerElement('input-range');
  // 接下来可以像标签一样使用
  document.appendChild(new InputRange);

{% endhighlight %}

接下来我们希望它跟原生的HTML标签一样，有``innerHTML``,``className``之类的属性，所以它
的原型需要继承自``HTMLElement.prototype``。它还需要定义倒计时功能，并且我们希望它被
创建的时候就开始倒计时，这一点我们可以利用自定义元素的生命周期来办到。

{% highlight javascript %}

  // 创建名为 input-range 的元素
  var InputRange = document.registerElement('input-range', {
    // 元素原型继承自标准的HTML元素
    prototype : $.extend(Object.create(HTMLElement.prototype), {
      // 在创建之后，元素倒计时自动开始。
      // 元素的生命周期：
      // - created 创建
      // - attached 插入
      // - deattached 移除
      // - attributeChanged 元素的属性变化
      createdCallback : function(){
        // 初始化html结构
        this.initHTML();
        // 初始配置数据
        this.initConfig();
        // 初始化事件监听
        this.initEvents();
      },
      // 初始化html结构
      initHTML : function(){
        // create shadow root
        var root = this.createShadowRoot();

        // create wrapper
        var wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        root.appendChild(wrapper);
        this.wrapper = $(wrapper);

        // create bar
        var bar = document.createElement('div');
        bar.className = 'bar';
        wrapper.appendChild(bar);
        this.bar = $(bar);

        // create circle
        var circle = document.createElement('span');
        circle.className = 'circle';
        wrapper.appendChild(circle);
        this.circle = $(circle);
        this.circle.html(this.value);
      },
      // 初始化配置数据
      initConfig : function(){
        this.min = parseInt($(this).attr('min') || 0);
        this.max = parseInt($(this).attr('max') || 100);

        this.left_boundary = this.bar.offset().left;
        this.right_boundary = this.left_boundary + this.bar.width();
        this.left = this.circle.offset().left || 0;
      },
      // 初始化事件监听
      initEvents : function(){
        this.circle.on('mousedown', $.proxy(this.active, this));
        this.circle.on('mouseup', $.proxy(this.deactive, this));
        this.circle.on('mouseout', $.proxy(this.deactive, this));

        this.circle.on('mousemove', function(event){
          this.move(event.pageX);
        }.bind(this))
      },
      // 当前值
      value : 0,
      // 最小值
      min : 0,
      // 最大值
      max : 100,
      // 左边界
      left_boundary : 0,
      // 右边界
      right_boundary : 0,
      // 是否已激活
      actived : false,
      // 激活
      active : function(){
        if(this.actived) return;

        this.actived = true;
        this.wrapper.addClass('active');
      },
      // 取消激活
      deactive : function(){
        if(!this.actived) return;

        this.actived = false;
        this.wrapper.removeClass('active');
      },
      // 当前圆点的位置
      left : 0,
      // 移动圆点
      move : function(pageX){
        if(!this.actived){
          this._last_pagex = 0;
          return;
        }

        if(!this._last_pagex){
          this._last_pagex = pageX;
        }

        var diff = pageX - this._last_pagex, // 移动了多少px, 负的向左，正的向右。
            left = this.left; // 当前圆点的位置。

        this._last_pagex = pageX;
        left = left + diff;

        if(left < this.left_boundary || left > this.right_boundary){
          diff = 0;
        }


        if(diff == 0) return;

        // 开始移动位置,
        this.moveTo(left);
      },
      // 圆点移动到指定位置
      moveTo : function(left){
        this.left = left;

        this.circle.css({
          left : left + 'px'
        })

        this.value = this.min + Math.ceil((left - this.left_boundary) / (this.right_boundary - this.left_boundary) * (this.max - this.min));
        this.circle.html(this.value);
      }
    })
  })

{% endhighlight %}

上面是创造全新的元素，我们可以在注册的原型中设置``extends``属性，例如下面我们扩展``button``,
每次点击按钮自动变色。

{% highlight javascript %}

  // 会变色的按钮 color-button
  var ColorButton = document.registerElement('color-button', {
    // 对现有原生标签进行扩展，使用的时候，只要添加is="button"这个属性就行
    // 例如 <button is="color-button">会变色的button</button>
    extends : 'button',
    prototype : $.extend(Object.create(HTMLElement.prototype), {
      createdCallback : function(){
        $(this).on('click', $.proxy(this.change, this));
      },

      change : function(){
        $(this).css({
          background : this.randomColor()
        })
      },

      randomColor : function(){
        return '#' + (Math.random() * 0xffffff << 0).toString(16);
      }
    })
  })

{% endhighlight %}

上面的[demo在这里](/assets/webcomponents/custom-element.html)。因为这是个新规范，
你可以通过下面的代码片段判断当前的浏览器是否支持custom element。

{% highlight javascript %}

  if('registerElement' in document){
    // 支持custom element
  }

{% endhighlight %}

## shadow dom

上面的方法已经能很方便的仅仅通过一个标签使用相应的组件，并且无论这个标签是如何创
建的，它都能准确的为它绑定相应的功能和交互，但是这样还不够好：

- 它的引入会对页面的其他元素产生影响，在页面中添加了dom结构和对应的样式都可能对
  页面上的其他元素产生影响。
- 其他元素的样式脚本也会对这个这个元素产生影响。

我们要做的是完全屏蔽，就像``select``，``video``标签那样，要做到这样，我们必须将
元素包含的内部节点不包含在dom tree中，这样就能完全屏蔽传统dom操作对它的影响了。

那这些节点放在哪呢？dom节点下的shadow dom。

我们可以通过``createShadowRoot``给一个dom创建一个shadow dom。

{% highlight javascript %}

  var dom = document.getElementByTagName('input-range'),
      // 创建shadow dom
      root = dom.createShadowRoot();

  // 元素的shadow dom在浏览器以#shadow-root标示。
  root.appendChild(document.createElement('div'));

{% endhighlight %}

接下来我们改造上面的``input-range``这个例子。

{% highlight javascript %}

  // 改造创建子节点的方法，将其子节点插入的位置都在该节点的shadow dom下。
  // 初始化html结构
  initHTML : function(){
    // create shadow root
    var root = this.createShadowRoot();

    // ...
  }

{% endhighlight %}

并且需要改写样式书写规则，对shadow dom写样式需要使用``::shadow``这个伪类。

{% highlight html %}

  <style>
    /* ::shadow 伪类用来选中shadow dom */
    input-range::shadow .wrapper{position: relative;height: 50px;}
    /* ... */
  </style>

{% endhighlight %}

点击查看完整的[shadow dom的demo](/assets/webcomponents/shadow-dom.html)。

判断当前浏览器是否支持shadow dom可以利用当前dom中是否含有'createShadowRoot'方法。

{% highlight javascript %}

  if( 'createShadowRoot' in document.createElement('div')){
    // 支持shadow root
  }else{
    // 不支持。
  }

{% endhighlight %}


## template 模板标签

js的模板语言很多，这个HTML5的原生规范，将模板dom通过``template``包裹，那么这些dom
只有在用的时候才会对现有页面影响，里面的任何标签也只在用的时候进行解析。

我们可以通过``template``标签的``content``属性获取template里的dom结构。

然后我们利用template改造上面的``input-range``demo。

将要插入到shadow dom中的div全部抽离出来，放在``template``中。

{% highlight html %}

  <template id="input-range">
    <div class="wrapper">
      <div class="bar"></div>
      <div class="circle"></div>
    </div>
  </template>

{% endhighlight %}

然后改造创建shadow dom那一部分。

{% highlight javascript %}

  // 初始化html结构
  initHTML : function(){
    // create shadow root
    var root = this.createShadowRoot();

    // get template
    var template = document.getElementById('input-range').content;
    template = document.importNode(template, true);
    root.appendChild(template);

    this.wrapper = $('.wrapper', root);
    this.bar = $('.bar', root);
    this.circle = $('.circle', root);
    this.circle.html(this.value);
  },
  // ...

{% endhighlight %}

好了，原生的tempalte就只有这么点功能。

点击这里查看完整的[template demo](/assets/webcomponents/template.html)。

## html import

一个组件包含三样东西: html、css、js。我们引用组件的时候我们需要同时依赖引用这3样
东西。css，js都可以利用``link[rel=stylesheet]``和``script``标签加载，
但是html还有，所以w3c就定义了新的``link[rel=import]``标
签，用来加载html片段。

我们可以把组件相关的资源都放在一个独立的html，要用的时候引用进来。

{% highlight html %}

  <html lang="en">
  <head>
    <link rel="import" href="elements/input-range.html">
  </head>
  <body>
    <input-range></input-range>
  </body>
  </html>

{% endhighlight %}

{% highlight html %}

  <!-- elements/input-range.html -->

  <style>
    /* ... write here */
  </style>

  <tempalte>
    <!-- ... write here -->
  </tempalte>

  <script>
    // ... write here
  </script>

{% endhighlight %}

点击这里查看完整的[html import demo](/assets/webcomponents/html-import.html)。


## 相关参考

- [custom element 规范](http://w3c.github.io/webcomponents/spec/custom/)
- [How to Create Custom HTML Elements](http://blog.teamtreehouse.com/create-custom-html-elements-2)
- [template](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)
- [Introduction to HTML Imports](http://webcomponents.org/articles/introduction-to-html-imports/)
