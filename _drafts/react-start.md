---
layout: post
title:  "React 入门实践"
---

## 为什么React

React 是 facebook 2013 年开源的前端框架，为了构建复杂的交互应用程序，大家通常把它
理解成MVC中的V（视图层）。React具有以下优点：

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

下面进一步分析React涉及到的知识点：JSX语法，虚拟DOM，props，state。

## JSX语法

JSX语法能让你在js环境下，直接使用XML格式的语句来编辑js。其原理就是将每一个xml语句解析成一个
js函数调用。所谓的组件就是每一个xml语句。

利用xml语句来表达组件的形式有点类似[web component 技术](/2015/07/16/web-component.html)，
但实现原理不一样。web component技术利用``document.registerElement``来自定义标签，利用
``shadow dom``、``template``来给自定义标签添加相应的行为交互，并用``html import``来整合
这个标签所需的资源。

在开头演示的例子里，jsx语法通过JSXTransformer将每个XML转换成相应的``React.createElement()``
语句：

{% highlight javascript %}

  // jsx语句
  <Avatar src="images/avatar.png" name="John" />

  // 对应的js语句
  React.createElement(Avatar, {src : "images/avatar.png", name : "John"})

{% endhighlight %}
