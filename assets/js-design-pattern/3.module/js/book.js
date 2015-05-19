// 字面量模式的下单页
;(function($, window, document, undefined){

  var book = (function(){
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

    // 根据日期得到价格。
    function getPriceByDate(date){
      return [100,200,300][parseInt(Math.random() * 100) % 3];
    }

    return {
      // 设置套餐数
      setCount : function(count){
        settings.count = count;
      },
      // 设置酒店日期
      setHotelDate : function(date){
        var hotel = settings.hotel;
        hotel.date = date;
        hotel.price = getPriceByDate(date);
      },
      // 设置景点日期
      setSceneryDate : function(date){
        var scenery = settings.scenery;
        scenery.date = date;
        scenery.price = getPriceByDate(date);
      },
      // 获取酒店数量
      getHotelCount : function(){
        return settings.count * settings.hotel.count;
      },
      // 获取酒店总价
      getHotelPrice : function(){
        return this.getHotelCount * settings.hotel.price;
      },
      // 获取景点票数
      getSceneryCount : function(){
        return settings.count * settings.scenery.count;
      },
      // 获取景点总价
      getSceneryPrice : function(){
        return this.getSceneryCount * settings.scenery.price;
      },
      getPeople : function(){
        return [settings.count * settings.people.adult, settings.count * settings.people.children];
      },
      getTotal : function(){
        var hotel_price = this.getHotelPrice(),
            scenery_price = this.getSceneryPrice(),
            price = hotel_price + scenery_price;

        if(hotel_price == 0 || scenery_price == 0){
          price = 0;
        }

        return price;
      },
      // 提交
      submit : function(){
        // 将上述配置信息ajax提交
        console.log(settings);
      }
    };
  })();

  // do other things
  // eg. submit
  $('.submit').on('click', book.submit);

})(jQuery, window, document);
