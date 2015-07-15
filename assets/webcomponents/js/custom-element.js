(function(){

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

})();
