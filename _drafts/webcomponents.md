# webcomponents

今天我们来探讨下如何创建自定义的元素，这个元素有它自己的功能和交互，比如创建一个
`<count-down>`标签，它可以实现倒计时功能。

要实现这个目标，我们需要使用web component（web组件）这种技术，这个技术包含4个内容：

- custom element
- shadow dom
- template
- html import

## custom element 自定义元素

简而言之就是自定义元素标签，自定义元素的行为和交互。我们可以使用`document.registerElement(tag-name, tag-prototype)`
方法来自定义元素。

{% highlight javascript %}

  // 创建一个input-range的自定义函数
  var InputRange = document.registerElement('input-range');
  // 接下来可以像标签一样使用
  document.appendChild(new InputRange);

{% endhighlight %}

接下来我们希望它跟原生的HTML标签一样，有`innerHTML`,`className`之类的属性，所以它
的原型需要继承自`HTMLElement.prototype`。它还需要定义倒计时功能，并且我们希望它被
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

        this.circle.html(this.min + Math.ceil((left - this.left_boundary) / (this.right_boundary - this.left_boundary) * (this.max - this.min)))
      }
    })
  })

{% endhighlight %}

上面是创造全新的元素，我们可以在注册的原型中设置`extends`属性，例如下面我们扩展`<button>`,
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

{% hightlight javascript %}

  if('registerElement' in document){
    // 支持custom element
  }

{% endhighlight %}
