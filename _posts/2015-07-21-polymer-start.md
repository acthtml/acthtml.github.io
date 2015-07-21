---
layout: post
title:  "polymer，谷歌出品的基于webcomponent的框架"
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
  <link rel="import" href="super-button.html">

  <!-- 直接使用 -->
  <super-button>A Super Button</super-button>

{% endhighlight %}

3. 使用polymer自定义元素

{% highlight html %}

  <!-- supper-button.html -->
  <link rel="stylesheet" href="bower_components/polymer/polymer.html">
  <dom-module id="supper-button">
    <style>
      <!-- style here -->
    </style>

    <template>
      <!-- template here -->
    </template>

    <script>
      Polymer({
        // 自定义元素的名称，必须小写且包含连词符。包含连词符是为了跟标准html标签区别。
        // 这个名称跟dom-module的id对应。
        is : 'supper-button',
        properties : {
          // 元素的属性
        }
      })
    </script>
  </dom-module>

{% endhighlight %}


## polymer的特性

总体来说，polymer的处理方式跟webcomponentsjs差不多。

### 注册

你可以直接使用``Polymer()``注册也可以使用``dom-module``标签注册元素，唯一的区别是
使用``dom-module``可以更方便的包含元素的样式和``local dom``。

polymer利用``factoryImpl``也支持构造函数形式的声明：

{% highlight javascript %}

  var SupperButton = Polymer({
    is : 'supper-button',
    factoryImpl : function(text, color){
      this.text = text;
      this.color = color;
    }
  });

  var RedButton = new SupperButton('red', '#f00'),
      WhiteButton = new SupperButton('white', '#fff');

{% endhighlight %}

同webcomponent一样，也可以利用``extends``属性对现有标准html标签进行扩展：

{% highlight javascript %}

  Polymer({
    is : 'super-button',
    extend : 'button' // 扩展原生<button>元素，直接<button is="supper-button"></button>来使用
  })

{% endhighlight %}

使用``behaviors``来实现多个元素的原型共享。它支持多维数组形式，递归式的合并。

{% highlight javascript %}

  Polymer({
    is : 'super-button',
    behaviors : [prototypeA, [prototypeB, prototypeC]]
  })

{% endhighlight %}

### 生命周期

元素有在整个生命周期中，经历这些过程：

- ``created()``，对应web component的createdCallback()。
- ``local dom``初始化。
- ``ready()``，元素在``local dom``初始化之后执行的回调。
- ``attached()``，对应web component的attachedCallback()。
- ``detached()``，对应web component的detachedCallback()。
- ``attributeChanged()``，对应web component的attributeChangedCallback()。

### 属性的声明

这个属性包含两部分，一个标签的内联属性（attributes），另一个就是标签的属性（properties），
这两个都可以用``properties``这个属性来声明。``properties``是个对象，key是属性的
名称，其对应的value是一个对象，每个对象可以包含下面的属性来配置属性：

- ``type``，属性的数据结构。用于内联属性和属性之间的序列化和反序列化。
- ``value``，属性的默认值。
- ``reflectToAttribute``，是否将属性外显成内联属性，当属性的类型为布尔时，true就
  将属性外显，false则隐藏属性。有点类似html5的hidden属性。
- ``readOnly``，是否只读，只读的话，属性值无法更改，只能通过私有方法``_setProperty(value)``
  来设置属性。
- ``notify``，属性变更时，是否发送``propertyName-changed``来发送事件。
- ``computed``，这是一个字符串，属性的值通过这个字符串对应的表达式来计算得到。
- ``observer``，属性的监控方法。除此之外，还有``listeners``来监控

{% highlight javascript %}

  Polymer({
    is : 'super-button',
    properties : {
      color : {
        type : String,
        value : '#fff',
        relectToAttribute : true,
        readOnly : false,
        notify : true,
        computed : 'getColor',
        observer : 'colorChanged'
      },
      index : Number
    },
    getColor : function(){
      return '#f60';
    },
    colorChanged : function(){
      console.log('color changed');
    },
    // 事件监控
    listners : [
      'somechange(color,index)'
    ]
  })

{% endhighlight %}

### Local Dom

在web component中，自定义元素内部的div叫做``shadow dom``，而不支持``shadow dom``
的我们以``shady dom``。而在polymer，因为这些都是在``template``中，所以统一叫他们
是``local dom``。

对于local dom的访问，polymer提供了一些便利的dom api：

- this.$，通过id直接访问``this.$.myId``
- this.$$(selector)，通过css selector访问元素。
- 其他一些dom api

除此之外，polymer也封装了事件处理，这里略过。

### 数据绑定和模板的使用

polymer给予``template``很多的特性支持，例如数据双向、单向绑定、模板重复、条件判断、
过滤、排序等。

数据可以通过``{{propertyName}}``来实现双向绑定数据，双向、单向绑定在多个元素之间
通信特别有用。

{% highlight html %}

  <!-- 这里运用了双向绑定，supper-button的color属性改变，get-button的color属性也会改变，反之亦然。 -->
  <dom-module id="get-button">
    <template>
      <super-button color="{{color}}"></super-button>
    </template>

    <script>
      Polymer({
        is : 'get-button',
        properties : {
          color : {
            type : String,
            value : '#fff'
          }
        }
      })
    </script>
  </dom-module>

{% endhighlight %}

数据通过``[[propertyName]]``来实现单向数据绑定，而单向是数据流只能从父级流向子级。

下面通过一个例子来了解模板遍历、条件判断，还有排序。

{% highlight html %}

  <!-- 对于非在dom-module下的template可以通过设置is="dom-bind"来获取template的绑定特性 -->
  <template is="dom-bind">
    <ul>
      <template is="dom-repeat" items="{{object.people}}" as="{{people}}" index-as="{{index}}" filter="{{filterPeople}}" sort="{{sortPeople}}">
        <li>
          No.{{index}}
          <p>{{people.name}}</p>
          <template if="{{people.phone}}">
            phone : {{people.phone}}
          </template>
        </li>
      </template>
    </ul>
  </template>

{% endhighlight %}

任何template中dom的改动，都会触发``dom-changed``。

## 总结

基于web component的polymer有惊艳也有不接地气。组件式的开发的确能够完美的封装html，
css和js，但是现阶段大部分浏览器还不支持，基本上就是chrome和opera only。及时后面
支持google完美的material design也失去大堆开发者。

现在前端开发首要的任务是找出打通3界（web, mobile, app）的方法。
