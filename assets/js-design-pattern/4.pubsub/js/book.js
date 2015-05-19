// 字面量模式的下单页
;(function($, window, document, undefined){

  var settings = {
    // 套餐id
    id : 1000,
    // 套餐份数
    count : 1,
    // 酒店
    hotel : {
      // 入住日期
      date : '',
      // 一份几间
      count : 1,
      // 一间多少钱
      price : 0
    },
    // 景点
    scenery : {
      // 出游日期
      date : '',
      // 一份多少张
      count : 2,
      // 一张多少钱
      price : 0
    },
    // 适用人数
    people : {
      // 成人
      adult : 2,
      // 儿童
      children : 1
    }
  };

  var book = {
    init : function(){
      this.wrapper = $('.page');

      var that = this;
      $('input', this.wrapper).on('change', function(){
        var value = $(this).val(),
            type = $(this).data('type');

        switch(type){
          case 'count':
            that.setCount(value);
            break;
          case 'hotel' :
            that.setHotel(value);
            break;
          case 'scenery' :
            that.setScenery(value);
            break;
        }
      });

      $('.submit', this.wrapper).on('click', $.proxy(this.submit, this));
      this.setPrice();

      $.subscribe('count.hotel', $.proxy(this.setHotel, this));
      $.subscribe('count.scenery', $.proxy(this.setScenery, this));
      $.subscribe('count.price', $.proxy(this.setPrice, this));
      $.subscribe('count.people', $.proxy(this.setPeople, this));
    },
    // 设置套餐份数
    setCount : function(count){
      settings.count = count;

      $.publish('count');
    },
    // 设置套餐可出游人数
    setPeople : function(){
      // 成人数
      var adult = settings.people.adult * settings.count,
          children = settings.people.children * settings.count;

      $('.total h3 span:eq(0)', this.wrapper).html(adult);
      $('.total h3 span:eq(1)', this.wrapper).html(children);
    },
    // 设置总价
    setPrice : function(){
      var count = settings.count,
          hotel_price = count * settings.hotel.count * settings.hotel.price,
          scenery_price = count * settings.scenery.count * settings.scenery.price,
          price = hotel_price + scenery_price;

      if(hotel_price == 0 || scenery_price == 0){
        price = 0;
      }


      $('.price strong span', this.wrapper).html(price || '--');
    },
    // 设置酒店日期
    setHotel : function(date){
      if(date){
        settings.hotel.date = date;
        // set price
        settings.hotel.price = this.getPriceByDate(date);
        this.setPrice();
      }

      // 设置酒店间数
      $('.hotel em', this.wrapper).html(settings.hotel.count * settings.count + '间');
    },
    // 设置景点日期
    setScenery : function(date){
      if(date){
        settings.scenery.date = date;
        // set price
        settings.scenery.price = this.getPriceByDate(date);
        this.setPrice();
      }

      // 设置景点间数
      $('.scenery em', this.wrapper).html(settings.scenery.count * settings.count + '间');
    },
    getPriceByDate : function(date){
      return [100,200,300][parseInt(Math.random() * 100) % 3];
    },
    // 提交
    submit : function(){
      var errors = [];

      if(!settings.hotel.date){
        errors.push('请填写酒店入住日期');
      }
      if(!settings.scenery.date){
        errors.push('请填写景点游玩日期');
      }

      if(errors.length){
        alert(errors.join('\n'));
        return;
      }

      // 验证通过提交。
      alert('已提交订单' + JSON.stringify({
        id : settings.id,
        hotel : settings.hotel.date,
        scenery : settings.scenery.date
      }));
    }
  };

  book.init();
})(jQuery, window, document);
