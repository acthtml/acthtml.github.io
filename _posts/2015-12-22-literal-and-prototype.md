---
layout: post
title:  "字面量和原型的用法"
---

假设我们需要构建一个页面，页面上有一个选项的模块，功能跟``input:radia``类似，代码
如下：

{% highlight html %}

<div class="select">
  <div class="option">option 1</div>
  <div class="option active">option 2</div>
  <div class="option">option 3</div>
  <div class="option">option 4</div>
</div>

{% endhighlight %}

我们可以给这个模块用字面量的形式构建出来，代码如下：

{% highlight javascript %}

var select = {
  // .select
  wrapper : null,
  // 所有选项
  options : null,
  // 已选选项
  selected : null,
  // 初始化
  init : function(){
    this.wrapper = $('.select');
    this.options = $('.option', this.wrapper);
    this.selected = $('.option.active', this.wrapper);

    var that = this;
    this.options.on('click', function(){
      that.options.removeClass('active');
      that.selected = $(this);
      that.selected.addClass('active');
    })
  }
}

select.init();

{% endhighlight %}

这个模块可以在以后的应用中会出现多选形式，外部的类名也可能更改，为了使其更加通过，
我需要改写``init``函数，使其可以配置化，最终，我们可以这样的调用它``select.init(wrapper, settings)``

{% highlight javascript %}

var select = {
  // .select
  wrapper : null,
  // 所有选项
  options : null,
  // 已选选项
  selected : null,
  // 是否多选
  multiple : false,
  // 初始化
  init : function(wrapper, settings){
    // import settings
    $.extend(this, {}, settings);

    this.options = $('.option', this.wrapper);
    this.selected = $('.option.active', this.wrapper);

    var that = this;
    this.options.on('click', function(){
      var is_selected = $(this).hasClass('active');
      if(that.multiple){
        $(this).toggleClass('active');
      }else{
        that.options.removeClass('active');
        $(this).toggleClass('active', !is_selected);
      }

      that.selected = $('.option.actve', that.wrapper);
    })
  }
}

select.init($('.select'), {multiple : true});

{% endhighlight %}

上面这些基本上是字面量构建模块的基本形式，但是如果页面出现两个相同的模块，字面量
就不能用了:

{% highlight html %}

<div class="select select-1">
  <div class="option">option 1</div>
  <div class="option active">option 2</div>
  <div class="option">option 3</div>
  <div class="option">option 4</div>
</div>

<div class="select select-2">
  <div class="option">option 1</div>
  <div class="option active">option 2</div>
  <div class="option">option 3</div>
  <div class="option">option 4</div>
</div>

{% endhighlight %}

使用字面量形式很容易将两个模块耦合起来，因为字面量形式是公用地址空间了，这时候就
需要类出马了，使用类，我们可以使用构造函数，带有原型的构造函数。

{% highlight javascript %}

function Select(wrapper){
  this.wrapper = wrapper;
  return this.init();
}

Select.prototype =  {
  // .select
  wrapper : null,
  // .option
  options : null,
  // .option.active
  selected : null,
  // is multiple
  multiple : false,
  // initialize
  init : function(){
    this.options = $('.option', this.wrapper);
    this.selected = $('.option.active', this.wrapper);

    // Bind events,
    var that = this;
    this.options.on('click', function(){
      var is_selected = $(this).hasClass('active');

      if(that.multiple){
        $(this).toggleClass('active');
      }else{
        that.options.removeClass('active');
        $(this).toggleClass('active', !is_selected)
      }

      that.selected = $('.option.active', that.wrapper);
    })
  }
}

// 这样，页面可以这样运行
new Select($('.select-1'));
new Select($('.select-2'));

{% endhighlight %}

这种构造函数的形式很容易将模块解耦合，各个对象管理各自的。这种也是jquery插件的基
础形式，下面写一个jquery插件：

{% highlight javascript %}

$.fn.select = function(){
  this.each(function(){
    new Select($(this));
  });

  // keep chain writing.
  return this;
}

{% endhighlight %}

作为一个优雅的jquery插件，我们可以参考一下bootstrap的js api，我们会发现优雅的插
件都有以下几个特点：

- 自主绑定。不需要明确声明插件初始化，div就能绑定响应的行为。
- 从div中的data属性初始化插件属性
- 将插件对象绑定到元素的data中
- 如果初始化配置是一个字符串的话，那就当成方法运行它。

最终的插件形式：

{% highlight javascript %}

/**
 * @file select.js
 *
 * a jquery plugin example, four targets:
 *
 * - Just html, auto initialize.
 * - Import default properties from element's data.
 * - Bind obeject in element's data.
 * - Auto run the method when the settings is a string.
 */

(function() {

  function Select(wrapper, settings){
    this.wrapper = wrapper;
    return this.init(settings);
  }

  Select.prototype =  {
    // .select
    wrapper : null,
    // .option
    options : null,
    // .option.active
    selected : null,
    // is multiple
    multiple : false,
    // initialize
    init : function(settings){
      // Import default properties from element's data.
      $.extend(this, {}, this.wrapper.data(), settings)
      this.options = $('.option', this.wrapper);
      this.selected = $('.option.active', this.wrapper);

      // Bind events,
      var that = this;
      this.options.on('click', function(){
        var is_selected = $(this).hasClass('active');

        if(that.multiple){
          $(this).toggleClass('active');
        }else{
          that.options.removeClass('active');
          $(this).toggleClass('active', !is_selected)
        }

        that.selected = $('.option.active', that.wrapper);
      })
    },

    // Just a method example.
    say : function(){
      console.log('hello')
    }
  }

  // Add jquery plugin.
  $.fn.select = function(settings){
    this.each(function(){
      var instance = $(this).data('select');

      if(!instance){
        instance = new Select($(this),settings);
        $(this).data('select', instance);
      }

      // When the sttings is string, run the method.
      if(typeof settings == 'string') instance[settings]();
    });
    return this;
  }

  // Initialize plugin when dom ready.
  $('.select').select();
})();

{% endhighlight %}

最后放上[demo](/assets/literal-and-prototype/select/select.html)。
