---
layout: post
title:  "React 入门实践"
---

## 为什么React

React 是 facebook 2013 年开源的前端框架，为了构建复杂的交互应用程序，大家通常把它
理解成MVC中的V（视图层）。React具有这些优点：

- 使用可复用、可组合的组件来构建应用。
- 当数据更新时，React会自动更新用户界面。
- 这种更新是高效的，只改变需要更新的部分。

## 什么是React

React是通过JSX语法来编写组件，通过组件来操作虚拟DOM，通过虚拟DOM来操作标准DOM的一
个js框架。

其中组件要实现可复用、自更新，它使用了``props``来配置组件，``state``实现状态机，
从而让组件自更新。

下面一个简单的例子看React如何使用。

{% highlight html %}

  <!-- 引用React,和将JSX语法转换成标准js的JSXTransformer -->
  <script src="js/react.js"></script>
  <script src="js/JSXTransformer.js"></script>

  <div id="example"></div>

  <script type="text/jsx">
    // 通过script[type=text/jsx]标签可书写JSX语法的语句。

    // 定义一个名为 Avatar 的组件，用于显示用户头像。
    // 用户使用的使用只要配置头像图片和用户姓名可以重复使用。
    var Avatar = React.createClass({
      // 渲染组件对应的html结构。
      render : function(){
        return (
          <div className="avatar">
            <img src={this.props.src} alt={this.props.name}>
            <h3>{this.props.name}</h3>
          </div>
        );
      }
    });

    // 使用组件，插入到指定dom中，并且为组件配置属性 src 和 name，在组件内部可以通
    // 过 this.props 对象访问对应的配置属性。
    React.render(<Avatar src="images/avatar.png" name="John" />, document.getElementById('wrapper'));
  </script>

{% endhighlight%}

下面详解涉及到的知识点：JSX语法，虚拟DOM，``props``配置组件，``state``状态机。


## JSX语法

JSX语法就是像编写XML那样编写js代码。灵感的来源是[web component技术](/2015/07/16/web-component.html)，
通过web组件来实现代码的可复用、可组合，进而创建复杂的交互应用。但是实现原理不一样：
web component 技术是利用``document.registerElement``来创建标签，通过shadow dom、
template、html import来给对应的标签添加相应的行为事件；而JSX语法则是将XML标签直
接换成对应的js语法，进而控制相应的DOM来实现组件。

在JSX语法环境中，你可以使用XML标签一样来使用组件：

{% highlight javascript %}

  // 创建一个名为Nav的组件。
  var Nav = React.createClass({ .... })

  // 使用JSX语法
  var mainNav = <Nav mode="main" />

  // 经过JSXTransformer转换的js语句
  var mainNav = React.createElement(Nav, {mode : 'main'})

{% endhighlight %}
