/**
 * @file zepto.tabswiper/tabswiper.js
 *
 * 支持滑动手势的tab插件
 *
 * div结构
 *
 * .tab
 *   .tab-nav-wrapper
 *     ul.tab-nav > li*
 *   .tab-items-wrapper
 *     .tab-items > .tab-item*
 *
 * API：
 *
 * @code
 * var tabswiper = $('.tab').tabswiper({
 *   // 初始化完成回调
 *   afterInit : function(index, nav, item){
 *     console.log('tab 初始化完成，现选中第' + index + '个');
 *   },
 *   // 选择之前回调
 *   beforeSelect : function(index, nav, item){
 *     // 当目标选择第3个时，不允许选中
 *     return index != 3;
 *   },
 *   // 选中之后回调
 *   afterSelect : function(index, nav, item){
 *     console.log('tab已选中第' + index + '个');
 *   }
 * }).data('tabswiper');
 *
 * // 选中第2个tab
 * tabswiper.select(1);
 * @endcode
 */
;(function($){

  /**
   * tab swiper
   */
  function TabSwiper(wrapper, settings){
    this.wrapper = wrapper;
    this.init(settings);
  }
  TabSwiper.prototype = {
    // .tab
    wrapper : null,
    // 所有.tab-nav li
    navs : null,
    // 所有.tab-item
    items : null,
    // 当前第几个选项
    index : -1,
    // 当前的.tab-nav li
    nav : null,
    // 当前的.tab-item
    item : null,
    // 初始化
    init : function(settings){
      // 引入默认配置
      $.extend(this, {}, this.wrapper.data(), settings);

      // 初始化属性
      this.navs = $('.tab-nav li', this.wrapper);
      this.items = $('.tab-item', this.wrapper);
      if(this.index == -1){
        this.index = $('.tab-nav li.active', this.wrapper).index();
      }
      if(this.index == -1) this.index = 0;

      this.nav = $(this.navs[this.index]);
      this.item = $(this.items[this.index]);
      this.setWidthes();

      // 初始化tab-nav
      this.NavSwiper = new NavSwiper($('.tab-nav-wrapper', this.wrapper), {
        index : this.index,
        beforeSelect : function(index){
          return this.beforeSelect(index, $(this.navs[index]), $(this.items[index]));
        }.bind(this),
        afterSelect : function(index){
          this.select(index, false, true);
        }.bind(this)
      });
      // 初始化tabItem
      this.ItemSwiper = new ItemSwiper($('.tab-items-wrapper', this.wrapper), {
        index : this.index,
        touchMoving : function(percent){
          this.NavSwiper.moveDistance(percent * 70);
        }.bind(this),
        beforeSelect : function(index){
          return this.beforeSelect(index, $(this.navs[index]), $(this.items[index]));
        }.bind(this),
        afterSelect : function(index){
          this.select(index, true, false);
        }.bind(this)
      })

      this.afterInit(this.index, this.nav, this.item);
      this.select(this.index, true, true);

      $(window).on('scroll', $.proxy(this.fixed, this));
      $(window).on('resize', $.proxy(this.setWidthes, this));
    },
    // 初始化之后回调
    // @index, nav, item
    afterInit : function(index, nav, item){
    },
    // 选中第几个tab
    // @param index 第几个
    // @param enable_nav 是否要nav选中
    // @param enable_item 是否要item选中
    select : function(index, enable_nav, enable_item){
      // 验证index
      if(typeof index == 'undefined') index = this.index;
      if(index >= this.navs.length || index < 0) index = 0;

      var nav = $(this.navs[index]),
          item = $(this.items[index]);

      // 选择前
      if(!this.beforeSelect(index, nav, item)) return false;

      enable_nav && this.NavSwiper.select(index);
      enable_item && this.ItemSwiper.select(index);

      // 进行选择
      this.index = index;
      this.nav = nav;
      this.item = item;
      this.navs.removeClass('active');
      this.nav.addClass('active');
      this.items.removeClass('active');
      this.item.addClass('active');
      this.scroll();

      // 选择后
      this.afterSelect(index, nav, item);
    },
    // 选中tab之前
    // @param index 要选中的index
    // @param nav 要选中的tab-nav li
    // @param item 要选中的tab-item
    // @return true/false 是否允许选中
    beforeSelect : function(index, nav, item){
      return true;
    },
    // 选中之后干什么
    // @param index 已选中第几个
    // @param nav 已选中的tab-nav li
    // @param item 已选中的tab-item
    afterSelect : function(index, nav, item){
    },
    // 置顶
    fixed: function() {
      var fix_top = $(this.wrapper).offset().top;

      if ($(window).scrollTop() > fix_top) {
        this.wrapper.addClass('tab-nav-fixed');
      } else {
        this.wrapper.removeClass('tab-nav-fixed');
      }
    },
    // 垂直滚动
    scrolled: false,
    scroll: function() {
      // 页面第一次加载不适用滚动
      if (!this.scrolled) {
        this.scrolled = true;
        return;
      }

      var is_in_view = false, // 是否在视野内
        top = this.wrapper.offset().top,
        scroll_top = $(window).scrollTop(),
        screen_height = $(window).height();

      // 判断是否在视野内
      if (top > scroll_top && top < (scroll_top + screen_height)) {
        is_in_view = true;
      }

      // 滚动到视野内
      if (!is_in_view) {
        // scrollTo(0, this.wrapper.offset().top)

        // 禁用平滑的滚动
        this._scroll($(window), this.wrapper.offset().top, 200)
      }
    },
    // 平滑滚动
    _scroll: function(el, to, duration) {
      if (duration < 0) {
        return;
      }
      var difference = to - $(window).scrollTop();
      var perTick = difference / duration * 10;
      this.scrollToTimerCache = setTimeout(function() {
        if (!isNaN(parseInt(perTick, 10))) {
          window.scrollTo(0, $(window).scrollTop() + perTick);
          this._scroll(el, to, duration - 10);
        }
      }.bind(this), 10);
    },
    setWidthes : function(){
      $('.tab-nav-box', this.wrapper).css({
        width : this.wrapper.width()
      })
    }
  }

  /**
   * nav swiper
   */
  function NavSwiper(wrapper, settings){
    this.wrapper = wrapper;
    return this.init(settings);
  }
  NavSwiper.prototype = {
    // .tab-nav-wrapper
    wrapper : null,
    // .tab-nav
    navbar : null,
    // .tab-nav li
    navs : null,
    // 当前index
    index : 0,
    // 总共条目
    count : 0,
    // 每个元素的宽度
    element_width : 70,
    // 向右可移动的距离
    right_boundary : 0,
    // 向左可移动的距离
    left_boundary : 0,
    // 当前的便宜值
    current_offset : 0,
    // 当位移超过这个伐值这个操作才视为切换tab的操作
    throttle : 30,
    // 抖动伐值，当位移超过这个伐值才被认为是意图移动tab
    shake_throttle : 10,
    // 是否初始化
    inited : false,
    // 初始化
    init : function(settings){
      if(this.inited) return this;

      $.extend(this, {}, settings);
      this.navbar = $('.tab-nav', this.wrapper);
      this.navs = $('li', this.wrapper);
      this.count = this.navs.length;
      this.setWidthes();
      this.select(this.index, false, true);
      this.initEventListeners();
      this.inited = true;
      return this;
    },
    // 选中某个nav
    // @param index 选中第几个
    // @param enable_callback 是否执行回调
    // @param disable_animate 禁止动画
    select : function(index, enable_callback, disable_animate){
      var old_index = this.index;
      if(typeof index != 'undefined') {
        this.index = index || 0;
      }

      if(!this.beforeSelect(this.index)){
        this.select(old_index, false, false);
        return;
      }

      // 滚动到指定位置
      // 目标offset
      var offset = this.right_boundary - this.index * this.element_width,
          animate_time = disable_animate ? 0 : 500;
      this.navbar.animate({
        translate3d: offset + 'px,0,0'
      }, animate_time, 'ease-out');

      enable_callback && this.afterSelect(index);
    },
    // 选中之前的回调
    beforeSelect : function(index){
      return true;
    },
    // 选中之后的回调
    afterSelect : function(index){
    },
    // 设置宽度
    setWidthes : function(){
      // 包裹层宽度
      var wrapper_width = this.wrapper.width();
      var padding = wrapper_width/2 - this.element_width/2;

      this.right_boundary = padding;
      this.left_boundary = padding - this.element_width * (this.count - 1);

      this.navbar.css({
        width : this.element_width * this.count
      });
    },
    // bind events
    initEventListeners : function(){
      var that = this;
      this.navs.on('click', function(){
        that.select($(this).index(), true);
      });

      this.start_x = null;
      this.end_x = null;

      this.wrapper.on('touchstart', $.proxy(this.touchStart, this));
      this.wrapper.on('touchmove', $.proxy(this.touchMove, this));
      this.wrapper.on('touchend', $.proxy(this.touchEnd, this));
      $(window).on('resize', $.proxy(this.resize, this));
    },
    // touch start
    touchStart : function(e){
      this.start_point = this.getEventPonit(e);
      this.end_point = null;
      this.touching = true;
    },
    // touch move
    touchMove : function(e){
      // 多点触控不做反应
      if (e.touches.length > 1 || e.scale && e.scale !== 1) {
        return;
      }

      this.end_point = this.getEventPonit(e);
      var diff_x = this.end_point.x - this.start_point.x;

      // 上下移动时不做反应
      if(this.touching){
        this.touching = Math.abs(diff_x) > Math.abs(this.end_point.y - this.start_point.y)
      }

      // 当thouching时才是合法操作
      if(!this.touching) return;

      // 阻止ios下左移回退
      e.preventDefault();

      // 小于最小阀值，不做反应，减少抖动情况。
      if(Math.abs(diff_x) < this.shake_throttle) return;

      diff_x = diff_x > 0 ? diff_x - this.shake_throttle : diff_x + this.shake_throttle;

      // 设置wrapper偏移量
      var current_offset = this.right_boundary - this.index * this.element_width + diff_x;
      current_offset = this.getOffsetByBoundary(current_offset);

      this.navbar.css('transform', 'translate3d(' + current_offset + 'px, 0px, 0px)');
    },
    // touch end
    touchEnd : function(e){
      if(!this.end_point) return;

      var diff_x = this.end_point.x - this.start_point.x;
      this.touching = false;

      // 操作无效。
      if(diff_x == 0) return;

      // 位移小于伐值，操作无效，进行还原。
      if(Math.abs(diff_x) < this.throttle){
        this.select(this.index, false, false);
        return;
      }

      diff_x = diff_x > 0 ? diff_x + this.throttle : diff_x - this.throttle;

      // 判断当前位置放置在哪个index
      var current_offset = this.right_boundary - this.index * this.element_width + diff_x;
      current_offset = this.getOffsetByBoundary(current_offset);

      var index = parseInt((this.right_boundary - current_offset) / this.element_width)
      this.select(index, true, false);
    },
    // 是否在触摸
    touching : false,
    // 触摸开始节点
    start_point : null,
    // 触摸结束节点
    end_point : null,
    // 获取当前事件的x坐标
    getEventPonit : function(e){
      return {
        x : e.changedTouches[0].pageX,
        y : e.changedTouches[0].pageY
      };
    },
    // 根据左右边界，返回正确的伐值
    getOffsetByBoundary : function(offset){
      if(offset > this.right_boundary){
        offset = this.right_boundary;
      }else if(offset < this.left_boundary){
        offset = this.left_boundary;
      }

      return offset;
    },
    // 移动nav的百分比距离，正右负左
    moveDistance : function(distance){
      // 当前的left
      var current_offset = this.right_boundary - this.index * this.element_width + distance;
      this.navbar.css('transform', 'translate3d(' + current_offset + 'px, 0px, 0px)');
    },
    // 重新切换屏幕大小
    resize : function(){
      this.init();
      this.setWidthes();
      this.select(this.index, false, true);
    }
  }

  /**
   * item swiper
   */
  function ItemSwiper(wrapper, settings){
    this.wrapper = wrapper;
    return this.init(settings);
  }
  ItemSwiper.prototype = {
    // .tab-items-wrapper
    wrapper : null,
    // .tab-item
    items : null,
    // 视窗宽度
    width : 0,
    // 总共多少条目
    count : 0,
    // 当前index
    index : 0,
    // 当位移超过这个伐值这个操作才视为切换tab的操作
    throttle : 80,
    // 抖动伐值，当位移超过这个伐值才被认为是意图移动tab
    shake_throttle : 40,
    // 是否初始化
    inited : false,
    // 初始化
    init : function(settings){
      if(this.inited) return this;

      $.extend(this, {}, settings);
      this.inner = $('.tab-items', this.wrapper);
      this.items = $('.tab-item', this.wrapper);
      this.count = this.items.length;
      this.setWidthes();
      this.initEventListeners();
      this.select();
      this.inited = true;
      return this;
    },
    // 选中具体tab-item
    // @index tab切换到几
    // @enable_callback 是否执行选中的回调
    select : function(index, enable_callback){
      var old_index = this.index;
      if(typeof index != 'undefined') {
        this.index = index || 0;
      }

      if(!this.beforeSelect(this.index)){
        this.select(old_index, true);
        return;
      }

      this.setHeight();

      // 获取目标位移。
      var target_x = this.width * this.index,
          animate_time = this.first_time ? 0 : 500; // 首次运行，tab立即显示，无过渡动画
      this.inner.animate({
        translate3d: '-' + target_x + 'px,0,0'
      }, animate_time, 'ease-out')

      enable_callback && this.afterSelect(this.index);

      // 已运行过
      this.first_time = false;
    },
    // 选中之前的回调
    beforeSelect : function(index){
      return true;
    },
    // 选中之后的回调
    afterSelect : function(index){
    },
    // 设置视窗宽度
    setWidthes : function(){
      this.width = this.wrapper.width();

      // .tab-items 宽度 = width * count;
      this.inner.css('width', this.width * this.count);
      // 设置每个tab-item宽度
      this.items.css('width', this.width);
    },
    // 设置视窗高度
    setHeight : function(){
      // 当前item的高度
      var height = $(this.items[this.index]).height();

      height = height > 100 ? height : 100;
      this.wrapper.css('height', height);
    },
    // 初始化事件监听
    initEventListeners : function(){
      this.start_x = null;
      this.end_x = null;

      this.wrapper.on('touchstart', $.proxy(this.touchStart, this));
      this.wrapper.on('touchmove', $.proxy(this.touchMove, this));
      this.wrapper.on('touchend', $.proxy(this.touchEnd, this));
      $(window).on('resize', $.proxy(this.resize, this));
    },
    // touch start
    touchStart : function(e){
      this.start_point = this.getEventPonit(e);
      this.end_point = null;
      this.touching = true;
    },
    // touch move
    touchMove : function(e){
      // 多点触控不做反应
      if (e.touches.length > 1 || e.scale && e.scale !== 1) {
        return;
      }

      this.end_point = this.getEventPonit(e);
      var diff_x = this.end_point.x - this.start_point.x;

      // 上下移动时不做反应
      if(this.touching){
        this.touching = Math.abs(diff_x) > Math.abs(this.end_point.y - this.start_point.y)
      }

      // 当thouching时才是合法操作
      if(!this.touching) return;

      // 阻止ios下左移回退
      e.preventDefault();

      // 小于最小阀值，不做反应，减少抖动情况。
      if(Math.abs(diff_x) < this.shake_throttle) return;

      diff_x = diff_x > 0 ? diff_x - this.shake_throttle : diff_x + this.shake_throttle;

      // 设置wrapper偏移量
      var current_offset = diff_x - this.index * this.width;
      this.inner.css('transform', 'translate3d(' + current_offset + 'px, 0px, 0px)');
      this.touchMoving(diff_x/this.width);
    },
    // touching call back
    touchMoving : function(percent){
    },
    // touch end
    touchEnd : function(e){
      if(!this.end_point) return;

      var diff_x = this.end_point.x - this.start_point.x;
      this.touching = false;

      // 操作无效。
      if(diff_x == 0) return;

      // 位移小于伐值，操作无效，进行还原。
      if(Math.abs(diff_x) < this.throttle){
        this.select();
        return;
      }

      // 操作有效，
      diff_x < 0 ? this.next() : this.prev();
    },
    // 是否在触摸
    touching : false,
    // 触摸开始节点
    start_point : null,
    // 触摸结束节点
    end_point : null,
    // 获取当前事件的x坐标
    getEventPonit : function(e){
      return {
        x : e.changedTouches[0].pageX,
        y : e.changedTouches[0].pageY
      };
    },
    // 下一个tab
    next : function(){
      var index = this.index + 1;
      index = index > this.items.length - 1 ? this.items.length - 1 : index;
      this.select(index, true);
    },
    // 上一个tab
    prev : function(){
      var index = this.index - 1;
      index = index < 0 ? 0 : index;
      this.select(index, true)
    },
    // 重新切换屏幕大小
    resize : function(){
      this.init();
      this.setWidthes();
      this.setHeight();
      this.select();
    }
  }

  $.fn.tabswiper = function(settings){
    this.each(function(){
      var instance = $(this).data('tabswiper');

      if(!instance){
        instance = new TabSwiper($(this), settings);
        $(this).data('tabswiper', instance);
      }

      if(typeof settings == 'string') instance[settings]();
    });

    return this;
  }

})(Zepto);
