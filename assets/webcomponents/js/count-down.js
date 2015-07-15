(function(){

  // 创建名为 count-down 的元素
  var CountDown = document.registerElement('count-down', {
    // 元素原型继承自标准的HTML元素
    prototype : $.extend(Object.create(HTMLElement.prototype), {
      // 在创建之后，元素倒计时自动开始。
      // 元素的生命周期：
      // - created 创建
      // - attached 插入
      // - deattached 移除
      // - attributeChanged 元素的属性变化
      createdCallback : function(){
        this.innerHTML = '<h4>倒计时</h4><p></p><button>点击开始</button>';
        this.time = parseInt($(this).attr('time') || 0);
        this.start();
        $('button', this).on('click', function(){
          this.going ? this.stop() : this.start();
        }.bind(this))
        console.log('count-down created');
      },
      attachedCallback : function(){
        console.log('count-down attached');
      },
      deattachedCallback : function(){
        console.log('count-down deattached');
      },
      attributeChangedCallback : function(propertyName, oldValue, newValue){
        console.log('count-down property ' + propertyName + ' changed, from ' + oldValue + ' to ' + newValue);
      },

      // 剩余多少时间
      time : 60000,

      // 倒计时timer
      timer : null,

      // 开始计时
      start : function(){
        if(this.time <= 0){
          this.stop();
          return;
        }

        $('p', this).html(this.timeToStr(this.time));
        this.time = this.time - 1000;
        $(this).attr('time', this.time);
        $('button', this).html('点击结束');
        this.going = true;

        var that = this;
        this.timer = setTimeout(function(){
          that.start();
        }, 1000)
      },

      // 结束计时
      stop : function(){
        this.timer && clearTimeout(this.timer);
        $('button', this).html('点击开始');
        this.going = false;
      },

      going : false,

      // 重置时间
      reset : function(time){
        this.stop();
        this.time = time || 0;
        this.start();
      },

      // 根据时间返回 “X天X时X分X秒”
      timeToStr : function(time){
        var days = ~~(time / (24 * 60 * 60 * 1000)),
            hours = ~~((time - 24 * 60 * 60 * 1000 * days)/(60 * 60 * 1000)),
            mins = ~~((time - 24 * 60 * 60 * 1000 * days - 60 * 60 * 1000 * hours)/(60 * 1000)),
            seconds = ~~((time - 24 * 60 * 60 * 1000 * days - 60 * 60 * 1000 * hours - 60 * 1000 * mins)/1000),
            str = '';

        // 添加天数
        str += '<span>' + this.getDoubleNumber(days) + '</span>天';
        // 添加小时数
        str += '<span>' + this.getDoubleNumber(hours) + '</span>时';
        // 添加分钟
        str += '<span>' + this.getDoubleNumber(mins) + '</span>分';
        // 添加秒数
        str += '<span>' + this.getDoubleNumber(seconds) + '</span>秒';

        return str;
      },

      // 将数字转换成2位数
      // 8 -> 08
      getDoubleNumber : function(num){
        if(num < 0) num = 0;

        return num >= 10 ? num : '0' + num;
      }
    })
  })

})();
