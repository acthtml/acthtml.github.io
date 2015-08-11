---
layout: post
title:  "React 初探"
---

## 为什么React

React 是 facebook 2013 年开源的前端框架，目的是处理复杂的视图界面，大家通常把它
理解成MVC中的V（视图层）。React具有以下优点：

- 使用可复用、可组合的组件来构建应用。
- 当数据更新时，React会自动更新用户界面。
- 这种更新是高效的，只改变需要更新的部分。


## 什么是React

React是通过JSX语法来编写组件，通过组件来操作虚拟DOM，通过虚拟DOM来操作标准DOM的一
个js框架。

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

下面进一步分析React涉及到的知识点。


## JSX语法

JSX语法能让你在js环境下，直接使用XML格式的语句来编辑js，每一个xml语句称为一个组件，
每一个组件都能解析成对应的js函数。所以它的核心思想就是利用xml语法来调用js函数。

利用xml语句来表达组件的思路有点类似[web component 技术](/2015/07/16/web-component.html)，
但实现原理不一样。web component技术利用``document.registerElement``来自定义标签，
利用``shadow dom``、``template``来给自定义标签添加相应的行为交互，并用``html import``
来整合这个标签所需的资源。

在jsx中，无论是自定义的标签还是看上去像标准的html，他们都是定义好的组件，他们都能
够通过一个叫JSXTransformer的解析器解析成对应的js函数（``React.createElement()``）。

{% highlight javascript %}

  // 自定义的组件
  // jsx语句
  <Avatar src="images/avatar.png" name="John" />

  // 对应的js语句
  React.createElement(Avatar, {src : "images/avatar.png", name : "John"})

  // 标准的html结构，对于标准的html结构，它其实调用了预定义的组件，列如下面的组件
  // 名其实就是li。
  // jsx语句
  <li className="item">item</li>

  // 对应的js语句
  React.createElement(li, {className : 'item'});

{% endhighlight %}

jsx一些注意点：

- 首字母大小写来区分是标准的html还是自定义的组件
- 因为jsx是js语法环境，所以不能标签名和属性名称都不能使用js语法关键词。
- 对标准的html使用非标准的html属性则不会被渲染。属性前缀``data-``、``aria-``除外，
  因为这是html5定义的标准属性。
- 表单input, select, textarea组件对selected, value, checked, onchanged的改造。


## 虚拟DOM

上面jsx语法解析成的函数``React.createElement()``操作的是虚拟DOM，通过虚拟DOM再去
操作标准dom。

为什么通过虚拟DOM来操作DOM呢，因为直接操作太慢了。

虚拟DOM具有响应式更新的优点：只更新改动的部分。

例如下面，A、B两次打印的dom结构。

{% highlight html %}

  <!-- A -->
  <ul>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
  </ul>

  <!-- B -->
  <ul>
    <li>item 3</li>
    <li>item 2</li>
    <li>item 1</li>
  </ul>

{% endhighlight%}

虚拟DOM会对比前后两次的结果，找出不同，最终它通过对调item 1和item 3的位置来达到目
的，这样就比直接覆盖式的打印快的多。这种对比找出结构不同，然后计算出最小的代价来
改动dom的方法就是响应式更新(React Update)，React的框架命名就是来自于此。

给虚拟dom绑定事件：

{% highlight javascript %}

  var SuperButton = React.createClass({
    sayHello : function(){
      alert('hello');
    },
    render : function(){
      return (
        <button onClick={sayHello}>click me</button>
      );
    }
  })

{% endhighlight %}

React中的事件有这两个优点：

- 自动绑定this为当前组件。
- 所有事件通过事件委托绑定。

通过``refs``和``getDOMNode()``操作虚拟DOM对应的标准DOM：

{% highlight javascript %}

  var SuperButton = React.createClass({
    sayHello : function(){
      // 1. 通过this.refs对象找到属性与ref值匹配的组件，
      // 2. 通过getDOMNode()来找到虚拟DOM对应的标准DOM
      this.refs.button.getDOMNode().innerHTML = 'clicked.';
    },
    render : function(){
      return (
        // 设置ref参数，可通过this.refs定位指定的组件。
        <button onClick={sayHello} ref="button">click me</button>
      );
    }
  })

{% endhighlight %}


## props

