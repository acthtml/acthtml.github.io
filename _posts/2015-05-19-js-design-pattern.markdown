---
layout: post
title:  "js设计模式"
---

设计模式就是一些好的设计手法，形成模式，可以反复套用。

那怎样的设计手法是比较好的呢，无非就是代码模块化，可维护等。大多数以面向对象的思
想实现，我们就先看看以围绕创建对象、管理对象的几种设计模式。

### 字面量模式（Literal Pattern）

js创建对象的方法有两种：

{% highlight javascript %}

// 一种是直接字面量
var obj = {};

// 另一种则是通过构造函数加关键词``new``的形式。
var obj = new Object();

// 我们通常采用字面量的形式来创建对象，接下来是字面量模式的典型场景：

var Page = {
  // 初始化
  init : function(){
    this.methodA();
    this.methodB();
  },

  methodA : function(){},
  methodB : function(){}
};

Page.init();

{% endhighlight %}

[字面量模式demo](/assets/js-design-pattern/1.literal/book.html)

### 构造器模式（Construct Pattern）

js通过构造器函数可以实现类这个概念，并且通过``new``这个关键词，可以实例化对象。

{% highlight javascript %}

function Person(name, age){
  this.name = name;
  this.age = age;

  this.sayHello = function(){
    console.log('hello, I\'m ' + this.name + ', ' + this.age + ' years old.');
  }
}

var john = new Person('John', 18),
    jack = new Person('Jack', 20);

john.sayHello();
jack.sayHello();

{% endhighlight %}

这种模式很简单，但是没有继承这个概念，例如``sayHello()``这个方法应该是共享的，另
外还有个问题，上面的属性方法都是构建函数的拷贝，而不是引用，这样，就造成了内存的
浪费。我们看一下另一种写法：带原型的构造器模式。

{% highlight javascript %}

function Person(name, age){
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function(){
  console.log('hello, I\'m ' + this.name + ', ' + this.age + ' years old.');
}

{% endhighlight %}

甚至可以这样：

{% highlight javascript %}

function Person(name, age){
  this.init(name, age);
}

Person.prototype = {
  init : function(name, age){
    this.name = name;
    this.age = age;
  },
  sayHello : function(){
    console.log('hello, I\'m ' + this.name + ', ' + this.age + ' years old.');
  }
}

{% endhighlight %}


### 模块模式（Module Pattern）

上面的模式虽然有类，继承。但是有时候我们需要屏蔽那些比较底层的、繁琐的私有方法和
属性，暴漏给我们只有简洁可供其他程序使用的公共api，就需要这种方式。

{% highlight javascript %}

var testModule = (function(){
  var count = 0;

  return {
    setCount : function(i){
      count = i;
      return i;
    },
    getCount : function(){
      return count;
    },
    incrementCount : function(){
      return ++count;
    },
    resetCount : function(){
      count = 0;
    }
  }
})();

{% endhighlight %}

上面这种通过匿名自运行函数屏蔽代码的作用域，并且通过闭包函数来访问局部变量的做法
很典型。

[模块模式demo](/assets/js-design-pattern/3.module/book.html)

### 发布订阅模式（Publish/Subscribe Pattern）

发布订阅模式我们接触比较多，例如js中的事件监听。

{% highlight javascript %}

// 订阅
$('body').on('cctv', function(event, data){
  console.log('cctv1:' + data)
});

// 发布
$('body').trigger('cctv', 'hello');

// 取消订阅
$('body').off('cctv');

{% endhighlight %}

介绍下一jquery核心成员[cowboy](https://github.com/cowboy)的[tiny pub/sub插件](https://github.com/cowboy/jquery-tiny-pubsub)。

{% highlight javascript %}

// Creates a "named" logging function.
function createLogger(name) {
  return function(_, a, b) {
    // Skip the first argument (event object) but log the name and other args.
    console.log(name, a, b);
  };
}

// Subscribe to the "foo" topic (bind to the "foo" event, no namespace).
$.subscribe('foo', createLogger('foo'));
// Subscribe to the "foo.bar" topic (bind to the "foo" event, "bar" namespace).
$.subscribe('foo.bar', createLogger('foo.bar'));
// Subscribe to the "foo.baz" topic (bind to the "foo" event, "baz" namespace).
$.subscribe('foo.baz', createLogger('foo.baz'));

// Publish arbitrary values.
$.publish('foo', [1, 2]);
// logs:
// foo 1 2
// foo.bar 1 2
// foo.baz 1 2

$.publish('foo.bar', [3, 4]);
// logs:
// foo.bar 3 4

$.publish('foo.baz', [5, 6]);
// logs:
// foo.baz 5 6

$.unsubscribe('foo.bar');
$.publish('foo', [7, 8]);
// logs:
// foo 7 8
// foo.baz 7 8

{% endhighlight %}

[发布订阅模式demo](/assets/js-design-pattern/4.pubsub/book.html)

### AMD模式

在更复杂的场景中，我们需要模块按需加载，并且需要模块自己负责处理依赖。

所以我们很容易想到用下面这种方式来定义和加载模块。

{% highlight javascript %}

// 定义模块
define(
  [module_id],
  [dependence_module_a, dependence_module_b],
  function(module_a, module_b){
    // do something with module_a, module_b

    // exports
    return {
      name : 'name',
      get : function(){
        module_a.get();
      }
    }
  }
)

require('jquery', function($){
  // do thing with $.
})

{% endhighlight %}

[AMD模式demo](/assets/js-design-pattern/5.requirejs/book.html)
