---
layout: post
title:  "字面量和原型的用法"
---

假设我们需要构建一个页面，页面上有一个选项的模块，功能跟``input:radia``类似，代码如下：

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

这个模块可以在以后的应用中会出现多选形式，外部的类名也可能更改，为了使其更加通过，我需要改写
``init``函数，使其可以配置化，最终，我们可以这样的调用它``select.init(wrapper, settings)``

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

上面这些基本上是字面量构建模块的基本形式，但是如果页面出现两个相同的模块，字面量就不能用了:

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

使用字面量形式很容易将两个模块耦合起来，因为字面量形式是公用地址空间了，这时候就需要类出马了，
使用类，我们可以使用构造函数，带有原型的构造函数。