为了使组件可复用，那组件就需要可配置的能力。组件通过在jsx语法中的属性配置，在组件
内部使用this.props访问，例如第一个例子中的``<Avatar src="images/avatar.png" name="John" />``
和``this.props.src``、``this.props.name``。

props还能设置属性验证和设置默认值，通过mixins来复用组件属性。

{% highlight javascript %}

  React.createClass({
    // 设置属性验证
    propTypes: {
      // 可以声明 prop 为指定的 JS 基本类型。默认
      // 情况下，这些 prop 都是可传可不传的。
      optionalArray: React.PropTypes.array,
      optionalBool: React.PropTypes.bool,
      optionalFunc: React.PropTypes.func,
      optionalNumber: React.PropTypes.number,
      optionalObject: React.PropTypes.object,
      optionalString: React.PropTypes.string,

      // 所有可以被渲染的对象：数字，
      // 字符串，DOM 元素或包含这些类型的数组。
      optionalNode: React.PropTypes.node,

      // React 元素
      optionalElement: React.PropTypes.element,

      // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
      optionalMessage: React.PropTypes.instanceOf(Message),

      // 用 enum 来限制 prop 只接受指定的值。
      optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

      // 指定的多个对象类型中的一个
      optionalUnion: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.instanceOf(Message)
      ]),

      // 指定类型组成的数组
      optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

      // 指定类型的属性构成的对象
      optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

      // 特定形状参数的对象
      optionalObjectWithShape: React.PropTypes.shape({
        color: React.PropTypes.string,
        fontSize: React.PropTypes.number
      }),

      // 以后任意类型加上 `isRequired` 来使 prop 不可空。
      requiredFunc: React.PropTypes.func.isRequired,

      // 不可空的任意类型
      requiredAny: React.PropTypes.any.isRequired,

      // 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接
      // 使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
      customProp: function(props, propName, componentName) {
        if (!/matchme/.test(props[propName])) {
          return new Error('Validation failed!');
        }
      }
    },
    // 设置属性默认值
    getDefaultProps: function() {
      return {
        value: 'default value'
      };
    },
    // 通过mixins来复用组件属性
    mixins : [ComponentA, ComponentB]
    /* ... */
  });

{% endhighlight %}


## state

视图界面的主要任务是显示数据，并在数据更新时更新用户界面。这些需要更新的数据就是
``state``。在React中，每次数据更新，都会调用``setState(data, callback)``函数，它
会将``data``合并到``this.state``中，和并完成重新渲染组，最后调用可选的回调函数``callback``。

{% highlight javascript %}

  var SuperButton = React.createClass({
    // 组件挂载前执行state初始化
    getInitialState : {
      return { index : 1 }
    },
    add : function(){
      this.state.index ++;
      this.setState(this.state);
    },
    render : function(){
      <button onClick={add}>{this.state.index}</button>
    }
  })

{% endhighlight %}

## 生命周期

上例中的``getInitialState``就是生命周期挂载前执行的函数。详细的组件生命周期及其对
应的函数方法：

- 挂载：组件被插入DOM中
  - ``getInitialState()``: object在组件被挂载之前调用。状态化的组件应该实现这个方
    法，返回初始的state数据。
  - ``componentWillMount()``：在挂载发生之前立即被调用。
  - ``componentDidMount()``：在挂载结束之后马上被调用。需要DOM节点的初始化操作应
    该放在这里。
- 更新： 组件被重新渲染，查明DOM是否应该刷新
  - ``componentWillReceiveProps(object nextProps)``当一个挂载的组件接收到新的``props``
    的时候被调用。该方法应该用于比较``this.props``和``nextProps``，然后使用``this.setState()``
    来改变``state``。
  - ``shouldComponentUpdate(object nextProps, object nextState)``: boolean当组件
    做出是否要更新DOM的决定的时候被调用。实现该函数，优化``this.props``和``nextProps``，
    以及``this.state``和``nextStat``e的比较，如果不需要React更新DOM，则返回``false``。
  - ``componentWillUpdate(object nextProps, object nextState)``在更新发生之前被调用。
    你可以在这里调用``this.setState()``。
  - ``componentDidUpdate(object prevProps, object prevState)``在更新发生之后调用。
- 移除： 组件从DOM中移除
  - ``componentWillUnmount()``在组件移除和销毁之前被调用。清理工作应该放在这里。

